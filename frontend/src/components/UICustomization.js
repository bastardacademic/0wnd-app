import React, { useState } from 'react';
function UICustomization() {
    const [buttonSize, setButtonSize] = useState('medium');
    const [fontSize, setFontSize] = useState('16px');
    const [colorScheme, setColorScheme] = useState('light');
    const handleCustomization = e => {
        e.preventDefault();
        document.documentElement.style.setProperty('--button-size', buttonSize);
        document.documentElement.style.setProperty('--font-size', fontSize);
        document.documentElement.style.setProperty('--color-scheme', colorScheme);
    };
    return (
        <form onSubmit={handleCustomization}>
            <h2>Customize UI</h2>
            <label>Button Size: <select value={buttonSize} onChange={e => setButtonSize(e.target.value)}><option value='small'>Small</option><option value='medium'>Medium</option><option value='large'>Large</option></select></label>
            <label>Font Size: <input type='number' value={fontSize.replace('px', '')} onChange={e => setFontSize(\\px\)} /> px</label>
            <label>Color Scheme: <select value={colorScheme} onChange={e => setColorScheme(e.target.value)}><option value='light'>Light</option><option value='dark'>Dark</option></select></label>
            <button type='submit'>Apply Changes</button>
        </form>
    );
}
export default UICustomization;
