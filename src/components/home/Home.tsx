import React from 'react'
import Banner from './banner/Banner'
import { useAuth } from '../../context/auth-context'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Typography } from '@mui/material';

function Home() {

    const {isAuthenticated} = useAuth();
    const features = [
      {
        title: "Personalized Meal Plans",
        description: "Get customized diet and nutritious meal plans tailored to your unique health metrics and goals.",
        image: "home1.jpg",
      },
      {
        title: "Mental Health Support",
        description: "Access peaceful journaling features to support your mental health during cultural transitions.",
        image: "home2.jpg",
      },
      {
        title: "Health Metrics Dashboard",
        description: "Track your calories, activity levels, and overall health in one comprehensive dashboard.",
        image: "home3.jpg",
      },
      {
        title: "Personalized Exercise Guidance",
        description: "Get customized and AI generated exercise plans tailored to your unique health metrics and goals.",
        image: "home4.jpg",
      },
    ];
    console.log("Authenticated", isAuthenticated)
  return (
    <div>
      <Banner />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            marginTop: '20px'
          }}
        >
          {features.map((feature, index) => (
            <Card key={index} sx={{ width: 300, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Call-to-Action Section */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join HealthIPro Today!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Start your journey towards better health and well-being.
        </Typography>
      </Box>

    </div>
  )
}

export default Home
