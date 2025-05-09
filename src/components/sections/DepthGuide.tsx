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
    setFormData(prev => ({
      ...prev,
      usefulness: Array.isArray(newValue) ? newValue[0] : newValue,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Depth Guide Feedback
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography id="usefulness-slider" gutterBottom>
          1. How useful was the depth guide in helping you annotate B-lines?
        </Typography>
        <Slider
          value={formData.usefulness}
          onChange={handleSliderChange}
          aria-labelledby="usefulness-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 0, label: 'Not Useful' },
            { value: 20, label: 'Very Useful' },
          ]}
          min={0}
          max={20}
        />
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