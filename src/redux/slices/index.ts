import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Message {
  text:string;
  name: string;
}

export interface ChatState {
  messages:Message[];
  input:string;
  userName:string;
}

const initialState: ChatState = {
  messages: [],
  input:'',
  userName:''
}

export const counterSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateInput:(state, action: PayloadAction<string>) => {
      state.input= action.payload
    },
    updateUserName:(state, action: PayloadAction<string>) => {
      state.userName= action.payload
    },
    sendMessage:(state, action: PayloadAction<Message>) => {
      state.messages =  [...state.messages,action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateInput,sendMessage,updateUserName} = counterSlice.actions

export default counterSlice.reducer