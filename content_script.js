// window.onload = function() {
//   // alert("success! it does load the content script");
//   // console.log("and properly logs to the window console");
// }

/**
 * Waits until the chat loads, then adds the current chat
 * to the array of chats to search through
 */
(async function () {
  const chatInput = await waitFor('div.border-b');
  // alert(document.documentElement.outerHTML);
  let currentChat = getCurrentChat();
  var all_chats = []
  all_chats.push(getCurrentChat());
  console.log(currentChat);
})();

/**
 * Waits for a certain element to appear on the page before allowing code to execute.
 * @param {string} selector - The CSS selector of the element to wait for.
 * @returns {Promise} - A promise that resolves when the element is found on the page.
 */
function waitFor(selector) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        resolve(element);
      }
    }, 100);
  });
}

/**
 * Retrieves the current chat messages from the webpage.
 * 
 * @function getCurrentChat
 * @returns {Object} An object containing the current chat information and messages.
 * @property {string} url - The URL of the current chat page.
 * @property {string} chat_id - The chat ID extracted from the URL.
 * @property {string} model - The GPT model used for the chat.
 * @property {Array} messages - An array of messages in the current chat.
 */
function getCurrentChat() {
  // Save content from one chat
  // Select all elements with the class names that contain the messages
  const messageElements = document.querySelectorAll(".prose"); // ".border-b, .prose"
  // TODO@someone later: might check whether this only provides assistant responses

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