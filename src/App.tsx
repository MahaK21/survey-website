import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import Survey from './components/Survey';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Survey />} />
          </Routes>
        </Container>
      </Router>
      {/* Footer */}
      <Box component="footer" sx={{ mt: 4, py: 2, borderTop: '1px solid #eee', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, mb: 1 }}>
          <img src="/logos/queensLogo.jpg" alt="Queen's University" height={40} />
          <img src="/logos/mediLogo.png" alt="Med-i Lab" height={40} />
          <img src="/logos/perkLogo.jpg" alt="Perk Lab" height={40} />
        </Box>
        <span style={{ color: '#888', fontSize: 14 }}>
          © 2025 Queen's University, Med-i Lab, The Perk Lab. All rights reserved.
        </span>
      </Box>
      {/* End Footer */}
    </ThemeProvider>
  );
}

export default App;
