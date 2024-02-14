import { useState, useEffect } from "react";
import Home from "./pages/home";
import Chat from "./pages/chat";

const App = () => {
  const [isLoading, setLoading] = useState("loading");
  useEffect(() => {
    const pw = localStorage.getItem("pw");
    if (pw) {
      setLoading("chat");
    } else {
      setLoading("home");
    }
  }, []);

  const handleHomeSubmit = () => {
    setLoading("chat");
  };
  return (
    <>
      {isLoading === "loading" ? (
        <div className="h-[92vh] w-100 flex items-center justify-center bg-black border-2 border-dashed flex flex-col">
          <p>Chat</p>
        </div>
      ) : isLoading === "home" ? (
        <Home onSubmit={handleHomeSubmit} />
      ) : isLoading === "chat" ? (
        <Chat />
      ) : null}
    </>
  );
};

export default App;
