import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitData } from '../../redux/actions/habitActions';
import D3Chart from '../../utils/D3Chart';

const HabitInsights = () => {
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabitData());
    const insightsData = habits.map((habit) => ({
      title: habit.title,
      completed: habit.completedCount,
      total: habit.totalCount
    }));
    setChartData(insightsData);
  }, [dispatch, habits]);

  return (
    <div>
      <h2>Habit Insights</h2>
      <D3Chart data={chartData} />
    </div>
  );
};

export default HabitInsights;
