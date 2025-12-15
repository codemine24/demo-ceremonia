import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useCeremonyStore } from '@/store/ceremonyStore';

export default function WizardStep1() {
  const { partner1, partner2, date, venue, setPartner1, setPartner2, setDate, setVenue } = useCeremonyStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        Tell us about the couple
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Partner 1 Name"
          variant="outlined"
          fullWidth
          value={partner1}
          onChange={(e) => setPartner1(e.target.value)}
          required
        />
        <TextField
          label="Partner 2 Name"
          variant="outlined"
          fullWidth
          value={partner2}
          onChange={(e) => setPartner2(e.target.value)}
          required
        />
      </Box>
      <TextField
        label="Wedding Date"
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={date || ''}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Venue"
        variant="outlined"
        fullWidth
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        placeholder="e.g. The Grand Hotel, City Hall, A Quiet Beach"
      />
    </Box>
  );
}
