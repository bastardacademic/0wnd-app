import React, { useState } from 'react';

function AccessibilitySettings() {
    const [textSize, setTextSize] = useState('medium');

    const handleTextSizeChange = (size) => {
        setTextSize(size);
        // Apply text size changes globally if necessary
    };

    return (
        <div>
            <h3>Adjust Text Size</h3>
            <button onClick={() => handleTextSizeChange('small')}>Small</button>
            <button onClick={() => handleTextSizeChange('medium')}>Medium</button>
            <button onClick={() => handleTextSizeChange('large')}>Large</button>
        </div>
    );
}

export default AccessibilitySettings;
