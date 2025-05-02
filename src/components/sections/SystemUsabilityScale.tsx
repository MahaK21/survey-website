import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface SystemUsabilityScaleProps {
  onDataChange: (data: any) => void;
}

const SystemUsabilityScale: React.FC<SystemUsabilityScaleProps> = ({ onDataChange }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    onDataChange(responses);
  }, [responses, onDataChange]);

  const handleChange = (question: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponses(prev => ({
      ...prev,
      [question]: event.target.value,
    }));
  };

  const questions = [
    {
      id: 'q1',
      text: 'I think that I would like to use this system frequently.',
    },
    {
      id: 'q2',
      text: 'I found the system unnecessarily complex.',
    },
    {
      id: 'q3',
      text: 'I thought the system was easy to use.',
    },
    {
      id: 'q4',
      text: 'I think that I would need the support of a technical person to be able to use this system.',
    },
    {
      id: 'q5',
      text: 'I found the various functions in this system were well integrated.',
    },
    {
      id: 'q6',
      text: 'I thought there was too much inconsistency in this system.',
    },
    {
      id: 'q7',
      text: 'I would imagine that most people would learn to use this system very quickly.',
    },
    {
      id: 'q8',
      text: 'I found the system very cumbersome to use.',
    },
    {
      id: 'q9',
      text: 'I felt very confident using the system.',
    },
    {
      id: 'q10',
      text: 'I needed to learn a lot of things before I could get going with this system.',
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Section 2: System Usability Scale (SUS)
      </Typography>
      <Typography variant="body1" paragraph>
        Please indicate your level of agreement with the following statements about the system you just used.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {questions.map((question) => (
          <FormControl key={question.id} component="fieldset" required>
            <FormLabel component="legend">{question.text}</FormLabel>
            <RadioGroup
              row
              value={responses[question.id] || ''}
              onChange={handleChange(question.id)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 0.5,
                '& .MuiFormControlLabel-root': {
                  margin: 0,
                  padding: '0 4px',
                },
              }}
            >
              <FormControlLabel value="1" control={<Radio />} label="Strongly Disagree" />
              <FormControlLabel value="2" control={<Radio />} label="Disagree" />
              <FormControlLabel value="3" control={<Radio />} label="Neutral" />
              <FormControlLabel value="4" control={<Radio />} label="Agree" />
              <FormControlLabel value="5" control={<Radio />} label="Strongly Agree" />
            </RadioGroup>
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default SystemUsabilityScale; 