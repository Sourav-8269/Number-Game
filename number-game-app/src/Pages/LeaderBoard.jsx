import React from 'react'
import {Container,Box,Heading,Text,Button} from "@chakra-ui/react"
import {useEffect} from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import { useToast } from '@chakra-ui/react';
const LeaderBoard = () => {
    const [data,setdata]=useState([]);

    const getData=()=>{
        axios.get("https://number-game-backend.onrender.com/scores")
        .then((res)=>{
            setdata(res.data)
        })
        .catch((err)=>console.log(err))
    }
    
    useEffect(() => {
        getData()
    }, []);

  return (
    <Container maxW="full" h="100vh" mt={5} centerContent overflow="hidden">
    <Box   bg="#02054B"
    // w="80%"
    w={["90%","80%","60%"]}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 1, md: 5, lg: 16 }} >
        <Heading size="lg" as="h3" fontWeight="400" p="1%">Leaderboard</Heading>  
            <Box p="4">
               {data&&data.map((el)=>(
                <div key={el.id} id="players" >
                    <p><b>{el.name}</b></p>
                    <p>{el.difficulty}</p>
                    <p>{el.score}</p>
                </div>
               ))}
            </Box>
            <Link to="/" ><Button colorScheme="blue" p="3%" m="3%" >Start a New Game</Button></Link>

    </Box>
   </Container>
  )
}

export default LeaderBoard