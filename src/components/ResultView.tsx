import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useCeremonyStore } from '@/store/ceremonyStore';

export default function ResultView() {
  const { generatedScript, setGeneratedScript, isGenerating, setIsGenerating, partner1, partner2, date, venue, story, vibe } = useCeremonyStore();
  const [refinement, setRefinement] = useState('');

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner1, partner2, date, venue, story, vibe,
          refinement: refinement,
          oldScript: generatedScript
        }),
      });
      const data = await res.json();
      if (data.script) {
        setGeneratedScript(data.script);
        setRefinement('');
      } else if (data.error) {
        alert('Error: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to regenerate script.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    alert('Copied to clipboard!');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
          <html>
            <head>
              <title>Ceremony Script - ${partner1} & ${partner2}</title>
              <style>
                body { font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
                pre { font-family: 'Times New Roman', serif; white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <h1>Wedding Ceremony Script</h1>
              <h3>${partner1} & ${partner2}</h3>
              <p>${date || ''} • ${venue || ''}</p>
              <hr />
              <pre>${generatedScript}</pre>
            </body>
          </html>
        `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontFamily: 'serif' }}>
          Your Ceremony Script
        </Typography>
        <Box>
          <IconButton onClick={handleCopy} title="Copy">
            <ContentCopyIcon />
          </IconButton>
          <IconButton onClick={handlePrint} title="Download/Print">
            <PrintIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fcfcfc' }}>
        <TextField
          multiline
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={generatedScript}
          onChange={(e) => setGeneratedScript(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }
          }}
        />
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mt: 2, mb: 10 }}>
        <TextField
          label="Refinement Instructions"
          placeholder="e.g. Make it funnier, add a quote about love..."
          fullWidth
          value={refinement}
          onChange={(e) => setRefinement(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
          onClick={handleRegenerate}
          disabled={isGenerating || !refinement}
          sx={{ flexShrink: 0 }}
        >
          Refine
        </Button>
      </Box>
    </Box>
  );
}
