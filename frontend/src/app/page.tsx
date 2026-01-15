'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ComparisonView from '@/components/ComparisonView/ComparisonView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function Home() {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  interface ComparisonResponse {
    similarity_percent: number;
  }

  const handleCompare = async () => {
    if (!image1 || !image2) return;

    setIsComparing(true);
    setPercentage(null);

    try {
      // const backendUrl =
      //   "http://quickcompare-route-test.apps.lab.ocp.lan";

      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      const formData = new FormData();
      formData.append('image1', image1);
      formData.append('image2', image2);

      const response = await fetch(
        `${backendUrl.replace(/\/$/, '')}/api/compare`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ComparisonResponse = await response.json();
      const matchScore = data.similarity_percent ?? 0;

      setPercentage(matchScore);
    } catch (error) {
      console.error('Error comparing images:', error);
      alert('Failed to compare images. See console for details.');
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setImage1(null);
    setImage2(null);
    setPercentage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Quick Compare
        </Typography>

        <Typography variant="h5" color="text.secondary">
          Analyze and compare images with AI-powered precision
        </Typography>
      </Box>

      {/* Upload Section */}
      {percentage === null && !isComparing && (
        <Grid
          spacing={4}
          sx={{ mb: 6 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid size={{ xs: 12, md: 5 }}>
            <ImageUploader
              label="Upload Image 1"
              image={image1}
              onImageChange={setImage1}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                boxShadow: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CompareArrowsIcon
                sx={{
                  fontSize: 40,
                  color: 'primary.main',
                  transform: isMobile ? 'rotate(90deg)' : 'none',
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <ImageUploader
              label="Upload Image 2"
              image={image2}
              onImageChange={setImage2}
            />
          </Grid>
        </Grid>
      )}

      {/* Action Button */}
      {!percentage && !isComparing && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCompare}
            disabled={!image1 || !image2}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              borderRadius: 8,
              boxShadow: theme.shadows[8],
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            Compare Images
          </Button>
        </Box>
      )}

      {/* Result */}
      <ComparisonView
        percentage={percentage}
        onReset={handleReset}
        isComparing={isComparing}
      />
    </Container>
  );
}
