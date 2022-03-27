import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function AddProfiless() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
const platforms=["Leetcode","HackerRank","CodeChef"]
  const handleClose = () => {
    setOpen(false);
  };
  const [platform, setPlatform] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value as string);
  };
  return  <div>
  <Button variant="outlined" onClick={handleClickOpen}>
    Add Profile
  </Button>
  <Dialog open={open} onClose={handleClose}
  >
    <DialogTitle>Add profile</DialogTitle>
    <DialogContent>
    
    <Box>
   
<FormControl fullWidth sx={{
            marginTop:3
          }}>
        <InputLabel id="demo-simple-select-label">Platform</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={platform}
          label="Platform"
          onChange={handleChange}
          

        >
          {platforms.map((platform) => (
          <MenuItem value={platform}>{platform}</MenuItem>
           
          ))}
         
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        id="name"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        autoFocus

      />
    </Box>
    
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Add another</Button>
    </DialogActions>
  </Dialog>
</div>
}

export default AddProfiless;
