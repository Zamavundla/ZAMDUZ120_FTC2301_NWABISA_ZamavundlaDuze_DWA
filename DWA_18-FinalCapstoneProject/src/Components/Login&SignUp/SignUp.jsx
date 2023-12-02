// import React from "react";
// import { Link } from "react-router-dom";
// import { supabase } from "./Client";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { styled } from '@mui/system';

// const BackgroundContainer = styled('div')({
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   minHeight: '100vh',
//   display: 'flex',
//   alignItems: 'center',
// });

// const ContentContainer = styled('div')({
//   backgroundColor: 'rgba(0, 128, 255, 0.8)', 
//   padding: '16px', 
//   borderRadius: '4px',
//   boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
//   width: '100%', 
// });

// const defaultTheme = createTheme();

// function SignUpPage() {
//   const [formData, setFormData] = React.useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     event.preventDefault();
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { user, error } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//       });

//       if (error) {
//         throw error;
//       }

//       if (user) {
//         alert("Check your email for a verification link");
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <BackgroundContainer>
//       <CssBaseline />
//       <Container maxWidth="sm">
//         <ContentContainer>
//           <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//               <CssBaseline />
//               <Box
//                 sx={{
//                   marginTop: 8,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                   <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                   Sign Up
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     autoFocus
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                     onChange={handleChange}
//                   />
//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                     name="submit"
//                   >
//                     Sign Up
//                   </Button>
//                   <Grid container>
//                     <Grid item>
//                       <Link to="/" variant="body2">
//                         {"Already have an account? Login"}
//                       </Link>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Container>
//           </ThemeProvider>
//         </ContentContainer>
//       </Container>
//     </BackgroundContainer>
//   );
// }

// export default SignUpPage;



import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "./Client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/system';

const BackgroundContainer = styled('div')({
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
});

const ContentContainer = styled('div')({
  backgroundColor: 'rgba(0, 128, 255, 0.8)', 
  padding: '16px', 
  borderRadius: '4px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  width: '100%', 
});

const defaultTheme = createTheme();

function SignUpPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        alert("Check your email for a verification link");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BackgroundContainer>
      <CssBaseline />
      <Container maxWidth="sm">
        <ContentContainer>
          <ThemeProvider theme={defaultTheme}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  name="submit"
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/" variant="body2">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </ThemeProvider>
        </ContentContainer>
      </Container>
    </BackgroundContainer>
  );
}

export default SignUpPage;
