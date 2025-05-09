import React, { useState, useEffect } from 'react';
import {
  Typography,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface SusData {
  [key: string]: string;
}

interface SystemUsabilityScaleProps {
  onDataChange: (data: SusData) => void;
  initialData: SusData;
}

const SystemUsabilityScale: React.FC<SystemUsabilityScaleProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<SusData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (question: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
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
    <>
      <Typography variant="h5" gutterBottom>
        Section 2: System Usability Scale (SUS)
      </Typography>
      <Typography variant="body1" paragraph>
        Please indicate your level of agreement with the following statements about the system you just used.
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60%' }} />
              <TableCell align="center" sx={{ width: '8%' }} padding="checkbox">
                Strongly Disagree
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }} padding="checkbox">
                Disagree
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }} padding="checkbox">
                Neutral
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }} padding="checkbox">
                Agree
              </TableCell>
              <TableCell align="center" sx={{ width: '8%' }} padding="checkbox">
                Strongly Agree
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: '60%', py: 1 }}
                >
                  {question.text}
                </TableCell>
                {['1', '2', '3', '4', '5'].map((value) => (
                  <TableCell
                    key={value}
                    align="center"
                    padding="checkbox"
                    sx={{ px: 0.5, py: 1 }}
                  >
                    <Radio
                      size="small"
                      name={question.id}
                      value={value}
                      checked={formData[question.id] === value}
                      onChange={handleChange(question.id)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SystemUsabilityScale; 