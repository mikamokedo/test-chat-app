import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface IMessage {
  text:string;
  name: string;
  id:string;
}

export interface ChatState {
  messages:IMessage[];
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
    sendMessage:(state, action: PayloadAction<IMessage>) => {
      const messages = [...state.messages,action.payload]
      state.messages =  messages;
      window.localStorage.setItem("messages",JSON.stringify(messages))
    },
    restoreMessage :(state, action: PayloadAction<IMessage[]>) => {
      state.messages =  action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateInput,sendMessage,updateUserName,restoreMessage} = counterSlice.actions

export default counterSlice.reducer