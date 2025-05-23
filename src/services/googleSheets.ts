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
    depthGuide: {
      usefulness: number;
      helpWithBLines: string;
      moreVariationWithout: string;
      shouldBeIncluded: string;
      additionalFeedback: string;
    };
    timestamp: string;
  }
  
  export const submitToGoogleSheets = async (data: SurveyResponse) => {
    try {
      console.log('Submitting survey data:', data);
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzL13C7mNYY0eXUqP6hC3YC7fsUnyFOzw-iFLeqkc8npPxb1EhWjyciexJjBb940qQY/exec', {
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