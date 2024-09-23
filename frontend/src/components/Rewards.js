import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Rewards() {
    const [rewards, setRewards] = useState([]);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        axios.get('/api/user/premium-status')
            .then(response => setIsPremium(response.data.isPremium))
            .catch(error => console.error('Error fetching premium status:', error));
    }, []);

    const renderRewards = (reward) => {
        if (reward.isPremium && !isPremium) {
            return null;
        }

        return (
            <div key={reward._id} className={`reward ${reward.isPremium ? 'premium-reward' : ''}`}>
                <h3>{reward.rewardType}</h3>
                <p>Points: {reward.points}</p>
                {reward.isPremium && <span className='badge badge-premium'>Premium</span>}
            </div>
        );
    };

    return (
        <div>
            <h2>Your Rewards</h2>
            <div className='rewards-list'>
                {rewards.map(renderRewards)}
            </div>
        </div>
    );
}

export default Rewards;
