import { render, screen, fireEvent } from '@testing-library/react';
import JournalEntryForm from '../src/components/Journal/JournalEntryForm';

test('renders journal entry form and submits data', () => {
    render(<JournalEntryForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Write your journal entry...'), {
        target: { value: 'My new entry' }
    });
    
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('Write your journal entry...').value).toBe('My new entry');
});
