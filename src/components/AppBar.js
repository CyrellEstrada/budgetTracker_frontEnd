import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from '@auth0/auth0-react';
  

    
export default function ButtonAppBar() {
    const {
        loginWithRedirect,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        logout
      } = useAuth0();

      useEffect(() => {
        const upsertUserInDatabase = async () => {
          if (!isAuthenticated || !user) return;
          try {
            const token = await getAccessTokenSilently();
            await fetch('https://budgettracker0.onrender.com/users/', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                autho_id: user.sub,
                email: user.email,
                first_name: user.given_name,
                last_name: user.family_name,
                username: user.nickname
              })
            });
            console.log('Successfully upserted user into database!');
          } catch (error) {
            console.error('Error adding/updating user:', error);
          }
        };
        upsertUserInDatabase();
      }, [isAuthenticated, user, getAccessTokenSilently]);

      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* Left side icon */}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
    
              {/* Title */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Budget Tracker
              </Typography>
    
              {/* If not logged in, show login button */}
              {!isAuthenticated && (
                <Button color="inherit" onClick={() => loginWithRedirect()}>
                  Log In
                </Button>
              )}
    
              {/* If logged in, show logout button */}
              {isAuthenticated && (
                <Button
                  color="inherit"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      );
    }