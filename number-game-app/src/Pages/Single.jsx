import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Single = ({todo,index}) => {
    console.log(todo,index,todo.id)
  return (
    <Draggable draggableId={todo.id.toString()} index={index} >
        {(provided)=>(
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <h1>{todo.todo}</h1>
            </div>
        )}
    </Draggable>
  )
}

export default Single