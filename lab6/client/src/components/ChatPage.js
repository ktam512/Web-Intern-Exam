import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState(() => {
    // Initialize with messages from local storage if available
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(() => {
     // Emit newUser event if a user is stored in localStorage
     const userName = localStorage.getItem("userName");
     if (userName) {
       socket.emit("newUser", { userName, socketID: socket.id });
     } else {
      // If no username is found, redirect to the login page
      window.location.href = "/";
    }
    // Receive the history of messages when the user connects
    socket.on("historyResponse", history => {
      setMessages(history);
      // Save history to localStorage for persistence
      localStorage.setItem("chatMessages", JSON.stringify(history));
    });

    socket.on("messageResponse", data => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, data];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });
    // Receive typing status updates
    socket.on("typingResponse", data => setTypingStatus(data));

    // Scroll to the bottom when messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Detect when the server disconnects
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // Clear localStorage if the server disconnects
        localStorage.clear();
        alert("Server disconnected. Chat history and active user list have been cleared.");
      }
    });

    // Detect when the connection fails
    socket.on("connect_error", () => {
      localStorage.clear();
      alert("Server connection failed. Chat history and active user list have been cleared.");
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("historyResponse");
      socket.off("messageResponse");
      socket.off("typingResponse");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [socket]);


  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  )
}

export default ChatPage