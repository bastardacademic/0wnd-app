const LanguageSelector = () => {
    const [language, setLanguage] = useState('en-GB');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <select value={language} onChange={handleLanguageChange}>
            <option value='en-GB'>English (UK)</option>
            <option value='es-ES'>Espa�ol</option>
            <option value='fr-FR'>Fran�ais</option>
        </select>
    );
};

export default LanguageSelector;
