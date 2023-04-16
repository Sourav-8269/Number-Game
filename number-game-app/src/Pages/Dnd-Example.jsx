import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import Single from './Single';

const Dnd = () => {
  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState([{todo:"Code",id:Date.now()+1001243}]);
  const [update,setupdate]=useState([{todo:"Eat",id:Date.now()+Math.floor(Math.random(100))*100}])
    const arr=[1,2,3,4,5,6,7,8];

    const handleCLick=()=>{
      if(todo){
        setTodos([...todos,{todo,id:Date.now()}])
        setTodo("");
      }
    }
    // console.log(todos)
  return (
    <div>
      <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
      <button onClick={handleCLick} > Add</button>
      <Droppable droppableId="listAdd" >
          {(provided)=>(
          <div ref={provided.innerRef} {...provided.droppableProps} style={{display:"flex",gap:"10px"}} > 
            {todos&&todos.map((el,index)=>(
              // <h1 id={i} >{el}</h1>
              <Single key={el.id} index={index} todo={el}  />
              ))}
               {provided.placeholder}
          </div>
          )}
        </Droppable>
        <Droppable droppableId="listRemove" >
        {(provided)=>(
          <div ref={provided.innerRef} {...provided.droppableProps} style={{display:"flex",gap:"10px"}} > 
          {update&&update.map((el,index)=>(
            <Single key={el.id} index={index} todo={el}  />
            ))}
             {provided.placeholder}
        </div>
        )}
        </Droppable>
      </div>
  )
}

export default Dnd