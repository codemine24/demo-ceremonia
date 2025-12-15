'use client';
import { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import WizardLayout from '@/components/WizardLayout';
import ResultView from '@/components/ResultView';
import { useCeremonyStore } from '@/store/ceremonyStore';
import DiamondIcon from '@mui/icons-material/Diamond';

export default function Home() {
  const { activeStep } = useCeremonyStore();
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        p: 4
      }}>
        <DiamondIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
        <Typography variant="h1" gutterBottom sx={{ color: 'primary.dark' }}>
          Ceremonia
        </Typography>
        <Typography variant="h5" sx={{ mb: 6, maxWidth: 600, color: 'text.secondary', fontWeight: 300, fontFamily: 'Lato, sans-serif' }}>
          Craft the perfect wedding ceremony script with the help of AI.
          Personalized, elegant, and uniquely yours.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setStarted(true)}
          sx={{ fontSize: '1.2rem', px: 6, py: 1.5 }}
        >
          Create a Ceremony Text
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
      {activeStep < 3 ? (
        <>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontFamily: 'serif', color: 'primary.dark', cursor: 'pointer' }} onClick={() => setStarted(false)}>
              Ceremonia
            </Typography>
          </Box>
          <WizardLayout />
        </>
      ) : (
        <ResultView />
      )}
    </Container>
  );
}
