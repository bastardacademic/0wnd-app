import React from 'react';

function LanguageSelector() {
    const languages = ['en-GB', 'es-ES', 'fr-FR'];

    return (
        <select>
            {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
            ))}
        </select>
    );
}

export default LanguageSelector;
