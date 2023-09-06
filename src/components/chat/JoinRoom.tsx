import React, { useEffect, useState } from "react";
import Input from "./Input";
import SendButton from "./SendButton";
import { useKeyPress } from "../../lib/useKeyPress";

interface JoinRoomModalProps {
    handleSend: (value:string) => void;
}
const JoinRoomModal: React.FC<JoinRoomModalProps> = ({handleSend}) => {
  const [value, setValue] = useState("");
  const pressed = useKeyPress('Enter');
  useEffect(() =>{
    if(pressed){
      handleSend(value)
    }
  },[pressed])
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Please input user to join chat room
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="flex bg-indigo-500 p-[20px]">
                <Input value={value} onChange={(e) => setValue(e)} />
                <SendButton onSend={() => handleSend(value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default JoinRoomModal;
