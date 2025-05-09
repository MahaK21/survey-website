# Lung Ultrasound Annotation Tool Survey

A React-based survey application designed to evaluate the usability and effectiveness of a lung ultrasound annotation tool, specifically focusing on the impact of a depth guide feature.

## Project Overview

This survey was created to gather user feedback on a lung ultrasound annotation tool, with particular emphasis on:

- User demographics and experience with similar tools
- System usability assessment using the System Usability Scale (SUS)
- Workload assessment using NASA-TLX
- Specific feedback on the depth guide feature

## Technical Implementation

### Frontend

- Built with React and TypeScript
- Uses Material-UI for a modern, responsive design
- Implements a multi-step form with data persistence
- Features:
  - Demographics section
  - System Usability Scale (SUS) assessment
  - NASA-TLX workload assessment
  - Depth guide feedback section

### Data Collection

- Responses are stored in Google Sheets
- Uses Google Apps Script for serverless backend
- Implements CORS handling for secure data submission

### Google Apps Script Setup

1. Create a new Google Sheet
2. Go to Extensions > Apps Script
3. Copy the contents of `google-apps-script/Code.gs` into the script editor
4. Deploy as a web app:
   - Execute as: "Me"
   - Who has access: "Anyone"
5. Copy the deployment URL and update it in `src/services/googleSheets.ts`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
survey-website/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Demographics.tsx
│   │   │   ├── SystemUsabilityScale.tsx
│   │   │   ├── NasaTLX.tsx
│   │   │   └── DepthGuide.tsx
│   │   └── Survey.tsx
│   └── services/
│       └── googleSheets.ts
└── google-apps-script/
    └── Code.gs
```

## Features

- Multi-section survey form with progress tracking
- Data persistence between sections
- Responsive design for all screen sizes
- Real-time data submission to Google Sheets
- Error handling and user feedback
- Clean, professional UI with Material-UI components

## Future Improvements

- Add data validation
- Implement survey completion tracking
- Add analytics dashboard
- Support for multiple languages
- Export functionality for survey results
