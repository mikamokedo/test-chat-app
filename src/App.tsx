import Message from "./components/chat/Message";
import "./App.css";
import Input from './components/chat/Input'
import SendButton from './components/chat/SendButton'
import JoinRoomModal from './components/chat/JoinRoom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "./redux/store";
import { updateInput,sendMessage,updateUserName } from './redux/slices/index'
import { useState } from "react";

function App() {
  const [isJoinRoom,setIsJoinRoom] = useState(false);
  const dispatch = useDispatch()
  const input = useSelector((state: RootState) => state.chat.input)
  const userName = useSelector((state: RootState) => state.chat.userName)
  
  const handleSend = () =>{
    dispatch(sendMessage({text:input,name:userName}));
    dispatch(updateInput(""));
  }
  const handleJoinRoom = (name:string) =>{
    if(!name){
      alert("Please input username first");
      return;
    }
    dispatch(updateUserName(name))
    setIsJoinRoom(true);
  }

  return <>
    {!isJoinRoom ? <JoinRoomModal handleSend={handleJoinRoom} /> :     <div className="max-w-[800px] border border-black mt-[30px] mx-[auto]">
    <div className=" flex flex-col gap-[10px] p-[20px]  max-h-[500px] overflow-y-scroll">
    <Message
      textContent="just a messagee from sender ust a messagee from sender ust a messagee from sender just a messagee from sender ust a messagee from sender ust a messagee from sender"
      name="Q"
      isSender={true}
    />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    <Message textContent="just a messagee" name="phu123" isSender={false} />
    </div>
    <div className="flex bg-indigo-500 p-[20px]">
    <Input value={input} onChange={(value) => dispatch(updateInput(value))}/>
    <SendButton onSend={handleSend}/>
    </div>
  </div>}
  </>
}

export default App;
