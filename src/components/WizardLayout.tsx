import React from 'react';
import { Box, Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import { useCeremonyStore } from '@/store/ceremonyStore';
import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';

const steps = ['The Couple', 'The Story', 'The Vibe'];

export default function WizardLayout() {
  const { activeStep, nextStep, prevStep, partner1, partner2, vibe, story, date, venue, isGenerating, setIsGenerating, setGeneratedScript } = useCeremonyStore();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Generate
      setIsGenerating(true);
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ partner1, partner2, date, venue, story, vibe }),
        });
        const data = await res.json();
        if (data.script) {
          setGeneratedScript(data.script);
          nextStep(); // This moves to step 3, which Page.tsx should handle showing ResultView
        } else if (data.error) {
          alert('Error: ' + data.error);
        }
      } catch (e) {
        console.error(e);
        alert('Failed to generate script.');
      } finally {
        setIsGenerating(false);
      }
    } else {
      nextStep();
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) return !partner1 || !partner2;
    return false;
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0: return <WizardStep1 />;
      case 1: return <WizardStep2 />;
      case 2: return <WizardStep3 />;
      default: return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4, mb: 4, minHeight: '300px' }}>
        {getStepContent(activeStep)}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, maxWidth: 600, mx: 'auto' }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={prevStep}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} disabled={isNextDisabled() || isGenerating} variant="contained">
          {isGenerating ? <CircularProgress size={24} color="inherit" /> : activeStep === steps.length - 1 ? 'Generate Ceremony' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
