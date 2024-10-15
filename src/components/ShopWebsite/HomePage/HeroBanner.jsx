import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import apiServiceInstance from '../../../services/HeroImageService';

const HeroBanner = () => {
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    const heroImageId = 1; 
    apiServiceInstance.getHeroImage(heroImageId)
      .then((response) => {
        if (response.data && response.data.image) {
          setBannerImage(response.data.image); 
        } else {
          console.error('No image data returned from the API.');
        }
      })
      .catch((error) => {
        console.error('Error fetching the hero image:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        height: '70vh',  // Change once there's more content to add in the Home Page
        width: '100%',  
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      }}
    >
      <Box textAlign="center">
        <Typography variant="h3">Discover Our New Collection</Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          href="/shop"
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default HeroBanner;
