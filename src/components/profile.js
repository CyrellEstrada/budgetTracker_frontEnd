function Profile() {
    const { user, isAuthenticated } = useAuth0();
  
    if (!isAuthenticated) {
      return <p>User not logged in!</p>;
    }
  
    return (
      <div>
        <img src={user.picture} alt="User Avatar" />
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
      </div>
    );
  }
  
  export default Profile;