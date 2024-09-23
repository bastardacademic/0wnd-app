import React, { useState, useContext } from 'react';
import { languages } from './languages';

export const LanguageContext = React.createContext();

function LanguageSelector() {
    const [language, setLanguage] = useState('en');
    const changeLanguage = e => setLanguage(e.target.value);

    return (
        <LanguageContext.Provider value={languages[language]}>
            <select onChange={changeLanguage} value={language}>
                <option value='en'>English</option>
                <option value='es'>Español</option>
                <option value='fr'>Français</option>
                <option value='de'>Deutsch</option>
                <option value='it'>Italiano</option>
                <option value='zh'>??</option>
                <option value='ja'>???</option>
            </select>
        </LanguageContext.Provider>
    );
}

export default LanguageSelector;
