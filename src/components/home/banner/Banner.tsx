import { Box, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../../../common/Navbar/Navbar';
import './Banner.css'; // Import the CSS file for the animation

function Banner() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '450px',
        backgroundImage: 'url(bannerImg5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      {/* Text Content */}
      <Typography
        variant="h2"
        sx={{
          position: 'relative',
          color: '#fff',
          fontWeight: 'bold',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        HealthiPRO
      </Typography>
      <Typography
        variant="h5"
        className="animated-text" // Add a class for the animated text
      >
        Personalised Health Hub for International Students
      </Typography>
      <Typography
        variant="h5"
        className="animated-text" // Add a class for the animated text
      >
        One Spot to balance and manage your health. Being Fit is new GOLD!
      </Typography>
    </Box>
  );
}

export default Banner;
