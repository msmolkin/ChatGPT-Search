// window.onload = function() {
//   alert("success! it does load the content script");
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

  var allChats = []
  allChats.push(getCurrentChat());

  clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton();
  alert("clicked show more button");
  clickLinks();
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
 * Clicks on the "Show more" button to display additional conversations.
 * Allows you search through up to the most recent 40 conversations.
 */
function clickShowMoreButton() {
  const buttons = document.querySelectorAll('.btn');
  let showMoreButton = null;

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent.trim() === 'Show more') {
      showMoreButton = buttons[i];
      break;
    }
  }

  if (showMoreButton) {
    showMoreButton.click();
  }
}

/**
 * Clicks on each link in the chatLinks array with a delay of 2 seconds
 * So you can save the history of each chat
 * Eventually change it so it waitsFor
 * each chat to load and get saved, and then clicks on the next link after the Promise is resolved
 * @function clickLinks
 * @returns {void}
 */
function clickLinks() {
  // not(.underline) removes "/en/articles/6825453-chatgpt-release-notes"
  const chatLinks = document.querySelectorAll(".flex a:not(.underline)");
  let i = 1; // Start at index 1 to skip the "New Chat" button
  const interval = setInterval(() => {
    if (i >= chatLinks.length) {
      clearInterval(interval);
      return;
    }
    // console.log(chatLinks[i]);
    chatLinks[i].click();
    i++;
  }, 1500); // 1.5 second delay
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