import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendReaction } from '../../redux/actions/chatActions';

function ReactionPicker({ messageId }) {
    const [selectedReaction, setSelectedReaction] = useState(null);
    const dispatch = useDispatch();
    const emojis = ['??', '??', '??', '??'];

    const handleReaction = (emoji) => {
        setSelectedReaction(emoji);
        dispatch(sendReaction(messageId, emoji));
    };

    return (
        <div className='reaction-picker'>
            {emojis.map(emoji => (
                <button key={emoji} onClick={() => handleReaction(emoji)}>
                    {emoji}
                </button>
            ))}
        </div>
    );
}

export default ReactionPicker;
