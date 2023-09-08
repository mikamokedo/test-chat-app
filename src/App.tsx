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
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PAGE_SIZE } from "./lib/const";
import { useKeyPress } from "./lib/useKeyPress";

const delay = () => new Promise((res) => setTimeout(res, 1000));

function App() {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.chat.userName);
  const storesMessages = useSelector((state: RootState) => state.chat.messages);

  const lassMessage = useRef<HTMLDivElement>(null);
  const chatInner = useRef<HTMLDivElement>(null);

  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showToBottom, setShowToBottom] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  const handleSend = useCallback(() => {
    if (!input) {
      return;
    }
    dispatch(sendMessage({ text: input, name: userName, id: uuidv4() }));
    setInput("");
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [dispatch, input, userName]);

  const handleJoinRoom = (name: string) => {
    if (!name) {
      alert("Please input username first");
      return;
    }
    dispatch(updateUserName(name));
    setIsJoinRoom(true);
  };

  const scrollToBottom = () => {
    if (lassMessage.current) {
      lassMessage.current.scrollIntoView();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const oldMessages = window.localStorage.getItem("messages");
      if (!oldMessages) {
        return;
      }
      const parseMess = JSON.parse(oldMessages);
      if (
        parseMess &&
        currentMessages.length &&
        parseMess[parseMess.length - 1]?.id !==
          currentMessages[currentMessages.length - 1]?.id
      ) {
        const startIndex = parseMess.length - page * PAGE_SIZE;
        dispatch(restoreMessage(parseMess))
        setCurrentMessages(() => {
          return parseMess.slice( Math.max(startIndex, 0));
        });
        if (!chatInner.current) {
          return;
        }
        if (
          chatInner.current.scrollHeight - chatInner.current?.scrollTop <
          chatInner.current?.clientHeight + 300
        ) {
          setTimeout(() => {
            scrollToBottom();
          }, 200);
        }
      }
    }, 200);
    return () => clearInterval(timer);
  }, [dispatch, storesMessages, page, currentMessages]);

  useEffect(() => {
    const oldMessages = window.localStorage.getItem("messages");
    if (oldMessages) {
      const parseMess = JSON.parse(oldMessages);
      dispatch(restoreMessage(parseMess));
    }
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [isJoinRoom]);

  useEffect(() => {
    const handleScroll = async () => {
      setIsLoading(true);
      await delay();
      setIsLoading(false);
    };

    if (chatInner.current) {
      chatInner.current.addEventListener("scroll", (e) => {
        if (!chatInner.current) {
          return;
        }

        if (chatInner.current?.scrollTop < 50) {
          handleScroll();
        }
        if (
          chatInner.current.scrollHeight - chatInner.current?.scrollTop >
          chatInner.current?.clientHeight + 300
        ) {
          setShowToBottom(true);
        } else {
          setShowToBottom(false);
        }
      });
    }

    return () => {
      if (chatInner.current) {
        chatInner.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isJoinRoom, page, isLoading, storesMessages]);

  useEffect(() => {
    if (isLoading && storesMessages.length / PAGE_SIZE > page) {
      setPage((state) => state + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    const startIndex = storesMessages.length - page * PAGE_SIZE;
    console.log(startIndex)
    setCurrentMessages((state) => {
      return storesMessages.slice( Math.max(startIndex, 0))
    });
  }, [page, storesMessages]);

  const pressed = useKeyPress("Enter");
  useEffect(() => {
    if (pressed && isJoinRoom) {
      handleSend();
    }
  }, [pressed, isJoinRoom, handleSend]);

  return (
    <>
      {!isJoinRoom ? (
        <JoinRoomModal handleSend={handleJoinRoom} />
      ) : (
        <div className="max-w-[800px] border border-black mt-[30px] mx-[auto] relative">
          {isLoading && (
            <div className="w-full text-sm text-center absolute top-[0px] left-[0] cursor-pointer bg-gray-100 py-2 z-10">
              Get more message
            </div>
          )}
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
            <Input value={input} onChange={setInput} />
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
