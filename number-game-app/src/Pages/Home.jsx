import React from 'react'
import {Heading,Input,FormControl,FormLabel,RadioGroup,HStack,Radio,FormHelperText,Button,Select,useToast, Box, useColorMode} from "@chakra-ui/react"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [name,setname]=useState("");
    const [category,setcategory]=useState("");
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate=useNavigate("");
    const toast=useToast();

    const handleAdd=()=>{
      if(name==""||category==""){
        toast({
          title: "Please Enter All Fields",
          status: "info",
          duration: 2000,
          isClosable: true,
          position:"top"
        });
        return;
      }
        const payload={name,difficulty:category};
        // axios.post(`https://number-game-backend.onrender.com/users`,payload)
        // .then((res)=>{
            localStorage.setItem("user",JSON.stringify(payload))
            toast({
              title: "Game Started",
              status: "success",
              duration: 2000,
              isClosable: true,
              position:"top"
            });
            navigate("/play")
        // })
        // .catch((err)=>console.log(err))
    }
   

  return (
    <Box h="100vh"  >
        <Heading size="lg" as="h3" fontWeight="400" p="1%" mt="3%" >Welcome</Heading> 
    <HStack w="40%" m="auto" mt="2%" mb="5%" boxShadow='lg' p="2%" rounded='md' bg={colorMode=="light"?"#ECC94B":"#822727"}>
      <FormControl as="fieldset">
        <FormLabel as="legend" >Name</FormLabel>
        <Input  size='md' mb="2%" placeholder="Enter Name"  value={name} onChange={(e)=>setname(e.target.value)} />
        <FormLabel as="legend">Category</FormLabel>
        <Select placeholder='Select Difficulty' value={category} onChange={(e)=>setcategory(e.target.value)}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
        </Select>
        <Button variant="solid" colorScheme="green" onClick={handleAdd} ml="5%" mt="5%" >
               Start The Game
            </Button>
      </FormControl>
    </HStack>
    </Box>
  )
}

export default Home