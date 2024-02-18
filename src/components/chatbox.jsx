const ChatBox = () => {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const user = localStorage.getItem("uid");
  console.log(messages);
  return (
    <>
      <div className="mt-8 text-sm text-gray-600 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to Chatty</h1>
        <div className="mb-4">
          <p>
            This is the start of your chat. Feel free to start typing your
            messages below:
          </p>
        </div>
        <p className="mb-4">
          Disclaimer: This chat application does not store messages on any
          database. All message history is saved locally on the user&apos;s
          device/browser. We do not have access to or control over the messages
          exchanged between users. The content of messages sent by users does
          not represent my opinion or views. This chat application is solely
          intended to showcase my technical skills and is not to be used for
          sensitive or confidential communications.
        </p>
        <p className="mb-4">Messages are limited to 300 characters.</p>
        <hr className="border-gray-600 border-dashed " />
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            user === message.username
              ? "justify-end px-4 pl-6 text-right"
              : "px-4 pr-6 text-left"
          } w-full my-4 h-fit`}
        >
          <div className="flex flex-col">
            <p className="mb-2">{message.username}</p>
            <p className="border-white border-dashed border-2 px-4 py-3 max-w-full break-all">
              {message.message}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatBox;
