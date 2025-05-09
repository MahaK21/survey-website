import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  Paper,
} from '@mui/material';

interface NasaTLXData {
  withDepthGuide: number[];
  withoutDepthGuide: number[];
}

interface NasaTLXProps {
  onDataChange: (data: NasaTLXData) => void;
  initialData: NasaTLXData;
}

const NasaTLX: React.FC<NasaTLXProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<NasaTLXData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleSliderChange = (index: number, condition: 'withDepthGuide' | 'withoutDepthGuide') => 
    (_: Event, newValue: number | number[]) => {
      setFormData(prev => ({
        ...prev,
        [condition]: prev[condition].map((val, i) => 
          i === index ? (Array.isArray(newValue) ? newValue[0] : newValue) : val
        ),
      }));
    };

  const scales = [
    { name: 'Mental Demand', description: 'How mentally demanding was the task?' },
    { name: 'Physical Demand', description: 'How physically demanding was the task?' },
    { name: 'Temporal Demand', description: 'How hurried or rushed was the pace of the task?' },
    { name: 'Performance', description: 'How successful were you in accomplishing what you were asked to do?' },
    { name: 'Effort', description: 'How hard did you have to work to accomplish your level of performance?' },
    { name: 'Frustration', description: 'How insecure, discouraged, irritated, stressed, and annoyed were you?' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        NASA-TLX Assessment
      </Typography>
      <Typography variant="body1" paragraph>
        Please rate your experience with both conditions on the following scales.
      </Typography>

      {scales.map((scale, index) => (
        <Paper key={scale.name} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {scale.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {scale.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Without Depth Guide:
              </Typography>
              <Slider
                value={formData.withoutDepthGuide[index]}
                onChange={handleSliderChange(index, 'withoutDepthGuide')}
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 0, label: 'Very Low' },
                  { value: 20, label: 'Very High' },
                ]}
                min={0}
                max={20}
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                With Depth Guide:
              </Typography>
              <Slider
                value={formData.withDepthGuide[index]}
                onChange={handleSliderChange(index, 'withDepthGuide')}
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 0, label: 'Very Low' },
                  { value: 20, label: 'Very High' },
                ]}
                min={0}
                max={20}
              />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default NasaTLX; 