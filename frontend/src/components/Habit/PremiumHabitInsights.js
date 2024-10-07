import React from 'react';
import { useSelector } from 'react-redux';

const PremiumHabitInsights = () => {
    const isPremium = useSelector(state => state.auth.isPremium);

    if (!isPremium) {
        return <div>Please upgrade to Premium to access Habit Insights.</div>;
    }

    return (
        <div>
            {/* Premium Habit Insights */}
            <h2>Premium Habit Insights</h2>
        </div>
    );
};

export default PremiumHabitInsights;
