import { GoogleSpreadsheet } from 'google-spreadsheet';

interface SurveyResponse {
  demographics: {
    name: string;
    specialty: string;
    otherSpecialty: string;
    trainingStatus: string;
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
    // You'll need to replace these with your own values
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY;

    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      throw new Error('Missing required Google Sheets credentials');
    }

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    // Use service account authentication
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Flatten the data structure for the spreadsheet
    const flattenedData = {
      timestamp: new Date().toISOString(),
      
      // Demographics
      name: data.demographics.name,
      specialty: data.demographics.specialty,
      otherSpecialty: data.demographics.otherSpecialty,
      trainingStatus: data.demographics.trainingStatus,
      experience: data.demographics.experience,
      used3DSlicer: data.demographics.used3DSlicer,
      slicerFamiliarity: data.demographics.slicerFamiliarity,

      // SUS (System Usability Scale)
      ...Object.entries(data.sus).reduce((acc: { [key: string]: string }, [key, value]) => ({
        ...acc,
        [`sus_${key}`]: value,
      }), {}),

      // NASA-TLX
      ...data.nasaTlx.withoutDepthGuide.reduce((acc: { [key: string]: number }, value: number, index: number) => ({
        ...acc,
        [`nasaTlx_without_${index + 1}`]: value,
      }), {}),
      ...data.nasaTlx.withDepthGuide.reduce((acc: { [key: string]: number }, value: number, index: number) => ({
        ...acc,
        [`nasaTlx_with_${index + 1}`]: value,
      }), {}),

      // Depth Guide
      depthGuide_usefulness: data.depthGuide.usefulness,
      depthGuide_helpWithBLines: data.depthGuide.helpWithBLines,
      depthGuide_moreVariationWithout: data.depthGuide.moreVariationWithout,
      depthGuide_shouldBeIncluded: data.depthGuide.shouldBeIncluded,
      depthGuide_additionalFeedback: data.depthGuide.additionalFeedback,
    };

    await sheet.addRow(flattenedData);
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}; 