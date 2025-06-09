import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';

export interface Exercise {
  name: string;
  duration: string;
  repetitions: string;
  sets: string;
  equipment: string;
}

export interface DayPlan {
  day: string;
  exercises: Exercise[];
}

export interface Schedule {
  days_per_week: number;
  session_duration: string;
}

export interface ExercisePlanProps {
  data: {
    goal: string;
    fitness_level: string;
    total_weeks: number;
    schedule: Schedule;
    exercises: DayPlan[];
  };
}

function ViewExercises({ data }: { data?: any }) { // Use `any` for the data type here to avoid type errors
  
const testData = {
    "result": {
        "goal": "Increase overall fitness",
        "fitness_level": "Beginner",
        "total_weeks": 4,
        "schedule": {
            "days_per_week": 3,
            "session_duration": 30
        },
        "exercises": [
            {
                "day": "Monday",
                "exercises": [
                    {
                        "name": "Bodyweight Squats",
                        "duration": "5 minutes",
                        "repetitions": "10-15",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Push-Ups",
                        "duration": "5 minutes",
                        "repetitions": "5-10",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Plank",
                        "duration": "5 minutes",
                        "repetitions": "30 seconds",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Lunges",
                        "duration": "5 minutes",
                        "repetitions": "10-15 each leg",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Jumping Jacks",
                        "duration": "5 minutes",
                        "repetitions": "20",
                        "sets": "3",
                        "equipment": "None"
                    }
                ]
            },
            {
                "day": "Wednesday",
                "exercises": [
                    {
                        "name": "Standing Overhead Press",
                        "duration": "5 minutes",
                        "repetitions": "10",
                        "sets": "3",
                        "equipment": "Light Dumbbells"
                    },
                    {
                        "name": "Bent Over Dumbbell Rows",
                        "duration": "5 minutes",
                        "repetitions": "10",
                        "sets": "3",
                        "equipment": "Light Dumbbells"
                    },
                    {
                        "name": "Dead Bugs",
                        "duration": "5 minutes",
                        "repetitions": "10",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Mountain Climbers",
                        "duration": "5 minutes",
                        "repetitions": "20",
                        "sets": "3",
                        "equipment": "None"
                    }
                ]
            },
            {
                "day": "Friday",
                "exercises": [
                    {
                        "name": "Glute Bridges",
                        "duration": "5 minutes",
                        "repetitions": "10-15",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Tricep Dips",
                        "duration": "5 minutes",
                        "repetitions": "5-10",
                        "sets": "3",
                        "equipment": "Chair or Bench"
                    },
                    {
                        "name": "Wall Sit",
                        "duration": "5 minutes",
                        "repetitions": "30 seconds",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Burpees",
                        "duration": "5 minutes",
                        "repetitions": "5",
                        "sets": "3",
                        "equipment": "None"
                    },
                    {
                        "name": "Cool Down Stretch",
                        "duration": "5 minutes",
                        "repetitions": "1",
                        "sets": "1",
                        "equipment": "None"
                    }
                ]
            }
        ],
        "seo_title": "Beginner Workout Plan for Increased Fitness",
        "seo_content": "This workout plan is designed for beginners aiming to improve their overall fitness. It includes a variety of exercises that can be done at home without special equipment.",
        "seo_keywords": "beginner workouts, fitness plan, home workouts"
    },
    "cacheTime": 1733543406712,
    "time": 1733543821824
}
  const planData = testData.result; // Access the result property

  return (
    <Box sx={{ p: 4, bgcolor: '#f9f9f9' }}>
      {/* Goal and Plan Overview */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Exercise Plan
        </Typography>
        <Typography variant="body1">
          <strong>Goal:</strong> {planData.goal}
        </Typography>
        <Typography variant="body1">
          <strong>Fitness Level:</strong> {planData.fitness_level}
        </Typography>
        <Typography variant="body1">
          <strong>Total Weeks:</strong> {planData.total_weeks}
        </Typography>
        <Typography variant="body1">
          <strong>Schedule:</strong> {planData.schedule.days_per_week} days/week, {planData.schedule.session_duration}/session
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Daily Exercise Plan */}
      {planData.exercises.map((dayPlan: any) => (
        <Box key={dayPlan.day} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {dayPlan.day}
          </Typography>
          {/* Render Exercises without Grid */}
          {dayPlan.exercises.map((exercise: any, index: any) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {exercise.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duration:</strong> {exercise.duration}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Repetitions:</strong> {exercise.repetitions}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Sets:</strong> {exercise.sets}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Equipment:</strong> {exercise.equipment}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default ViewExercises;
