import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../../redux/actions/habitActions';
import { Link } from 'react-router-dom';

const HabitList = () => {
  const dispatch = useDispatch();
  const habits = useSelector(state => state.habits.habits);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div className=\"habit-list\">
      <h2>Your Habits</h2>
      {user.role === 'D' && (
        <Link to=\"/add-habit\" className=\"btn btn-primary\">Add Habit</Link>
      )}
      <ul>
        {habits.map(habit => (
          <li key={habit.habitId}>
            <h3>{habit.title}</h3>
            <p>{habit.description}</p>
            <p>Status: {habit.status}</p>
            {user.role === 'D' && (
              <>
                <Link to={/edit-habit/} className=\"btn btn-secondary\">Edit</Link>
                <button className=\"btn btn-danger\">Delete</button>
                <button className=\"btn btn-success\">Mark as Completed</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
