import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { generateArray, setArray } from '../Redux/User/action';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

function Play() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const arr=useSelector((store)=>store.UserReducer.data);
  const sortedArray=useSelector((store)=>store.UserReducer.sortedArray);
  // console.log(sortedArray,arr)
  const user=JSON.parse(localStorage.getItem("user"));
  const toast=useToast();

  useEffect(() => {
    dispatch(generateArray());
  }, []);

  const handleScore=()=>{
    console.log(user)
    const payload=user;
    if(user.difficulty=="low"){
      payload.score=5;
    }else if(user.difficulty=="medium"){
      payload.score=7;
    }else if(user.difficulty=="high"){
      payload.score=10;
    }
    console.log(payload)
    axios.post(`https://number-game-backend.onrender.com/scores`,payload)
    .then((res)=>{
      toast({
        title: "Game Ended Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position:"top"
      });
    })
    .catch((err)=>console.log(err));
    setTimeout(() => {
     navigate("/leaderboard");
   }, 2000)
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
    alert("You Win");
    handleScore()
    navigate("/leaderboard");
  }

 


  return (
    <div className="App" >
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}> 
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <div style={{display:"flex",justifyContent:"space-around",gap:"20px"}} className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {arr.length>0&&arr.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
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
      </header>
    </div>
  );
}

export default Play;