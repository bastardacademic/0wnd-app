import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HabitTracker from './HabitTracker';

describe('HabitTracker Component', () => {
  it('renders the habit tracker with correct data', () => {
    const habit = { title: 'Morning Exercise', completedCount: 5, totalCount: 10 };
    render(<HabitTracker habit={habit} />);
    expect(screen.getByText('Morning Exercise')).toBeInTheDocument();
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
  });

  it('marks a habit as complete', () => {
    const habit = { title: 'Morning Exercise', completedCount: 5, totalCount: 10 };
    render(<HabitTracker habit={habit} />);
    fireEvent.click(screen.getByText('Mark as Completed'));
    expect(screen.getByText('6 / 10')).toBeInTheDocument();
  });
});
