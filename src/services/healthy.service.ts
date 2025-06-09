import axios from 'axios';

const MEAL_API_KEY = '876dcb38b0ec4616b5f642809f99fa4e';
const BASE_MEAL_URL = 'https://api.spoonacular.com';

const EXERCISE_API_KEY = 'b1b5a56a2cmsh4918e99e020baacp1a4961jsnf644d80e211f';
const EXERCISE_API_HOST = 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com';

export const getRecipesByCalories = async (targetCalories: any) => {
    try {
        const response = await axios.get(`${BASE_MEAL_URL}/mealplanner/generate`, {
            params: {
                apiKey: MEAL_API_KEY,
                timeFrame: 'week',
                targetCalories: targetCalories,
                minCalories: targetCalories - 50,
                maxCalories: targetCalories + 50,
                number: 10,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes by calories', error);
        throw error;
    }
};

export const getRecipesByItems = async (items: any) => {
    try {
        const response = await axios.get(`${BASE_MEAL_URL}/recipes/findByIngredients`, {
            params: {
                apiKey: MEAL_API_KEY,
                ingredients: items.join(','),
                number: 5,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes by items', error);
        throw error;
    }
};


export const fetchExercises = async (userData: any) => {
    const options = {
        method: 'POST',
        url: 'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan?noqueue=1',
        headers: {
            'X-RapidAPI-Key': EXERCISE_API_KEY,
            'X-RapidAPI-Host': EXERCISE_API_HOST,
        },
        data: userData
    };

    try {
        const response = await axios(options);
        console.log('Exercises:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
};