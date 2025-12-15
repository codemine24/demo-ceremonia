import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useCeremonyStore } from '@/store/ceremonyStore';

const RITUALS = ['Vows', 'Ring Exchange', 'Unity Candle', 'Sand Ceremony', 'Hand Fasting', 'Wine Box', 'Glass Breaking'];

export default function WizardStep3() {
  const { vibe, setTone, toggleRitual } = useCeremonyStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
        Set the Vibe
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Tone</InputLabel>
        <Select
          value={vibe.tone}
          label="Tone"
          onChange={(e) => setTone(e.target.value)}
        >
          <MenuItem value="Romantic">Romantic</MenuItem>
          <MenuItem value="Humorous">Humorous</MenuItem>
          <MenuItem value="Traditional">Traditional</MenuItem>
          <MenuItem value="Modern">Modern</MenuItem>
          <MenuItem value="Short & Sweet">Short & Sweet</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Rituals to Include
        </Typography>
        <FormGroup sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          {RITUALS.map((ritual) => (
            <FormControlLabel
              key={ritual}
              control={
                <Checkbox
                  checked={vibe.rituals.includes(ritual)}
                  onChange={() => toggleRitual(ritual)}
                />
              }
              label={ritual}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
