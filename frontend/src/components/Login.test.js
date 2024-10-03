import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form and submits login', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText('Email');
  const submitButton = screen.getByText('Login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);

  expect(emailInput.value).toBe('test@example.com');
});
