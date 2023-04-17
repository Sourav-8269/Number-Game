import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { store } from './Redux/store';
import MainRoutes from "./Routes/MainRoutes"
import { generateArray } from './Redux/User/action';
import { useEffect } from 'react';

function App() {
  const dispatch=useDispatch();
  console.log(store.getState())
  // const arr=useSelector((store)=>store.UserReducer.data);
  // console.log(arr)
  useEffect(() => {
    dispatch(generateArray);
  }, []);
  return (
    <div className="App">
      <MainRoutes/>  
    </div>
  );
}

export default App;