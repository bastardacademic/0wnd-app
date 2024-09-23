import React, { useState, useContext } from 'react';
import { languages } from './languages';
export const LanguageContext = React.createContext();
function LanguageSelector() {
    const [language, setLanguage] = useState('en');
    const changeLanguage = e => setLanguage(e.target.value);
    return (
        <LanguageContext.Provider value={languages[language]}>
            <select onChange={changeLanguage} value={language}>
                <option value='en'>English</option><option value='es'>Español</option>
            </select>
        </LanguageContext.Provider>
    );
}
export default LanguageSelector;
