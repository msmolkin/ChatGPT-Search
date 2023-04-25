function getCurrentChat() {
  // Save content from one chat
  // Select all elements with the class names that contain the messages
  const messageElements = document.querySelectorAll(".prose"); // ".border-b, .prose"
  // Later: might need to check whether this only provides assistant responses

  // Initialize the chat object
  var currentChat = {};
  currentChat.url = window.location.href;
  currentChat.chat_id = currentChat.url.substring(currentChat.url.indexOf("c/")).substring(2);
  let paid = document.body.innerHTML.match(/Model: (Default|GPT-4|Legacy)( \(?GPT-3.5\)?)?/g);
  currentChat.model = paid ? paid[0] : "Model: Free (Legacy GPT-3.5)";

  // Initialize an empty array to store the messages
  currentChat.messages = [];

  // Loop through the selected elements and extract their text content
  messageElements.forEach(element => {
    const message = element.textContent.trim();
    if (message !== '') {
      currentChat.messages.push(message);
    }
  });

  // console.log(currentChat.messages);
  // // Expected output: ["User: `test prompt`", "Assistant: `example response`"]

  return currentChat;
}

all_chats = []
all_chats.push(getCurrentChat());