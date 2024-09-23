const LanguageSelector = () => {
    const [language, setLanguage] = useState('en-GB');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <select value={language} onChange={handleLanguageChange}>
            <option value='en-GB'>English (UK)</option>
            <option value='es-ES'>Español</option>
            <option value='fr-FR'>Français</option>
        </select>
    );
};

export default LanguageSelector;
