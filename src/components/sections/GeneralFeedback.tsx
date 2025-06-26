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

interface GeneralFeedbackData {
  depthGuideUsefulness: number;
  shortcutsHelp: string;
  shortcutsComments: string;
  iconsLayoutClarity: number;
  responsiveness: number;
  overallFeedback: string;
}

interface GeneralFeedbackProps {
  onDataChange: (data: GeneralFeedbackData) => void;
  initialData: GeneralFeedbackData;
}

const GeneralFeedback: React.FC<GeneralFeedbackProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<GeneralFeedbackData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSliderChange = (field: string) => (_: Event, newValue: number | number[]) => {
    const rawValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setFormData(prev => ({
      ...prev,
      [field]: rawValue + 1,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        General Module Feedback
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          1. How useful was the Depth Guide in helping you annotate B-lines?
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={formData.depthGuideUsefulness - 1}
            onChange={handleSliderChange('depthGuideUsefulness')}
            aria-labelledby="depth-guide-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
              { value: 2, label: '3' },
              { value: 3, label: '4' },
              { value: 4, label: '5' },
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
            <Typography variant="caption" color="text.secondary">Not useful at all</Typography>
            <Typography variant="caption" color="text.secondary">Very useful</Typography>
          </Box>
        </Box>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography gutterBottom>
          2. How did keyboard shortcuts affect your workflow speed?
        </Typography>
        <RadioGroup
          value={formData.shortcutsHelp}
          onChange={handleChange('shortcutsHelp')}
          row
        >
          <FormControlLabel value="faster" control={<Radio />} label="Faster" />
          <FormControlLabel value="same_speed" control={<Radio />} label="Same speed" />
          <FormControlLabel value="slower" control={<Radio />} label="Slower" />
          <FormControlLabel value="didnt_use" control={<Radio />} label="Didn't use them" />
        </RadioGroup>
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Optional comments about shortcuts"
          value={formData.shortcutsComments}
          onChange={handleChange('shortcutsComments')}
          sx={{ mt: 2 }}
        />
      </FormControl>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          3. How clear was the layout and labeling of controls?
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={formData.iconsLayoutClarity - 1}
            onChange={handleSliderChange('iconsLayoutClarity')}
            aria-labelledby="icons-layout-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
              { value: 2, label: '3' },
              { value: 3, label: '4' },
              { value: 4, label: '5' },
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
            <Typography variant="caption" color="text.secondary">Very unclear</Typography>
            <Typography variant="caption" color="text.secondary">Very clear</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          4. How responsive did the annotation interaction feel?
        </Typography>
        <Box sx={{ px: 2 }}>
          <Slider
            value={formData.responsiveness - 1}
            onChange={handleSliderChange('responsiveness')}
            aria-labelledby="responsiveness-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
              { value: 2, label: '3' },
              { value: 3, label: '4' },
              { value: 4, label: '5' },
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
            <Typography variant="caption" color="text.secondary">Not responsive</Typography>
            <Typography variant="caption" color="text.secondary">Very responsive</Typography>
          </Box>
        </Box>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="5. Any final comments or suggestions?"
        value={formData.overallFeedback}
        onChange={handleChange('overallFeedback')}
        sx={{ mb: 3 }}
      />
    </Box>
  );
};

export default GeneralFeedback; 