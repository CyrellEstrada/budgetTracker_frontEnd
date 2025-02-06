import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BudgetDashboard from './BudgetDashboard';
import AppBar from './AppBar'

function Home() {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    logout
  } = useAuth0();

  // This effect runs whenever isAuthenticated or user changes
  useEffect(() => {
    const upsertUserInDatabase = async () => {
      // Only attempt if the user is logged in
      if (!isAuthenticated || !user) return;

      try {
        // OPTIONAL: If your backend is secured with Auth0 access tokens:
        const token = await getAccessTokenSilently();


        await fetch('https://budgettracker0.onrender.com/users/', {
          method: 'POST',
          headers: {
            // Send the JWT access token to authenticate this request
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            autho_id: user.sub,       // Auth0's unique user ID
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name,
            username: user.nickname
            // Add more fields if needed (picture, metadata, etc.)
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
    <div>
    <AppBar></AppBar>
      <h1>My Budget Tracker</h1>
        <BudgetDashboard/>
    </div>
  );
}

export default Home;