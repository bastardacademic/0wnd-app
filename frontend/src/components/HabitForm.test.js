import { render, screen, fireEvent } from '@testing-library/react';
import HabitForm from './HabitForm';

test('renders HabitForm and submits habit', () => {
  render(<HabitForm />);
  const titleInput = screen.getByPlaceholderText('Title');
  const submitButton = screen.getByText('Add Habit');

  fireEvent.change(titleInput, { target: { value: 'New Habit' } });
  fireEvent.click(submitButton);

  expect(titleInput.value).toBe('New Habit');
});
