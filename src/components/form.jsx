import { useState, useEffect } from "react";
import axios from "axios";
import key from "../api/key";
import { AES } from "crypto-js";
const Form = () => {
  const [message, setMessage] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;
    const pw = localStorage.getItem("pw");
    const m = AES.encrypt(message, key.SECRET).toString();
    const username = AES.encrypt(
      localStorage.getItem("uid"),
      key.SECRET
    ).toString();
    try {
      await axios.post(`http://${key.API_URL}/send_message`, {
        username,
        channel_id: pw,
        message: m,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  const presentUser = () => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userName) return;
    try {
      localStorage.setItem("uid", userName);
      setUserName("");
      presentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDownUser = (e) => {
    if (e.key === "Enter") {
      handleSaveUser(e);
    }
  };

  useEffect(() => {
    presentUser();
  }, []);

  return (
    <>
      {isUser ? (
        <>
          <input
            placeholder="Message..."
            type="text"
            name="message"
            autoComplete="off"
            value={message}
            maxLength={200}
            className="w-full m-4 ml-8 mr-8 bg-transparent outline-none border-b-2 border-dashed"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            id="sendButton"
            className={`m-2 mr-4 ${!message ? "cursor-default" : null}`}
            disabled={!message}
            onClick={handleSend}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 664 663"
            >
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Set Username..."
            type="text"
            name="message"
            autoComplete="off"
            maxLength={10}
            value={userName}
            className="w-full m-4 ml-8 mr-8 bg-transparent outline-none border-b-2 border-dashed"
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDownUser}
          />
          <button
            type="submit"
            id="sendButton"
            className={`m-2 mr-4 ${!userName ? "cursor-default" : null}`}
            disabled={!userName}
            onClick={handleSaveUser}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 664 663"
            >
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </>
      )}
    </>
  );
};

export default Form;
