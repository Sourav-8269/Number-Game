import React from 'react'
import {Route,Routes} from "react-router-dom";
import Home from '../Pages/Home';
import LeaderBoard from '../Pages/LeaderBoard';
import Play from '../Pages/Play';
import NoRoutes from '../Pages/NoRoutes';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/play" element={<Play/>}></Route>
        <Route path="/leaderboard" element={<LeaderBoard/>}></Route>
        <Route path="*" element={<NoRoutes/>} ></Route>
    </Routes>
  )
}

export default MainRoutes