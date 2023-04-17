import { useDispatch } from "react-redux";
import * as types from "./actionTypes";
import axios from "axios";

const getRequest=()=>{
    return {
        type:types.GET_REQUEST
    }
}

const getSuccess=(data)=>{
    return {
        type:types.GET_SUCCESS,
        payload:data
    }
}

const getError=()=>{
    return {
        type:types.GET_ERROR
    }
}
const generateArray=()=>(dispatch)=>{
    dispatch(getError())
    let arr=new Array(10);
    for(let i=0;i<arr.length;i++){
      let obj={
        id:(Math.floor(Math.random()*100)+500),
        name:(Math.floor(Math.random() *-100) + 100)
      }
      arr[i]=obj
    }
    dispatch(getSuccess(arr))
    console.log(arr);
    // return arr
  }

  const setArray=(arr)=>(dispatch)=>{
    dispatch(getError())
    if(arr.length>0){
        dispatch(getSuccess(arr));
    }else{
        dispatch(getError());
    }
  }



export {getError,getRequest,getSuccess,generateArray,setArray}