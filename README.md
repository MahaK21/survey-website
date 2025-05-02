# Survey Website

A React-based survey application that collects user feedback and stores responses in Google Sheets.

## Features

- Multi-section survey form
- System Usability Scale (SUS) assessment
- NASA-TLX workload assessment
- Google Sheets integration for data storage
- Responsive Material-UI design

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/yourusername/survey-website.git
cd survey-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up Google Sheets API:

   - Create a Google Cloud Project
   - Enable the Google Sheets API
   - Create a service account
   - Download the credentials JSON file
   - Share your Google Sheet with the service account email

4. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your Google Sheets credentials:
     - `REACT_APP_SPREADSHEET_ID`: Your Google Sheet ID
     - `REACT_APP_GOOGLE_CLIENT_EMAIL`: Service account email
     - `REACT_APP_GOOGLE_PRIVATE_KEY`: Service account private key

5. Start the development server:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SPREADSHEET_ID=your_spreadsheet_id_here
REACT_APP_GOOGLE_CLIENT_EMAIL=your_client_email_here
REACT_APP_GOOGLE_PRIVATE_KEY=your_private_key_here
```

## Security Note

Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it.

## License

[MIT](LICENSE)
