import useWebSocket from "react-use-websocket";
import { AES, enc } from "crypto-js";
import key from "../api/key";
import Header from "../components/header";
import Form from "../components/form";

const Chat = () => {
  const { sendMessage } = useWebSocket(`ws://${key.API_URL}/cable`, {
    onOpen: () => {
      const pw = localStorage.getItem("pw");
      if (pw) {
        subscribeToChatChannel(pw);
      }
    },
    onMessage: (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.identifier && parsedMessage.message) {
        const temp = JSON.parse(localStorage.getItem("messages")) || [];
        const temp2 = { ...parsedMessage.message };
        temp2.message = AES.decrypt(temp2.message, key.SECRET).toString(
          enc.Utf8
        );
        temp2.username = AES.decrypt(temp2.username, key.SECRET).toString(
          enc.Utf8
        );
        temp.push(temp2);
        localStorage.setItem("messages", JSON.stringify(temp));
      }
    },
  });

  const subscribeToChatChannel = async (pw) => {
    try {
      sendMessage(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatChannel",
            channel_id: pw,
          }),
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="h-[92vh] w-100 flex items-center justify-center bg-black border-2 border-dashed flex flex-col text-white">
        <div className="h-16 flex w-full flex justify-between border-b-2 border-dashed">
          <Header />
        </div>
        <div className="h-[100%]">Chat</div>
        <div className="h-20 w-full flex justify-between border-t-2 border-dashed">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Chat;
