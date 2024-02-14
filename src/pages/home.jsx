import { useState } from "react";
import { AES } from "crypto-js";
import ThreeLogo from "../components/threeLogo";
import key from "../api/key";

function Home() {
  const [password, setPassword] = useState("");

  const handleEnter = (e) => {
    e.preventDefault();
    if (!password) return;
    console.log(key.API_URL);
    try {
      const temp = AES.encrypt(password, key.SECRET).toString();
      localStorage.setItem("pw", temp);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        id="chatbox"
        className="h-[92vh] w-100 flex items-center justify-center bg-black border-2 border-dashed flex flex-col"
      >
        <ThreeLogo />
        <h1 id="label" className="font-semibold mb-2 ml-2">
          CHANNEL PASSWORD:
        </h1>
        <form onSubmit={handleEnter}>
          <div className="input-container">
            <input
              type="text"
              name="password"
              className="input"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="top-line" />
            <div className="under-line" />
          </div>
          <br></br>
          <button type="submit" id="enter">
            ENTER
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
