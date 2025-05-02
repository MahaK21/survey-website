import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Slider,
} from '@mui/material';

interface DepthGuideProps {
  onDataChange: (data: any) => void;
}

const DepthGuide: React.FC<DepthGuideProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    usefulness: 0,
    helpWithBLines: '',
    moreVariationWithout: '',
    shouldBeIncluded: '',
    additionalFeedback: '',
  });

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFormData({
      ...formData,
      usefulness: newValue as number,
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Section 4: Effectiveness of the Depth Guide
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom>
          1. How useful was the depth guide in improving annotation consistency?
        </Typography>
        <Slider
          value={formData.usefulness}
          onChange={handleSliderChange}
          aria-labelledby="usefulness-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 1, label: 'Not useful' },
            { value: 5, label: 'Very useful' },
          ]}
          min={1}
          max={5}
        />
      </Box>

      <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          2. Did the depth guide help you place B-lines more consistently?
        </Typography>
        <RadioGroup
          value={formData.helpWithBLines}
          onChange={handleChange('helpWithBLines')}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          3. Without the depth guide, would your annotations vary more?
        </Typography>
        <RadioGroup
          value={formData.moreVariationWithout}
          onChange={handleChange('moreVariationWithout')}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          4. Do you think the depth guide should be included in clinical annotation tools?
        </Typography>
        <RadioGroup
          value={formData.shouldBeIncluded}
          onChange={handleChange('shouldBeIncluded')}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          5. Any additional feedback on the depth guide?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={formData.additionalFeedback}
          onChange={handleChange('additionalFeedback')}
          placeholder="Please provide any additional feedback here..."
        />
      </Box>
    </Box>
  );
};

export default DepthGuide; 