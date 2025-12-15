import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useCeremonyStore } from '@/store/ceremonyStore';

export default function WizardStep2() {
  const { story, setStoryField } = useCeremonyStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        Your Love Story
      </Typography>
      <TextField
        label="How did you meet?"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={story.howWeMet}
        onChange={(e) => setStoryField('howWeMet', e.target.value)}
        placeholder="Briefly describe how your paths crossed..."
      />
      <TextField
        label="The Proposal"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={story.proposal}
        onChange={(e) => setStoryField('proposal', e.target.value)}
        placeholder="How did it happen?"
      />
      <TextField
        label="What do you love about each other?"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={story.whatWeLove}
        onChange={(e) => setStoryField('whatWeLove', e.target.value)}
        placeholder="Shared values, quirks, or special moments..."
      />
    </Box>
  );
}
