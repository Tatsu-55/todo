import { auth, provider, db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

//MUI
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//css
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
//MUI
export default function Login() {


    const navigate = useNavigate();
    /*const [error, setError] = useState('');*/
    
    const handleLogin = async (event) => {
        try {
          const result = await auth.signInWithPopup(provider);
            navigate('/');

          if (result.user) {
          createNewDocument(result.user.uid);
          console.log(result.user.uid);            
          }
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    }

    const createNewDocument = async (uid) => {
      try {
        await db.collection('todos').doc(uid).set({
          text: '',
        })
      } catch (error) {
        console.log(error);
      }
    }   

    //MUI---------
    const ButtonAppBar = () => {
        return (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
               
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  To-do
                </Typography>
                <Button color="inherit" onClick={handleLogin}>Login</Button>
              </Toolbar>
            </AppBar>
          </Box>
        );
      };


 const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 60,
        backgroundColor: 'primary.dark',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        alignContent:'center',
      }}
    >
      <Typography variant="body1" sx={{
        color: 'white',
      }}>©2023 Yamada Tatsunari</Typography>
    </Box>
  );
}

      //MUI------------

      const login = css`
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      `
      
      const container = css`
          width: 600px;
          height: 600px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      `
      const title = css`
      font-size: 30px;
          font-weight: 700;
          margin-bottom: 2rem;
      `
    return (
        <div style={{display: 'grid', gridTemplateRows: '1fr auto'}}>
            <ButtonAppBar />
            <section css={login}>
                <div css={container}>
                <h1 css={title}>Welcome to To-do App!</h1>
                <Button variant="contained" size="large" onClick={handleLogin}>Login with Google</Button>
                </div>
            </section>
            <Footer />  
          
        </div>
    );
};


