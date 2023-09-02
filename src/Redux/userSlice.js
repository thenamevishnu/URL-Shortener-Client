import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:'users',
    initialState:{
        id:"",
        name:"",
        email:"",
        picture:""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.id=action.payload.id
            state.picture=action.payload.picture
        }
    }
})

export const {updateUser} =UserSlice.actions
export default UserSlice.reducer