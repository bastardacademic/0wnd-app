import React from 'react';

function Reward({ reward }) {
    return (
        <div className={
            <h3>{reward.title}</h3>
            <p>{reward.description}</p>
            <span className="points">{reward.points}</span>
        </div>
    );
}

export default Reward;