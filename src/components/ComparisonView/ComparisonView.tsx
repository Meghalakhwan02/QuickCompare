import { Box, Typography, Button, CircularProgress, Grid } from '@mui/material';
import { motion } from 'framer-motion';

interface ComparisonViewProps {
    percentage: number | null;
    onReset: () => void;
    isComparing: boolean;
    image1: File | null;
    image2: File | null;
}

export default function ComparisonView({ percentage, onReset, isComparing, image1, image2 }: ComparisonViewProps) {
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

            {image1 && image2 && (
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>Image 1</Typography>
                            <img
                                src={URL.createObjectURL(image1)}
                                alt="Image 1"
                                style={{
                                    width: '100%',
                                    maxHeight: 200,
                                    objectFit: 'contain',
                                    borderRadius: 8,
                                    border: '1px solid #ddd'
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>Image 2</Typography>
                            <img
                                src={URL.createObjectURL(image2)}
                                alt="Image 2"
                                style={{
                                    width: '100%',
                                    maxHeight: 200,
                                    objectFit: 'contain',
                                    borderRadius: 8,
                                    border: '1px solid #ddd'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}

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
