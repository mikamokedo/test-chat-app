import Message from "./components/chat/Message";
import "./App.css";
import Input from "./components/chat/Input";
import SendButton from "./components/chat/SendButton";
import JoinRoomModal from "./components/chat/JoinRoom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import {
  updateInput,
  sendMessage,
  updateUserName,
  restoreMessage,
  IMessage,
} from "./redux/slices/index";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PAGE_SIZE } from "./lib/const";
import { useKeyPress } from "./lib/useKeyPress";

const delay = () => new Promise((res) => setTimeout(res, 1000));

function App() {
  const lassMessage = useRef<HTMLDivElement>(null);
  const chatInner = useRef<HTMLDivElement>(null);
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state.chat.input);
  const userName = useSelector((state: RootState) => state.chat.userName);
  const storesMessages = useSelector((state: RootState) => state.chat.messages);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  const handleSend = () => {
    if(!input){
      return;
    }
    dispatch(sendMessage({ text: input, name: userName, id: uuidv4() }));
    dispatch(updateInput(""));
    setTimeout(() => {
      if (lassMessage.current) {
        lassMessage.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 200);
  };
  const handleJoinRoom = (name: string) => {
    if (!name) {
      alert("Please input username first");
      return;
    }
    dispatch(updateUserName(name));
    setIsJoinRoom(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const oldMessages = window.localStorage.getItem("messages");
      if (oldMessages) {
        const parseMess = JSON.parse(oldMessages);
        const startIndex = parseMess.length - page * PAGE_SIZE;
        setCurrentMessages(() => {
          return parseMess.slice(Math.max(startIndex, 0));
        });
      }
    }, 200);
    return () => clearInterval(timer);
  }, [dispatch, currentMessages]);

  useEffect(() => {
    const oldMessages = window.localStorage.getItem("messages");
    if (oldMessages) {
      const parseMess = JSON.parse(oldMessages);
      const startIndex = parseMess.length - page * PAGE_SIZE;
      if (Array.isArray(parseMess)) {
        dispatch(restoreMessage(parseMess));
        setCurrentMessages((state) => {
          return parseMess.slice(
            Math.max(startIndex, 0),
            startIndex + PAGE_SIZE
          );
        });
      }
    }
  }, []);

  useEffect(() => {
    if (lassMessage.current) {
      lassMessage.current.scrollIntoView();
    }
  }, [isJoinRoom]);

  useEffect(() => {
    const handleScroll = async () => {
      if (Math.ceil(storesMessages.length / PAGE_SIZE) > page && !isLoading) {
        setIsLoading(true);
        await delay();
        setIsLoading(false);
      }
    };

    if (chatInner.current) {
      chatInner.current.addEventListener("scroll", (e) => {
        if (chatInner.current?.scrollTop === 0) {
          handleScroll();
        }
      });
    }
    return () => {
      if (chatInner.current) {
        chatInner.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isJoinRoom, page, isLoading]);

  useEffect(() => {
    if (isLoading) {
      if (Math.ceil(storesMessages.length / PAGE_SIZE) > page) {
        setPage((state) => state + 1);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const startIndex = storesMessages.length - page * PAGE_SIZE;
    setCurrentMessages((state) => {
      const newMess = storesMessages.slice(
        Math.max(startIndex, 0),
        startIndex + PAGE_SIZE
      );
      return [...newMess, ...state];
    });
  }, [page]);


  const pressed = useKeyPress('Enter');
  useEffect(() =>{
    if(pressed && isJoinRoom){
      handleSend()
    }
  },[pressed])

  return (
    <>
      {!isJoinRoom ? (
        <JoinRoomModal handleSend={handleJoinRoom} />
      ) : (
        <div className="max-w-[800px] border border-black mt-[30px] mx-[auto]">
          <div
            className=" flex flex-col gap-[10px] p-[20px]  max-h-[500px] overflow-y-scroll min-h-[500px]"
            ref={chatInner}
          >
            {currentMessages.map((mess) => (
              <Message
                textContent={mess.text}
                name={mess.name === userName ? "you" : mess.name}
                isSender={mess.name === userName}
                key={mess.id}
              />
            ))}
            <div ref={lassMessage} className="opacity-0" />
          </div>
          <div className="flex bg-indigo-500 p-[20px]">
            <Input
              value={input}
              onChange={(value) => dispatch(updateInput(value))}
            />
            <SendButton onSend={handleSend} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
