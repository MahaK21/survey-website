import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface NasaTLXProps {
  onDataChange: (data: any) => void;
}

const questions = [
  {
    title: '1. How mentally demanding was using the annotation tool?',
    description: 'Did it require a lot of thinking, concentration, or problem-solving?',
  },
  {
    title: '2. How much interaction (clicking or adjusting) did the task require?',
    description: 'Did you need to make repeated changes or perform a lot of manual adjustments?',
  },
  {
    title: '3. Did you feel like the process was efficient or took longer than expected?',
    description: "Did you feel rushed or like you didn't have enough time to finish the task?",
  },
  {
    title: '4. How satisfied are you with your overall performance using the module?',
    description: 'How happy are you with how you performed? Did it feel accurate and correct? Did you achieve the annotations as you intended?',
  },
  {
    title: '5. How much effort did you have to put in?',
    description: 'Was the task straightforward or did it require significant effort?',
  },
  {
    title: '6. How insecure, discouraged, or stressed did you feel?',
    description: 'Were there any moments that made you feel irritated or confused',
  },
];

const NasaTLX: React.FC<NasaTLXProps> = ({ onDataChange }) => {
  const [responses, setResponses] = useState({
    withDepthGuide: Array(questions.length).fill(0),
    withoutDepthGuide: Array(questions.length).fill(0),
  });

  useEffect(() => {
    onDataChange(responses);
  }, [responses, onDataChange]);

  const handleSliderChange = (condition: 'withDepthGuide' | 'withoutDepthGuide', index: number) => 
    (event: Event, newValue: number | number[]) => {
      setResponses(prev => ({
        ...prev,
        [condition]: prev[condition].map((val, i) => (i === index ? newValue : val)),
      }));
    };

  const renderSlider = (condition: 'withDepthGuide' | 'withoutDepthGuide', index: number) => {
    const marks = Array.from({ length: 21 }, (_, i) => {
      if (i === 0) return { value: 0, label: 'Very Low' };
      if (i === 20) return { value: 20, label: 'Very High' };
      return { value: i };
    });
    return (
      <Slider
        value={responses[condition][index]}
        onChange={handleSliderChange(condition, index)}
        aria-labelledby={`${condition}-slider-${index}`}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={20}
      />
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Section 3: NASA-TLX (Workload Assessment)
      </Typography>
      <Typography variant="body2" gutterBottom>
        Please mark on the scale below where your experience falls for each factor.
      </Typography>

      {questions.map((question, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {question.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {question.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Without Depth Guide:
              </Typography>
              {renderSlider('withoutDepthGuide', index)}
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                With Depth Guide:
              </Typography>
              {renderSlider('withDepthGuide', index)}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default NasaTLX; 