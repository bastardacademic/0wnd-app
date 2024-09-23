import React, { useState } from 'react';
import HabitChain from './components/HabitChain';
import UICustomization from './components/UICustomization';
import LanguageSelector from './components/LanguageSelector';
function App() {
    const [isPremium, setIsPremium] = useState(false);
    return (
        <div className='App'>
            <header><h1>Ownd App</h1></header>
            <LanguageSelector />
            <UICustomization />
            <section>
                <h2>Habit Chains</h2>
                {isPremium ? <HabitChain /> : <p>This feature is for premium users. <a href='/upgrade'>Upgrade</a></p>}
            </section>
        </div>
    );
}
export default App;
