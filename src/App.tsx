import Message from "./components/chat/Message";
import "./App.css";
import Input from './components/chat/Input'
import SendButton from './components/chat/SendButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "./redux/store";
import { updateInput,sendMessage } from './redux/slices/index'

function App() {
  const dispatch = useDispatch()
  const input = useSelector((state: RootState) => state.chat.input)
  const userName = useSelector((state: RootState) => state.chat.userName)
  
  const handleSend = () =>{
    dispatch(sendMessage({text:input,name:userName}));
    dispatch(updateInput(""));
  }

  return (
    <div className="max-w-[800px] border border-black mt-[30px] mx-[auto]">
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
    </div>
  );
}

export default App;
