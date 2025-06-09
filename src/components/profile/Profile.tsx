import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, Typography, CircularProgress } from "@mui/material";
import { getUserDetails } from "../../services/auth.service";

function Profile() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await getUserDetails(token);
        setUserDetails(res);
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, display: "flex", justifyContent: "center", bgcolor: "#f9f9f9", marginTop: '5%' }}>
      <Card sx={{ width: "90%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Profile Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Full Name
            </Typography>
            <Typography variant="body1">{userDetails?.fullName}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{userDetails?.emailID}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Mobile Number
            </Typography>
            <Typography variant="body1">{userDetails?.mobileNumber}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Date of Birth
            </Typography>
            <Typography variant="body1">{formatDate(userDetails?.dateOfBirth)}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Gender
            </Typography>
            <Typography variant="body1">{userDetails?.gender}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Calories Required
            </Typography>
            <Typography variant="body1">{`${userDetails?.caloriesRequired} kcal`}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Healthy Weight Range
            </Typography>
            <Typography variant="body1">{userDetails?.weightRange}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="textSecondary">
              Profile Created
            </Typography>
            <Typography variant="body1">{formatDate(userDetails?.createdAt)}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
