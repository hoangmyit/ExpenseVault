import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { httpClient, unauthenticatedHttpClient } from './axios-http.service';
import { httpServiceGet } from './axios-http.service';

// Mock the auth utilities
vi.mock('../../../utils/auth-util', () => ({
  removeAuthUser: vi.fn(),
  removeRefreshToken: vi.fn(),
  setAuthUser: vi.fn(),
  setRefreshToken: vi.fn(),
}));

// Mock ConsoleLog to avoid console clutter during tests
vi.mock('../../../utils/common-util', () => ({
  ConsoleLog: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.location.href
let locationHref = '';
Object.defineProperty(window, 'location', {
  value: {
    get href() {
      return locationHref;
    },
    set href(value: string) {
      locationHref = value;
    },
  },
});

describe('HTTP Service', () => {
  let mockAxios: MockAdapter;
  let refreshTokenAxiosMock: MockAdapter;

  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
    locationHref = '';

    // Reset the mocks
    vi.clearAllMocks();

    // Set a base URL env var
    vi.stubEnv('VITE_API_URL', 'http://localhost:7030');

    mockAxios = new MockAdapter(httpClient, {
      onNoMatch: 'passthrough', // Pass through requests not handled by the mock
      delayResponse: 0, // Don't add artificial delay
    });

    refreshTokenAxiosMock = new MockAdapter(unauthenticatedHttpClient, {
      onNoMatch: 'passthrough',
      delayResponse: 0,
    });
  });

  afterEach(() => {
    // Clean up
    mockAxios.restore();
    vi.unstubAllEnvs();
  });

  describe('Access Token and Refresh Flow', () => {
    it('should add authorization header when token exists', async () => {
      // Arrange
      const authToken = 'test-token';
      const endpoint = '/test-endpoint';
      const responseData = { data: 'success' };

      localStorage.setItem('auth_token', authToken);
      mockAxios.onGet(endpoint).reply(200, responseData);

      // Act
      await httpServiceGet(endpoint);

      // Assert
      const requests = mockAxios.history.get;
      const request = requests.find((req) => req.url === endpoint);

      expect(requests.length).toBeGreaterThan(0);
      expect(request).toBeDefined();
      expect(request?.headers?.Authorization).toBe(`Bearer ${authToken}`);
    });

    it('should refresh token when receiving 401 unauthorized', async () => {
      // Arrange
      const expiredToken = 'expired-token';
      const validRefreshToken = 'valid-refresh-token';
      const newAccessToken = 'new-access-token';
      const newRefreshToken = 'new-refresh-token';
      const endpoint = '/protected-resource';
      const protectedData = { data: 'protected data' };

      localStorage.setItem('auth_token', expiredToken);
      localStorage.setItem('refresh_token', validRefreshToken);

      mockAxios
        .onGet(endpoint)
        .replyOnce(401)
        .onGet(endpoint)
        .replyOnce(200, protectedData);

      mockAxios.onPost('/auth/refresh-token').reply(200, {
        token: newAccessToken,
        accessToken: newRefreshToken,
      });

      // Act
      const response = await httpServiceGet(endpoint);

      // Assert
      expect(response.data).toEqual(protectedData);

      const refreshRequests = mockAxios.history.post.filter(
        (req) => req.url === '/auth/refresh-token',
      );
      expect(refreshRequests.length).toBe(1);

      const refreshRequest = refreshRequests[0];
      const requestData = JSON.parse(refreshRequest.data);
      expect(requestData.refreshToken).toBe(validRefreshToken);
    });

    it('should redirect to login when refresh token is invalid', async () => {
      // Arrange
      const expiredToken = 'expired-token';
      const invalidRefreshToken = 'invalid-refresh-token';
      const endpoint = '/protected-resource';
      const loginPage = '/login';

      localStorage.setItem('auth_token', expiredToken);
      localStorage.setItem('refresh_token', invalidRefreshToken);

      mockAxios.onGet(endpoint).reply(401);
      mockAxios.onPost('/auth/refresh-token').reply(401, {
        error: 'Invalid refresh token',
      });

      // Act & Assert
      await expect(httpServiceGet(endpoint)).rejects.toThrow();
      expect(window.location.href).toBe(loginPage);
    });

    it('should handle multiple concurrent requests during token refresh', async () => {
      // Arrange
      const expiredToken = 'expired-token';
      const validRefreshToken = 'valid-refresh-token';
      const newAccessToken = 'new-access-token';
      const newRefreshToken = 'new-refresh-token';
      const endpoint1 = '/resource1';
      const endpoint2 = '/resource2';
      const endpoint3 = '/resource3';
      const resource1 = { id: 1 };
      const resource2 = { id: 2 };
      const resource3 = { id: 3 };

      localStorage.setItem('auth_token', expiredToken);
      localStorage.setItem('refresh_token', validRefreshToken);

      // Setup initial 401 responses
      mockAxios.onGet(endpoint1).replyOnce(401);
      mockAxios.onGet(endpoint2).replyOnce(401);
      mockAxios.onGet(endpoint3).replyOnce(401);

      // Setup retry responses
      mockAxios.onGet(endpoint1).reply(200, resource1);
      mockAxios.onGet(endpoint2).reply(200, resource2);
      mockAxios.onGet(endpoint3).reply(200, resource3);

      // Setup refresh token response
      refreshTokenAxiosMock.onPost('/auth/refresh-token').reply(200, {
        token: newAccessToken,
        accessToken: newRefreshToken,
      });

      // Act
      const [response1, response2, response3] = await Promise.all([
        httpServiceGet(endpoint1),
        httpServiceGet(endpoint2),
        httpServiceGet(endpoint3),
      ]);

      // Assert
      // 1. Verify responses have expected data
      expect(response1.data).toEqual(resource1);
      expect(response2.data).toEqual(resource2);
      expect(response3.data).toEqual(resource3);

      // 2. Verify refresh token was called exactly once
      const refreshCalls = refreshTokenAxiosMock.history.post.filter(
        (req) => req.url === '/auth/refresh-token',
      );
      expect(refreshCalls.length).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      // Arrange
      const endpoint = '/test-network-error';
      mockAxios.onGet(endpoint).networkError();

      // Act & Assert
      await expect(httpServiceGet(endpoint)).rejects.toMatchObject({
        message: 'Network Error',
      });
    });

    it('should handle server errors with appropriate status codes', async () => {
      // Arrange
      const endpoint = '/test-server-error';
      const errorMessage = 'Internal Server Error';

      mockAxios.onGet(endpoint).reply(500, {
        message: errorMessage,
      });

      // Act & Assert
      await expect(httpServiceGet(endpoint)).rejects.toMatchObject({
        response: expect.objectContaining({
          status: 500,
          data: expect.objectContaining({
            message: errorMessage,
          }),
        }),
      });
    });

    it('should handle timeout errors', async () => {
      // Arrange
      const endpoint = '/test-timeout';
      mockAxios.onGet(endpoint).timeout();

      // Act & Assert
      await expect(httpServiceGet(endpoint)).rejects.toThrow();
    });
  });
});
