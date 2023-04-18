import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { store } from './Redux/store';
import MainRoutes from "./Routes/MainRoutes"
import { generateArray } from './Redux/User/action';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import { Box, useColorMode } from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="App" >
      <Box bg={colorMode=="light"?"#9DC4FB":"#FFFFF"} >
        <Navbar/>
        <MainRoutes/>  
      </Box>
    </div>
  );
}

export default App;