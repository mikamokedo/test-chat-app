import React from "react";
import { getFirstChar } from "../../lib/chat";

interface MessagePros {
  textContent: string;
  name: string;
  isSender: boolean;
}
const Message: React.FC<MessagePros> = ({ textContent, name, isSender }) => {
  return (
    <div className={`${isSender ? "self-end" : "self-start"} flex`}>
      <div
        className={`w-[30px] h-[30px] rounded-[50%] flex-shrink-0 flex justify-center items-center ${
          isSender ? "bg-gray-300 ml-[10px] order-1" : "bg-indigo-300 mr-[10px]"
        }`}
      >
        {getFirstChar(name)}
      </div>
      <div
        className={`text-sm mt-[10px] rounded-[4px] p-[10px] relative max-w-[500px] ${
          isSender
            ? "bg-gray-300 tri-right-right"
            : "bg-indigo-300 tri-right-left"
        }`}
      >
        {textContent}
      </div>
    </div>
  );
};

export default Message;
