import { AppBar, Button, CircularProgress, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const router = useNavigate();
    const navItems = ['Home', 'Services', 'Profile', 'Logout'];
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuClick = (event: any, item: any) => {
        if (item === 'Logout') {
            logout();
            router('/login')
        } else if (item === 'Services') {
            setAnchorEl(event.currentTarget);
            setOpenMenu(true);
        } else if (item === 'Home') {
            router('/home')
        } else if (item === 'Profile') {
            router('/my-profile')
        }
    }
    const handleRedirect = (path: string) => {
            setAnchorEl(null);
        setTimeout(() => {
            router('/' + path); // Redirect to the home page
        }, 1000);
        
    };
    return (
        <AppBar component="nav">
            <Box
                sx={{ backgroundColor: '#8b4513' }}
            >
                <Toolbar>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img alt="healthipro" src="healthipro-log.jpg" width="85px" />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {isAuthenticated && navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={(event) => handleMenuClick(event, item)}>
                                {item}
                            </Button>
                        ))}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                        >
                            <MenuItem onClick={() => handleRedirect('calorie-counter')}>Calorie Counter</MenuItem>
                            <MenuItem onClick={() => handleRedirect('personal-journal')}>Your Journal</MenuItem>
                            <MenuItem onClick={() => handleRedirect('personalised-diet')}>Meal Planner</MenuItem>
                            <MenuItem onClick={() => handleRedirect('fitness')}>Fitness</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>

    )
}

export default Navbar
