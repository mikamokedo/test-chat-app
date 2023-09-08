import Message from "./components/chat/Message";
import "./App.css";
import Input from "./components/chat/Input";
import SendButton from "./components/chat/SendButton";
import JoinRoomModal from "./components/chat/JoinRoom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import {
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
  const [input,setInput] = useState("");
  const userName = useSelector((state: RootState) => state.chat.userName);
  const storesMessages = useSelector((state: RootState) => state.chat.messages);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showToBottom, setShowToBottom] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  const handleSend = () => {
    if (!input) {
      return;
    }
    dispatch(sendMessage({ text: input, name: userName, id: uuidv4() }));
   setInput("");
    setTimeout(() => {
      if (lassMessage.current) {
        lassMessage.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 300);
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
      const parseMess = JSON.parse(oldMessages ?? "");
      if (parseMess) {
          const startIndex = parseMess.length - page * PAGE_SIZE;
          setCurrentMessages(() => {
            return parseMess.slice(Math.max(startIndex, 0));
          });
      }
    }, 200);
    return () => clearInterval(timer);
  }, [dispatch,storesMessages,page]);

  useEffect(() => {
    const oldMessages = window.localStorage.getItem("messages");
    const parseMess = JSON.parse(oldMessages ?? "");
    if (parseMess) {
      const startIndex = parseMess.length - page * PAGE_SIZE;
        dispatch(restoreMessage(parseMess));
        setCurrentMessages((state) => {
          return parseMess.slice(
            Math.max(startIndex, 0),
            startIndex + PAGE_SIZE
          );
        });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [isJoinRoom]);

  useEffect(() => {
    const handleScroll = async () => {
      if (storesMessages.length / PAGE_SIZE > page && !isLoading) {
        setIsLoading(true);
        await delay();
        setIsLoading(false);
      }
    };
    if (chatInner.current) {
      chatInner.current.addEventListener("scroll", (e) => {
        if(!chatInner.current){
          return;
        }
        if (chatInner.current?.scrollTop === 0) {
          handleScroll();
        }
        if(chatInner.current.scrollHeight - chatInner.current?.scrollTop > chatInner.current?.clientHeight + 400){
          setShowToBottom(true);
        }else{
          setShowToBottom(false);
        }
      });
    }
    return () => {
      if (chatInner.current) {
        chatInner.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isJoinRoom, page, isLoading,storesMessages]);

  useEffect(() => {
    if (isLoading) {
        setPage((state) => state + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    const startIndex = storesMessages.length - page * PAGE_SIZE;
    setCurrentMessages((state) => {
      return storesMessages.slice(Math.max(startIndex, 0));
    });
  }, [page]);

  const pressed = useKeyPress("Enter");
  useEffect(() => {
    if (pressed && isJoinRoom) {
      handleSend();
    }
  }, [pressed,isJoinRoom]);

  const scrollToBottom = () => {
    if (lassMessage.current) {
      lassMessage.current.scrollIntoView();
    }
  };
  
  return (
    <>
      {!isJoinRoom ? (
        <JoinRoomModal handleSend={handleJoinRoom} />
      ) : (
        <div className="max-w-[800px] border border-black mt-[30px] mx-[auto] relative">
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
              onChange={setInput}
            />
            <SendButton onSend={handleSend} />
          </div>
          {showToBottom && (
            <div
              className="rounded-[10px] border border-indigo-300 w-[80px] text-sm text-center absolute bottom-[90px] left-[50%] cursor-pointer"
              onClick={scrollToBottom}
            >
              Bottom
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
