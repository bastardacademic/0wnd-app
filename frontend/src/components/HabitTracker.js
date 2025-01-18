import React, { useState, useEffect } from 'react';

const HabitTracker = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        fetch('/api/habits')
            .then((res) => res.json())
            .then((data) => setHabits(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h2>Habit Tracker</h2>
            <ul>
                {habits.map((habit) => (
                    <li key={habit._id}>{habit.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default HabitTracker;
