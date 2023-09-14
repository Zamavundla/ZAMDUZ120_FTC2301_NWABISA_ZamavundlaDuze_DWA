/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { supabase } from '../Toggle/supabaseClient';

export default function LoginForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error.message);
        // Handle login error (e.g., display error message to the user)
      } else if (user && session) {
        // Redirect to the home page or any other route upon successful login
        history.push('/home');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography variant="h5">Login</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Email</InputLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Password</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
}
