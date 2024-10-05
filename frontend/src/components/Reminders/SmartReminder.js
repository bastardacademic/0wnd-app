import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitData } from '../../redux/actions/habitActions';
import { scheduleReminder } from '../../utils/notifications';

const SmartReminder = () => {
  const [reminders, setReminders] = useState([]);
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabitData());
    // Generate smart reminders based on habit progress
    const smartReminders = habits.map((habit) => ({
      title: Don't forget your habit: ,
      time: habit.nextDueDate
    }));
    setReminders(smartReminders);
  }, [dispatch, habits]);

  useEffect(() => {
    reminders.forEach((reminder) => {
      scheduleReminder(reminder.title, reminder.time);
    });
  }, [reminders]);

  return (
    <div>
      <h2>Smart Reminders</h2>
      {reminders.map((reminder, index) => (
        <p key={index}>{reminder.title} at {new Date(reminder.time).toLocaleTimeString()}</p>
      ))}
    </div>
  );
};

export default SmartReminder;
