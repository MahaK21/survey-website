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
  name: string;
  specialty: string;
  otherSpecialty: string;
  trainingStatus: string;
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
    setFormData(prev => ({
      ...prev,
      slicerFamiliarity: Array.isArray(newValue) ? newValue[0] : newValue,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Section 1: Participant Background
      </Typography>

      <TextField
        fullWidth
        label="Name (First and Last)"
        value={formData.name}
        onChange={handleChange('name')}
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
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>2. How many years of experience do you have with lung ultrasound?</InputLabel>
        <Select
          value={formData.experience}
          label="2. How many years of experience do you have with lung ultrasound?"
          onChange={handleChange('experience')}
          required
        >
          <MenuItem value="0-2">0–2 years</MenuItem>
          <MenuItem value="3-5">3–5 years</MenuItem>
          <MenuItem value="6-10">6–10 years</MenuItem>
          <MenuItem value="10+">10+ years</MenuItem>
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
          <Slider
            value={formData.slicerFamiliarity}
            onChange={handleSliderChange}
            aria-labelledby="slicer-familiarity-slider"
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
      )}
    </Box>
  );
};

export default Demographics; 