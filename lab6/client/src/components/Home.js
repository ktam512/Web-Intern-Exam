import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const savedUserName = localStorage.getItem("userName");
        if (savedUserName) {
            setUserName(savedUserName);
            navigate("/chat");  // Automatically navigate if a user is already stored
        }
    }, [navigate]);  // Add 'navigate' to the dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            localStorage.setItem("userName", userName);
            socket.emit("newUser", { userName, socketID: socket.id });
            navigate("/chat");
        }
    };

    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                minLength={3} 
                name="username" 
                id='username'
                className='username__input' 
                value={userName} 
                onChange={e => setUserName(e.target.value)}
                required
            />
            <button className='home__cta'>SIGN IN</button>
        </form>
    );
};

export default Home;
