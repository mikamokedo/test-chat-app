import Message from "./components/chat/Message";
import "./App.css";
import Input from './components/chat/Input'

function App() {
  return (
    <div className="max-w-[800px] border border-black mt-[30px] mx-[auto]">
      <div className=" flex flex-col gap-[10px] p-[20px]">
      <Message
        textContent="just a messagee from sender ust a messagee from sender ust a messagee from sender just a messagee from sender ust a messagee from sender ust a messagee from sender"
        name="Q"
        isSender={true}
      />
      <Message textContent="just a messagee" name="phu123" isSender={false} />
      </div>
      <Input value="" onChange={() => null}/>
    </div>
  );
}

export default App;
