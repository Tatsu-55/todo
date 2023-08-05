import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { auth } from '../Firebase';
import { useNavigate,Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
//MUI
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Home() {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    const Footer = () => {
      return (
        <footer style={{ paddingTop: "20em"}}>
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
        </footer>
      );
    }

    //MUI---------
    const ButtonAppBar = () => {
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="20vh"
            justifyContent="center"
          >
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  To-do
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
           
          </Box>
        );
      };

      //MUI--------------------------------------

      //emotion css


      if (!user) {
        return <Navigate replace to="/login"/>;
      } else {
        return (
          <div>
          <ButtonAppBar />
          <div style={{position:"relative"}}>    
            <TodoForm />
            <TodoList />
            </div>
           <Footer />
           </div>
        );

      }
};