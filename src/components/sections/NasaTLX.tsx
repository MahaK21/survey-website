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
    { 
      name: 'Mental Demand', 
      mainQuestion: 'How mentally demanding was the task?',
      subQuestion: 'How much concentration or thinking was needed?',
      minLabel: 'Very Low',
      maxLabel: 'Very High'
    },
    { 
      name: 'Physical Demand', 
      mainQuestion: 'How much interaction (clicking or adjusting) did the task require?',
      subQuestion: 'Did you need to make repeated changes or perform a lot of manual adjustments?',
      minLabel: 'Very Low',
      maxLabel: 'Very High'
    },
    { 
      name: 'Temporal Demand', 
      mainQuestion: 'Did you feel like the process was efficient or took longer than expected?',
      subQuestion: 'How hurried or rushed was the pace of the task?',
      minLabel: 'Very slow',
      maxLabel: 'Very fast'
    },
    { 
      name: 'Performance', 
      mainQuestion: 'How successful were you in accomplishing what you were asked to do?',
      subQuestion: 'How happy are you with how you performed? Did it feel accurate and correct? Did you achieve the annotations as you intended?',
      minLabel: 'Very Poor Performance',
      maxLabel: 'Excellent Performance'
    },
    { 
      name: 'Effort', 
      mainQuestion: 'How hard did you have to work to accomplish your level of performance?',
      subQuestion: 'Was the task straightforward or did it require significant effort?',
      minLabel: 'No Effort Required',
      maxLabel: 'Extreme Effort Required'
    },
    { 
      name: 'Frustration', 
      mainQuestion: 'How insecure, discouraged, irritated, stressed, and annoyed were you?',
      subQuestion: 'Were there any moments that made you feel irritated or confused? How much did you feel frustrated or stressed during the task?',
      minLabel: 'Not Frustrated at all',
      maxLabel: 'Extremely Frustrated'
    },
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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5, 
            mb: 1,
            flexWrap: 'nowrap'
          }}>
            <Typography variant="h6" sx={{ 
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {scale.name} —
            </Typography>
            <Typography variant="body1" sx={{ 
              flex: 1,
              minWidth: 0,
              whiteSpace: 'normal',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center'
            }}>
              {scale.mainQuestion}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {scale.subQuestion}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Without Depth Guide:
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={formData.withoutDepthGuide[index]}
                  onChange={handleSliderChange(index, 'withoutDepthGuide')}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={Array.from({ length: 21 }, (_, i) => ({
                    value: i,
                    label: i === 0 ? scales[index].minLabel : i === 20 ? scales[index].maxLabel : undefined
                  }))}
                  min={0}
                  max={20}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.75rem',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                    },
                    '& .MuiSlider-markLabel[data-index="0"]': {
                      transform: 'translateX(0)',
                    },
                    '& .MuiSlider-markLabel[data-index="20"]': {
                      transform: 'translateX(-100%)',
                    },
                    '& .MuiSlider-mark': {
                      width: '2px',
                      height: '8px',
                      backgroundColor: 'currentColor',
                    },
                    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"]': {
                      width: '3px',
                      height: '16px',
                    },
                  }}
                />
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                With Depth Guide:
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={formData.withDepthGuide[index]}
                  onChange={handleSliderChange(index, 'withDepthGuide')}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={Array.from({ length: 21 }, (_, i) => ({
                    value: i,
                    label: i === 0 ? scales[index].minLabel : i === 20 ? scales[index].maxLabel : undefined
                  }))}
                  min={0}
                  max={20}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.75rem',
                      transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap',
                    },
                    '& .MuiSlider-markLabel[data-index="0"]': {
                      transform: 'translateX(0)',
                    },
                    '& .MuiSlider-markLabel[data-index="20"]': {
                      transform: 'translateX(-100%)',
                    },
                    '& .MuiSlider-mark': {
                      width: '2px',
                      height: '8px',
                      backgroundColor: 'currentColor',
                    },
                    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"], & .MuiSlider-mark[data-index="20"]': {
                      width: '3px',
                      height: '16px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default NasaTLX; 