import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AlertComponent from './alert-component';

describe('AlertComponent', () => {
  it('renders the alert with the correct type and message', () => {
    const { getByText } = render(
      <AlertComponent
        classNames="custom-class"
        message="This is a test message"
        title="Test Title"
        type="success"
      />,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('This is a test message')).toBeInTheDocument();
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
        title="Another Test Title"
        type="error"
      />,
    );

    // Act
    const titleElement = getByText('Another Test Title');
    const messageElement = getByText('Another test message');
    const alertDiv = titleElement.closest('div');

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(alertDiv).toHaveClass('alert alert-error');
  });
});
