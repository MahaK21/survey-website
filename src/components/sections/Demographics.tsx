import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';

interface DemographicsData {
  initials: string;
  specialty: string;
  otherSpecialty: string;
  trainingStatus: string;
  otherTrainingStatus: string;
  experience: string;
  used3DSlicer: string;
  slicerFamiliarity: number;
}

interface DemographicsProps {
  onDataChange: (data: DemographicsData) => void;
  initialData: DemographicsData;
}

const Demographics: React.FC<DemographicsProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<DemographicsData>(initialData);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const rawValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setFormData(prev => ({
      ...prev,
      slicerFamiliarity: rawValue + 1, // Convert 0-4 to 1-5
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Section 1: Participant Background
      </Typography>

      <TextField
        fullWidth
        label="Initials"
        value={formData.initials}
        onChange={handleChange('initials')}
        sx={{ mb: 3 }}
        required
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>1. What is your clinical specialty?</InputLabel>
        <Select
          value={formData.specialty}
          label="1. What is your clinical specialty?"
          onChange={handleChange('specialty')}
          required
        >
          <MenuItem value="Radiology">Radiology</MenuItem>
          <MenuItem value="Cardiology">Cardiology</MenuItem>
          <MenuItem value="Emergency Medicine">Emergency Medicine</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      {formData.specialty === 'Other' && (
        <TextField
          fullWidth
          label="Please specify your specialty"
          value={formData.otherSpecialty}
          onChange={handleChange('otherSpecialty')}
          sx={{ mb: 3 }}
          required
        />
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Training Status</InputLabel>
        <Select
          value={formData.trainingStatus}
          label="Training Status"
          onChange={handleChange('trainingStatus')}
          required
        >
          <MenuItem value="Medical Student">Medical Student</MenuItem>
          <MenuItem value="Resident">Resident</MenuItem>
          <MenuItem value="Fellow">Fellow</MenuItem>
          <MenuItem value="Attending">Attending</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      {formData.trainingStatus === 'Other' && (
        <TextField
          fullWidth
          label="Please specify your training status"
          value={formData.otherTrainingStatus}
          onChange={handleChange('otherTrainingStatus')}
          sx={{ mb: 3 }}
          required
        />
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>2. How much experience do you have with lung ultrasound?</InputLabel>
        <Select
          value={formData.experience}
          label="2. How much experience do you have with lung ultrasound?"
          onChange={handleChange('experience')}
          required
        >
          <MenuItem value="not_familiar">Not familiar at all</MenuItem>
          <MenuItem value="minimal">Very minimal/introductory or somewhat familiar</MenuItem>
          <MenuItem value="familiar">Very familiar (regular exposure)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>3. Have you used 3D Slicer or similar annotation tools before?</InputLabel>
        <Select
          value={formData.used3DSlicer}
          label="3. Have you used 3D Slicer or similar annotation tools before?"
          onChange={handleChange('used3DSlicer')}
          required
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>

      {formData.used3DSlicer === 'yes' && (
        <Box sx={{ mb: 3 }}>
          <Typography id="slicer-familiarity-slider" gutterBottom>
            4. How familiar were you with the 3D Slicer software before participating in this study?
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={formData.slicerFamiliarity - 1} // Convert 1-5 to 0-4 for display
              onChange={handleSliderChange}
              aria-labelledby="slicer-familiarity-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={[
                { value: 0, label: 'Not Familiar' },
                { value: 1, label: 'Slightly Familiar' },
                { value: 2, label: 'Moderately Familiar' },
                { value: 3, label: 'Very Familiar' },
                { value: 4, label: 'Extremely Familiar' },
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
      )}
    </Box>
  );
};

export default Demographics; 