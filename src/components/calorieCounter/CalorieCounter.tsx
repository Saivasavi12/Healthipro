import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
  } from '@mui/material';
  import React, { ChangeEvent, useState } from 'react';
  import { saveCalories } from '../../services/auth.service';
  
  export interface CalorieCounterFormValues {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activityLevel: string;
  }
  
  export interface CalorieResults {
    bmi: number;
    minWeight: number;
    maxWeight: number;
    tdee: number;
    bmr: number;
  }
  
  function CalorieCounter() {
    const initialValues: CalorieCounterFormValues = {
      age: 0,
      gender: '',
      weight: 0,
      height: 0,
      activityLevel: '',
    };
  
    const initialResults: CalorieResults = {
      bmi: 0,
      minWeight: 0,
      maxWeight: 0,
      tdee: 0,
      bmr: 0,
    };
  
    const [calorieCounterFormValues, setCalorieCounterFormValues] = useState<CalorieCounterFormValues>(initialValues);
    const [calorieResults, setCalorieResults] = useState<CalorieResults>(initialResults);
    const [error, setError] = useState({
      age: '',
      gender: '',
      weight: '',
      height: '',
      activityLevel: '',
    });
  
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      const { name, value } = e.target;
  
      setCalorieCounterFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
  
      setError((prevError) => ({
        ...prevError,
        [name]: '',
      }));
    };
  
    const calculate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const { age, gender, weight, height, activityLevel } = calorieCounterFormValues;
  
      if (!age || !gender || !weight || !height || !activityLevel) {
        setError({
          age: !age ? 'Age is required' : '',
          gender: !gender ? 'Gender is required' : '',
          weight: !weight ? 'Weight is required' : '',
          height: !height ? 'Height is required' : '',
          activityLevel: !activityLevel ? 'Activity level is required' : '',
        });
        return;
      }
  
      let bmr = 0;
  
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else if (gender === 'female') {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
      }
  
      const tdee = bmr * parseFloat(activityLevel);
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters ** 2);
  
      const minWeight = Math.round(18.5 * heightInMeters ** 2 * 100) / 100;
      const maxWeight = Math.round(24.9 * heightInMeters ** 2 * 100) / 100;
  
      setCalorieResults({
        bmr,
        tdee,
        bmi: Math.round(bmi * 100) / 100,
        minWeight,
        maxWeight,
      });
  
      handleOpen();
    };
  
    const saveCalorieData = () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        saveCalories(token, {
          caloriesRequired: calorieResults.tdee,
          weightRange: `${calorieResults.minWeight} - ${calorieResults.maxWeight}`,
        });
      }
  
      handleClose();
      setCalorieCounterFormValues(initialValues);
    };
  
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '650px',
          margin: '0 auto',
          padding: '20px',
          backgroundImage: 'url(calorie.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '25%',
          }}
        >
          <Typography component="h1">Calorie Counter</Typography>
          <Box component="form" onSubmit={calculate} noValidate>
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="age"
              name="age"
              label="Age"
              value={calorieCounterFormValues.age || ''}
              onChange={handleInputChange}
              error={!!error.age}
              helperText={error.age || ''}
            />
            <InputLabel id="gender-label">Gender</InputLabel>
            <RadioGroup
              aria-labelledby="gender-label"
              name="gender"
              value={calorieCounterFormValues.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="weight"
              name="weight"
              label="Weight"
              value={calorieCounterFormValues.weight || ''}
              onChange={handleInputChange}
              error={!!error.weight}
              helperText={error.weight || 'in kgs'}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="height"
              name="height"
              label="Height"
              value={calorieCounterFormValues.height || ''}
              onChange={handleInputChange}
              error={!!error.height}
              helperText={error.height || 'in cms'}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="activity-level-label">Activity Level</InputLabel>
              <Select
                labelId="activity-level-label"
                id="activity-level"
                name="activityLevel"
                value={calorieCounterFormValues.activityLevel || ''}
                onChange={handleInputChange}
              >
                <MenuItem value="1.2">Sedentary (Little to no exercise)</MenuItem>
                <MenuItem value="1.375">Lightly Active (Light exercise 1-3 days/week)</MenuItem>
                <MenuItem value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</MenuItem>
                <MenuItem value="1.725">Very Active (Hard exercise 6-7 days/week)</MenuItem>
                <MenuItem value="1.9">Extra Active (Very hard exercise or physical job)</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              Calculate Calories
            </Button>
          </Box>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Calorie Results
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '16px' }}>
                <strong>BMI:</strong> {calorieResults.bmi}
                <br />
                <strong>BMR:</strong> {calorieResults.bmr}
                <br />
                <strong>Ideal Weight:</strong> Between {calorieResults.minWeight} and {calorieResults.maxWeight} kg
                <br />
                <strong>TDEE:</strong> {calorieResults.tdee} kcal
              </Typography>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="contained" onClick={saveCalorieData}>
                  Save Calorie Data
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    );
  }
  
  export default CalorieCounter;
  