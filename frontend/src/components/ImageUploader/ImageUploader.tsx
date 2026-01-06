'use client';

import React, { useState, useRef } from 'react';
import { Box, Typography, Button, IconButton, Paper, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
    label: string;
    image: File | null;
    onImageChange: (file: File | null) => void;
}

export default function ImageUploader({ label, image, onImageChange }: ImageUploaderProps) {
    const theme = useTheme();
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageChange(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageChange(e.target.files[0]);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering click on parent
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: 400 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {label}
            </Typography>

            <Paper
                elevation={0}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                component={motion.div}
                whileHover={{ scale: 1.01, borderColor: theme.palette.primary.main }}
                sx={{
                    width: '100%',
                    height: 350,
                    border: '2px dashed',
                    borderColor: isDragOver ? 'primary.main' : 'divider',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
                    transition: 'border-color 0.3s, background-color 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleChange}
                />

                <AnimatePresence mode="wait">
                    {image ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                        objectFit: 'contain',
                                    borderRadius: 16,
                                    padding: 8,
                                }}
                            />
                            <IconButton
                                onClick={handleRemove}
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    bgcolor: 'rgba(0,0,0,0.6)',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <CloudUploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="body1" color="text.secondary" align="center">
                                Drag & Drop or Click to Upload
                            </Typography>
                            <Typography variant="caption" color="text.disabled" align="center" sx={{ mt: 1 }}>
                                Supports JPG, PNG, WEBP
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Paper>
        </Box>
    );
}
