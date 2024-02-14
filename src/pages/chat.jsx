import useWebSocket from "react-use-websocket";
import { AES, enc } from "crypto-js";
import key from "../api/key";

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
      if (parsedMessage.identifier) console.log(parsedMessage.message)
    },
  });

  const subscribeToChatChannel = async (pw) => {
    try {
      sendMessage(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatChannel",
            channel_id: AES.decrypt(pw, key.SECRET).toString(enc.Utf8),
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
        <p>Chat</p>
      </div>
    </>
  );
};

export default Chat;
