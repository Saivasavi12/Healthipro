import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { error } from 'console';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { getUserDetails } from '../../services/auth.service';
import { fetchExercises, getRecipesByCalories } from '../../services/healthy.service';
import ViewMealItems from './ViewMealItems';

export interface userDetails {
    caloriesRequired: string;
    weightRange: string;
}

function MealDashboard() {

    const [searchType, setSearchType] = useState('');
    const [userDetails, setUserDetails] = useState<userDetails>({
        caloriesRequired: '',
        weightRange: ''
    });
    const [itemSearchSelected, isItemSearchSelected] = useState(false);
    const [showMenuItems, setShowMenuItems] =useState(false)
    const [mealItems, setMealItems] = useState({});
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const searchTypeSelected = e.target.value;
        setSearchType(searchTypeSelected);
        if (searchTypeSelected === 'items') {
            isItemSearchSelected(true)
        } else {
            isItemSearchSelected(false)
        }
    }

    const handleSearch = () => {
        if (searchType === 'calories') {
            getRecipesByCalories(Number(userDetails.caloriesRequired)).then(res => {
                setMealItems(res);
                setShowMenuItems(true);
            })

            
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        getUserDetails(token).then(res => setUserDetails(res))
    }, [])
    return (
        <Box sx={{
            margin: '0 auto',
            marginTop: "5%"
        }}>
            <Typography variant='h4'>Diet Dashboard</Typography>

            <Box sx={{ padding: 3, backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Your Details:
                </Typography>

                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ marginTop: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                            <strong>Calories required:</strong> {userDetails?.caloriesRequired} kcal
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                            <strong>Ideal Weight Range:</strong> {userDetails?.weightRange} kg
                        </Typography>
                    </Box>
                </Stack>
            </Box>


            <Box component="form" sx={{ width: '100%', margin: '30px', display: 'flex', flexDirection: 'row', gap: '30px', height: '50px', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', width: '50%', flexDirection: 'column', marginTop: '30px' }}>
                    <FormControl fullWidth margin="normal" >
                        <InputLabel id="activity-level-label">Search By</InputLabel>
                        <Select
                            labelId="activity-level-label"
                            id="activity-level"
                            name="activityLevel"
                            value={searchType}
                            onChange={handleInputChange}
                            label="Search By"
                        >
                            <MenuItem value="calories">Calories</MenuItem>
                            <MenuItem value="items">Items</MenuItem>
                        </Select>
                    </FormControl>
                    {itemSearchSelected && (
                        <TextField
                            required
                            margin="normal"
                            id="items"
                            label="Enter Items"
                            name="items"
                            helperText="Enter Items seperated with commas"
                            onChange={handleInputChange}
                            autoFocus />
                    )}
                </Box>
                <Button onClick={handleSearch} variant='contained' sx={{ width: '10%' }}> Search</Button>
                <Box sx={{ flex: 1, p: 3, width: '40%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#555', lineHeight: 1.6, marginTop: '10px' }}>
                        <strong>An average human needs:</strong>
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body2" sx={{ color: '#444' }}>
                                <strong>Carbohydrates:</strong> 45-65% of total calories
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" sx={{ color: '#444' }}>
                                <strong>Proteins:</strong> 10-35% of total calories
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" sx={{ color: '#444' }}>
                                <strong>Fats:</strong> 20-35% of total calories
                            </Typography>
                        </li>
                    </ul>
                </Box>
            </Box>
            {showMenuItems && (<ViewMealItems items={mealItems} />)}
        </Box>
    )
}

export default MealDashboard
