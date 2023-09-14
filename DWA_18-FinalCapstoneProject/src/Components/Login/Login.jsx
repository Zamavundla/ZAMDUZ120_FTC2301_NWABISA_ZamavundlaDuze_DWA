/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { supabase } from '../Toggle/supabaseClient'; 
import { Grid, Paper, Avatar, TextField, Button, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


export default function Login () {
    const paperStyle={padding :"20px", height:"70vh", width:200, margin: "20px auto"};
    const avatarStyle={backgroundColor: "Blue"}
    const btnstyle={margin: "8px 0"}
    return(
        <Grid>
            <Paper elevation={15} style={paperStyle}>
            <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Sign In</h2>       
            </Grid>
            <TextField label="Username" placeholder="Enter username" fullWidth required />
            <TextField label="Password" placeholder="Enter password" type="password"fullWidth required />
            <FormControlLabel 
                control={
                    <Checkbox
                        name="checked"
                        color="primary"
                 />
                }
                    label="Remember me"
            />
            <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>Sign In</Button>
            <Typography>
                <Link href="forgot password" >
                    Forgot password
                </Link>
            </Typography>
            <Typography> Do you have an account? 
                <Link href="signup" >
                    Sign Up
                </Link>
            </Typography>

            </Paper>
        </Grid>
    )
}