import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AlertComponent from './alert-component';

describe('AlertComponent', () => {
  it('renders the alert with the correct type and message', () => {
    const { getByText } = render(
      <AlertComponent
        classNames="custom-class"
        message="This is a test message"
        type="success"
      />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('This is a test message')).toBeTruthy();
    expect(getByText('Test Title').closest('div')).toHaveClass(
      'alert alert-success custom-class',
    );
  });

  it('renders the alert with the correct type and without additional classNames', () => {
    // Arrange
    const { getByText } = render(
      <AlertComponent
        classNames=""
        message="Another test message"
        type="error"
      />,
    );

    // Act
    const titleElement = getByText('Another Test Title');
    const messageElement = getByText('Another test message');
    const alertDiv = titleElement.closest('div');

    // Assert
    expect(titleElement).toBeTruthy();
    expect(messageElement).toBeTruthy();
    expect(alertDiv).toHaveClass('alert alert-error');
  });
});
