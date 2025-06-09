import React, { useState } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { Modal, Typography, Button, Box } from '@mui/material';

function AuthenticatedRoutes() {
    const { isAuthenticated } = useAuth();
    const [open, setOpen] = useState(!isAuthenticated);
    const router = useNavigate();

  const handleClose = () => {
    setOpen(false);
    router("/login")
  };

    return isAuthenticated ? <Outlet /> : (
        <>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              You are not logged in
            </Typography>
            <Typography variant="body2" gutterBottom>
              Please log in to access this page.
            </Typography>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Modal>
        </>
    );
}

export default AuthenticatedRoutes
