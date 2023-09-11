/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Avatar, Typography, TextField } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material/icons/AddCircleOutlineOutlinedIcon"
import { Button } from "@mui/material";

export default function Signup() {
    const paperStyle={padding:"30px 20px", width:300, margin:"20px auto"}
    const headerStyle={margin: 0}
    const avatarStyle={backgroundColor:"Blue"}
    return(
    <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon />    
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption">
                Please fill this form to create an account! 
            </Typography>
            </Grid>
        <form>
            <TextField fullWidth label="Name" placeholder="Enter your name" />
            <TextField fullWidth label="Email" placeholder="Enter your email"/>
            <TextField fullWidth label="Phone number" placeholder="Enter your number (no area code)"/>
            <TextField fullWidth label="Password" placeholder="Enter your password"/>
            <TextField fullWidth label="Confirm password"/>
            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        </form>
        </Paper>
    </Grid>
    )
}