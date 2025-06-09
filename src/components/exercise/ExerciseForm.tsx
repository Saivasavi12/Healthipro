import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { fetchExercises } from '../../services/healthy.service';
import ViewExercises, { ExercisePlanProps } from './ViewExercise';
import { Schedule } from '@mui/icons-material';

export interface fitnessForm {
    goal: string;
    fitness_level: string;
    preferences: string[];
    health_conditions: string[];
    schedule: {
        days_per_week: number;
        session_duration: number;
    };
    plan_duration_weeks: number;
    lang: string;

}

function ExerciseForm() {

    const initialFormValues: fitnessForm ={
        goal: '',
        fitness_level: '',
        preferences: [],
        health_conditions: [],
        schedule: {
            days_per_week: 0,
            session_duration: 0
        },
        plan_duration_weeks: 0,
        lang: ''
    }
    
    const [fitnessFormValues,setFitnessFormValues] = useState(initialFormValues);
    const [fitnessAdvice, setFitnessAdvice] = useState<ExercisePlanProps>();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setFitnessFormValues({
            ...fitnessFormValues,
            [name]: value
        })
    }

    const handlePreferenceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        const filtered:string[]= value.split(',');
        setFitnessFormValues({
            ...fitnessFormValues,
            [name]: filtered
        })
    }

    const getFitnessPlan = () => {
        fetchExercises(fitnessFormValues)  
      .then((response:any) => {
        setFitnessAdvice(response.result)
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
    }
    return (
        <Box sx={{ marginTop: "5%" }}>
            <Typography variant='h5'>Your Personal Trainer</Typography>
            <Box component="form">

                <Box sx={{width: '90%', marginLeft: '10px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="goal"
                        label="Enter your Goal"
                        name="goal"
                        onChange={handleInputChange}
                        helperText=""
                        value={fitnessFormValues.goal}
                        autoFocus />
                    <FormControl fullWidth margin="normal">
                    <InputLabel id="fitness-level-label">Fitness Level</InputLabel>
                    <Select
                        labelId="fitness-level-label"
                        id="fitnessLevel"
                        name="fitness_level"
                        value={fitnessFormValues.fitness_level}
                        onChange={handleInputChange}
                        label="Fitness Level"
                    >
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="healthConditions"
                        label="Enter your Health Conditions"
                        name="health_conditions"
                        onChange={handlePreferenceChange}
                        helperText=""
                        value={fitnessFormValues.health_conditions}
                        autoFocus />
                
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="preferences"
                        label="Enter your Preferences"
                        name="preferences"
                        onChange={handlePreferenceChange}
                        helperText=""
                        value={fitnessFormValues.preferences}
                        autoFocus />
                        
                <FormControl fullWidth margin="normal" sx={{width: '150px'}}>
                    <InputLabel id="days-label">Days Per Week</InputLabel>
                    <Select
                        labelId="days-label"
                        id="days_per_week"
                        name="days_per_week"
                        value={String(fitnessFormValues.schedule.days_per_week)}
                        onChange={handleInputChange}
                        label="Days Per Week"
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="session_duration"
                        label="Enter desired Session Duration"
                        name="session_duration"
                        onChange={handleInputChange}
                        helperText="in minutes"
                        value={fitnessFormValues.schedule.session_duration}
                        sx={{width: '350px'}}
                        autoFocus />
<Button variant='contained' onClick={getFitnessPlan}>Get Fitness Planner</Button>
</Box>
                </Box>
            </Box>
            {fitnessAdvice && <ViewExercises data={fitnessAdvice} />}
        </Box>
    )
}

export default ExerciseForm
