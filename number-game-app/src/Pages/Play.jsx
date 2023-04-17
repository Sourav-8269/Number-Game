import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { generateArray, setArray } from '../Redux/User/action';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

function Play() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const arr=useSelector((store)=>store.UserReducer.data);
  const sortedArray=useSelector((store)=>store.UserReducer.sortedArray);
  // console.log(sortedArray,arr)

  useEffect(() => {
    dispatch(generateArray());
  }, []);

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
      console.log(sortedArray[i],items[i])
      if(sortedArray[i].name!=items[i].name){
        return;
      }
    }
    alert("You Win");
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