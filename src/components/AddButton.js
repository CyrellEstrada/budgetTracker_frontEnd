import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Margin } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [savingsGoal, setSavingsGoal] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    logout
  } = useAuth0();
  const token = getAccessTokenSilently();
  // Here we would make a fetch request to my Express API 
  // posting the data of the form to my data endpoint
  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    console.log("*********************")
    await fetch('http://localhost:4001/budget', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        savings_goal: savingsGoal,
        autho_id: user.sub
      })
    })
  }

  return (
    <div>
      <Button
      onClick={handleOpen}
      size='large'
      >+</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        component="form"
        sx={style}
        autoComplete="off"
        >
          <Typography 
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          >
            Insert Savings Goal
          </Typography>
          <TextField
            id="outlined-controlled"
            label="Savings"
            type='number'
            value={savingsGoal}
            onChange={(event) => {
              setSavingsGoal(event.target.value);
          }   
        }
      />
      <Button
      onClick={handleSubmit}
      >Test</Button>
        </Box>
      </Modal>
    </div>
  );
}
