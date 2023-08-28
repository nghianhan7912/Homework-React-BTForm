import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    listSV : [],
    svEdit : undefined,
}

const BTFormSlice = createSlice({
    name : "BTForm",
    initialState,
    reducers : {
        addSV : (state , {payload}) => {
            if(state.listSV?.find((v) => v.maSV === payload.maSV)){
                return 
            } else {
                state.listSV.push(payload)
            }
        },
        deleteSV : (state, {payload}) => {
            state.listSV = state.listSV.filter((v)=> v.maSV !== payload)
        },
        editSV : (state, {payload}) => {
            state.svEdit = payload
        },
        updateSV : (state, {payload}) =>{
            const index = state.listSV.findIndex((v) => v.maSV === payload.maSV)
            state.listSV[index] = payload
            state.svEdit = undefined
        },
    
    }
})
export const {reducer : BTFormReducer , actions : BTFormActions} = BTFormSlice