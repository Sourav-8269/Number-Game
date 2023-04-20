import React, { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { generateArray, setArray } from '../Redux/User/action';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useToast,Heading,Box} from '@chakra-ui/react';
import "../App.css"

function Play() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const arr=useSelector((store)=>store.UserReducer.data);
  const sortedArray=useSelector((store)=>store.UserReducer.sortedArray);
  // console.log(sortedArray,arr)
  const user=JSON.parse(localStorage.getItem("user"));
  const toast=useToast();
  const [count, setCount] = useState(20);
  const [min, setmin] = useState(0);
  const timeref = useRef(null);

  useEffect(() => {
    dispatch(generateArray());
    if(user.difficulty=="high"){
      setCount(10);
    }else if(user.difficulty=="medium"){
      setCount(20);
    }else{
      setCount(30);
    }
    handlestart();
    return ()=>{
      handlereset();
    }
  }, []);

  const handleScore=(flag)=>{
    const payload=user;
    if(flag==false){
      payload.score=0;
    }else{
      if(user.difficulty=="low"){
        payload.score=5;
      }else if(user.difficulty=="medium"){
        payload.score=7;
      }else if(user.difficulty=="high"){
        payload.score=10;
      }
    }
    console.log(payload)
    // axios.post(`https://number-game-backend.onrender.com/scores`,payload)
    // .then((res)=>{
      toast({
        title: "Game Ended Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position:"top"
      });
    // })
    // .catch((err)=>console.log(err));
    setTimeout(() => {
    //  navigate("/leaderboard");
   }, 3000)
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // console.log(sorted_Array,sortArr)
    // console.log(arr,sortArr)
    const items = Array.from(arr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // updateCharacters(items);
    dispatch(setArray(items))
    check(items);
  }
  
  const check=(items)=>{
    for(let i=0;i<arr.length;i++){
      // console.log(sortedArray[i],items[i])
      if(sortedArray[i].name!=items[i].name){
        return;
      }
    }
    // alert("You Win");
    handleScore(true)
  }

  const handlereset = () => {
    clearInterval(timeref.current);
    timeref.current = null;
    setCount(60);
    setmin(0);
  };

  const handlestart = () => {
    if (timeref.current != null) return;
    timeref.current = setInterval(() => {
      setCount((prev) => {
        if (prev == 0) {
          prev = 60;
          setmin((p) => {
            if (p == 0) {
              // postresult();
              console.log("Ended");
              
              handlereset();
              handleScore(false);
            }
            return p - 0.5;
          });
        }
        return prev - 1;
      });
    }, 1000);
 }


  return (
    <div className="App" >
      <header className="App-header">
        <h1>Final Space Characters</h1>
       
        <DragDropContext onDragEnd={handleOnDragEnd}> 
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <div id="mapped-numbers" className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {arr.length>0&&arr.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p id="number" >
                            { name }
                          </p>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Box rounded="full" border="1px solid #7B341E" bg="#68D391" p="3%">
            <Heading >{count} </Heading>
        </Box>
      </header>
    </div>
  );
}

export default Play;