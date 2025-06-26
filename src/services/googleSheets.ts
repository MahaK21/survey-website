interface SurveyResponse {
    demographics: {
      initials: string;
      specialty: string;
      otherSpecialty: string;
      trainingStatus: string;
      otherTrainingStatus: string;
      experience: string;
      used3DSlicer: string;
      slicerFamiliarity: number;
    };
    sus: { [key: string]: string };
    nasaTlx: {
      withDepthGuide: number[];
      withoutDepthGuide: number[];
    };
    generalFeedback: {
      depthGuideUsefulness: number;
      shortcutsHelp: string;
      shortcutsComments: string;
      iconsLayoutClarity: number;
      responsiveness: number;
      overallFeedback: string;
    };
    timestamp: string;
  }
  
  export const submitToGoogleSheets = async (data: SurveyResponse) => {
    try {
      console.log('Submitting survey data:', data);
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbwqa26Bcq3uMtsoulboLOUKNiIXtKYh3VzY55YfsUkhMknSuNzMWw9gXbxmQTZwOTX1/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log('Survey submitted successfully');
      return true;
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw new Error('Failed to submit survey. Please try again.');
    }
  };