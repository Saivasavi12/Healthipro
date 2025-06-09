import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';

function ViewMealItems({ items }: any) {
  const renderMeals = (day: string, meals: any[], nutrients: any) => (
    <Box sx={{ mb: 4 }} key={day}>
      <Typography variant="h4" gutterBottom>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {meals.map((meal: any) => (
          <Box
            key={meal.id}
            sx={{
              flex: '1 1 calc(33.333% - 16px)', // Adjust for three cards per row
              maxWidth: 'calc(33.333% - 16px)',
            }}
          >
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`}
                title={meal.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {meal.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready in {meal.readyInMinutes} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Servings: {meal.servings}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href={meal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recipe Link
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Card sx={{ maxWidth: 345, mx: 'auto' }}>
          <CardContent>
            <Typography variant="h6">Nutritional Info</Typography>
            <Typography variant="body2">Calories: {nutrients.calories} kcal</Typography>
            <Typography variant="body2">Protein: {nutrients.protein} g</Typography>
            <Typography variant="body2">Fat: {nutrients.fat} g</Typography>
            <Typography variant="body2">Carbs: {nutrients.carbohydrates} g</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      {Object.keys(items.week).map((day) => {
        const dayData = items.week[day];
        return renderMeals(day, dayData.meals, dayData.nutrients);
      })}
    </Box>
  );
}

export default ViewMealItems;
