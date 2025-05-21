import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

interface DepthGuideData {
  usefulness: number;
  helpWithBLines: string;
  moreVariationWithout: string;
  shouldBeIncluded: string;
  additionalFeedback: string;
}

interface DepthGuideProps {
  onDataChange: (data: DepthGuideData) => void;
  initialData: DepthGuideData;
}

const DepthGuide: React.FC<DepthGuideProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<DepthGuideData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const rawValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setFormData(prev => ({
      ...prev,
      usefulness: rawValue + 1,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Depth Guide Feedback
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          1. How useful was the depth guide in helping you annotate B-lines?
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={formData.usefulness - 1}
            onChange={handleSliderChange}
            aria-labelledby="usefulness-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 0, label: 'Very Useless' },
              { value: 1, label: 'Somewhat Useless' },
              { value: 2, label: 'Neutral' },
              { value: 3, label: 'Somewhat Useful' },
              { value: 4, label: 'Very Useful' },
            ]}
            min={0}
            max={4}
            sx={{
              '& .MuiSlider-markLabel': {
                fontSize: '0.75rem',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
              },
              '& .MuiSlider-markLabel[data-index="0"]': {
                transform: 'translateX(0)',
              },
              '& .MuiSlider-markLabel[data-index="4"]': {
                transform: 'translateX(-100%)',
              },
              '& .MuiSlider-mark': {
                width: '2px',
                height: '8px',
                backgroundColor: 'currentColor',
              },
            }}
          />
        </Box>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          2. Did the depth guide help you identify and annotate B-lines more accurately?
        </Typography>
        <RadioGroup
          value={formData.helpWithBLines}
          onChange={handleChange('helpWithBLines')}
          row
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          3. Did you notice more variation in B-line appearance when using the system without the depth guide?
        </Typography>
        <RadioGroup
          value={formData.moreVariationWithout}
          onChange={handleChange('moreVariationWithout')}
          row
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          4. Should the depth guide be included in the final version of the tool?
        </Typography>
        <RadioGroup
          value={formData.shouldBeIncluded}
          onChange={handleChange('shouldBeIncluded')}
          row
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="5. Any additional feedback about the depth guide?"
        value={formData.additionalFeedback}
        onChange={handleChange('additionalFeedback')}
        sx={{ mb: 3 }}
      />
    </Box>
  );
};

export default DepthGuide; 