import React, { useEffect } from 'react';
import { useVoiceNavigation } from '../../utils/accessibility';

const VoiceNavigation = () => {
  useEffect(() => {
    useVoiceNavigation();  // Custom hook to enable voice-guided navigation
  }, []);

  return <div>Voice Navigation Enabled</div>;
};

export default VoiceNavigation;
