'use client';

import React from 'react';
import { Box, Typography, Button, LinearProgress, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface ComparisonViewProps {
    percentage: number | null;
    onReset: () => void;
    isComparing: boolean;
}

export default function ComparisonView({ percentage, onReset, isComparing }: ComparisonViewProps) {
    if (isComparing) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress size={60} thickness={4} color="primary" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Analyzing Images...
                </Typography>
            </Box>
        );
    }

    if (percentage === null) return null;

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                mt: 4,
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Match Result
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={160}
                    thickness={4}
                    sx={{ color: percentage > 70 ? 'success.main' : percentage > 40 ? 'warning.main' : 'error.main' }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4" component="div" color="text.primary" fontWeight="bold">
                        {`${percentage}%`}
                    </Typography>
                </Box>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {percentage > 90 ? 'These images are almost identical!' :
                    percentage > 50 ? 'Some similarities found.' :
                        'These images are quite different.'}
            </Typography>

            <Button variant="outlined" onClick={onReset} size="large">
                Compare New Images
            </Button>
        </Box>
    );
}
