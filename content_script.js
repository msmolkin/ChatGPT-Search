// Author: Michael Smolkin
// Date: 2023-05-08
// License: MIT

// /**
//  * Waits until the chat loads, then adds the current chat
//  * to the array of chats to search through
//  */
// // (async function () {
// //   const chatInput = await waitFor('div.border-b');
// //   // alert(document.documentElement.outerHTML);
// //   let currentChat = getCurrentChat();

// //   var allChats = []

// //   // I only promise we're searching through the most recent 20 chats, so overdelivering anyway
// //   clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton(); // Open all chats, up to 20 + 3*20 = 80 (if you have over 80 chats...)

// //   allChats.originalURL = window.location.href;
// //   clickLinksAndSaveHistory();
// //   // window.location.href = allChats.originalURL; // navigate back to original URL // TODO@me CAUTION: This will probably end up reloading the page, deleting any temporary javascript. see #line83todo
// //   console.log(currentChat);
// // })();
// async function generateSearchIndexContentScript() {
//   const chatInput = await waitFor('div.border-b');
//   // alert(document.documentElement.outerHTML);
//   // let currentChat = getCurrentChat();

//   var allChats = [];

//   // I only promise we're searching through the most recent 20 chats, so overdelivering anyway
//   clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton(); // Open all chats, up to 20 + 3*20 = 80 (if you have over 80 chats...)

//   const currentUrl = await browser.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0].url);
//   allChats.originalURL = currentUrl.startsWith("https://chat.openai.com/c/") ? currentUrl : null;
//   console.log(allChats.originalURL)

//   clickLinksAndSaveHistory();
//   // window.location.href = allChats.originalURL; // navigate back to original URL // TODO@me CAUTION: This will probably end up reloading the page, deleting any temporary javascript. see #line83todo
//   // console.log(currentChat);

//   return allChats;
// }

// browser.runtime.onMessage.addListener(async (message) => {
//   if (message === "generateIndex") {
//     const searchIndex = await generateSearchIndexContentScript();
//     browser.runtime.sendMessage({ type: "indexGenerated", data: searchIndex });
//   }
// });

// /**
//  * Waits for a certain element to appear on the page before allowing code to execute.
//  * @param {string} selector - The CSS selector of the element to wait for.
//  * @returns {Promise} - A promise that resolves when the element is found on the page.
//  */
// function waitFor(selector) {
//   return new Promise((resolve) => {
//     const intervalId = setInterval(() => {
//       const element = document.querySelector(selector);
//       if (element) {
//         clearInterval(intervalId);
//         resolve(element);
//       }
//     }, 100);
//   });
// }

// /**
//  * Clicks on the "Show more" button to display additional conversations.
//  * Allows you search through up to the most recent 40 conversations.
//  */
// function clickShowMoreButton() {
//   alert("clicked show more button"); // TODO@me replace alert with console.log
//   const buttons = document.querySelectorAll('.btn');
//   let showMoreButton = null;

//   for (let i = 0; i < buttons.length; i++) {
//     if (buttons[i].textContent.trim() === 'Show more') {
//       showMoreButton = buttons[i];
//       break;
//     }
//   }

//   if (showMoreButton) {
//     showMoreButton.click();
//   }
// }

// /**
//  * Clicks on each link in the chatLinks array with a delay of 2 seconds
//  * So you can save the history of each chat and generate the index
//  * Eventually change it so it waitsFor each chat to load and get saved
//  * and then clicks on the next link after the Promise is resolved
//  * @function clickLinks
//  * @returns {void}
//  */
// function clickLinksAndSaveHistory() {
//   // not(.underline) removes "/en/articles/6825453-chatgpt-release-notes"
//   const chatLinks = document.querySelectorAll(".flex a:not(.underline):not([href])");
//   let i = 1; // Start at index 1 to skip the "New Chat" button
//   const interval = setInterval(() => {
//     if (i >= chatLinks.length) {
//       clearInterval(interval);
//       return;
//     }
//     // console.log(chatLinks[i]);
//     chatLinks[i].click();

//     // Push the current chat to the array
//     allChats.push(getCurrentChat());
//     i++;
//   }, 2000); // 2 second delay
// }

// /***
// When updating the above function, I might use this
// async function clickLinksAndSaveHistory() {
//   // not(.underline) removes "/en/articles/6825453-chatgpt-release-notes"
//   const chatLinks = document.querySelectorAll(".flex a:not(.underline)");
//   let i = 1; // Start at index 1 to skip the "New Chat" button
//   const delay = 1500; // 1.5 second delay

//   for (i; i < chatLinks.length; i++) {
//     await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the delay before moving on to the next chat

//     chatLinks[i].click(); // Click on the chat link
//     await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the chat to load

//     allChats.push(await getCurrentChat()); // Push the current chat to the array
//   }
// }
//  */


// /**
//  * Retrieves the current chat messages from the webpage.
//  * 
//  * @function getCurrentChat
//  * @returns {Object} An object containing the current chat information and messages.
//  * @property {string} url - The URL of the current chat page.
//  * @property {string} chat_id - The chat ID extracted from the URL.
//  * @property {string} model - The GPT model used for the chat.
//  * @property {Array} messages - An array of messages in the current chat.
//  * @property {string} name - The name of the chat.
//  */
// function getCurrentChat() {
//   // Save content from one chat
//   // Select all elements with the class names that contain the messages
//   const messageElements = document.querySelectorAll(".prose"); // ".border-b, .prose"
//   // TODO@someone later: might check whether this only provides assistant responses
//   // but this might not be important, as user prompts are generally repeated in responses

//   // Initialize the chat object
//   var currentChat = {};
//   currentChat.url = window.location.href;
//   currentChat.chat_id = currentChat.url.substring(currentChat.url.indexOf("c/")).substring(2);
//   currentChat.name = document.title;

//   let paid = document.body.innerHTML.match(/Model: (Default|GPT-4|Legacy)( \(?GPT-3.5\)?)?/g);
//   currentChat.model = paid ? paid[0] : "Model: Free (Legacy GPT-3.5)";

//   // Initialize an empty array to store the messages
//   currentChat.messages = [];

//   // Loop through the elements containing chat messages and extract their text content
//   messageElements.forEach(element => {
//     const message = element.textContent.trim();
//     if (message !== '') {
//       currentChat.messages.push(message);
//     }
//   });

//   return currentChat;
// }

/**
 * Notifies the user whether GPT is still generating a response.
 */
var checkWhetherGptTyping = function () {

    const buttons = document.querySelectorAll("button.btn-neutral");
    let gptGeneratingButton;    // should be const
    if (buttons && buttons.length > 0) {
        for (let button of buttons) {
            if (button.innerText === 'Stop generating' || button.innerText === 'Regenerate response') {
                gptGeneratingButton = button;
                break;
            }
        }
    }

    const isGenerating = gptGeneratingButton && gptGeneratingButton.getAttribute('playing') === 'true';
    let counter = 0; let showCounter = false;    // Counter to count how long it takes to generate a response
    
    if (gptGeneratingButton) {
        if (!isGenerating && gptGeneratingButton.innerText === 'Stop generating') {
            // This is the case where the user has clicked "Regenerate response" and the response is being generated
            gptGeneratingButton.setAttribute('playing', 'true');
            counter++; showCounter = true;
        } else if (!isGenerating && gptGeneratingButton.innerText === 'Regenerate response') { // TODO: why does this work?
            // This is the case where the user has clicked "Stop generating" or the response has been generated
            gptGeneratingButton.setAttribute('playing', 'false');

            // I can inject the time that it took to generate a response into the page here.
            if (showCounter){
                console.log(`Response time: ${counter} seconds`);
                counter = 0;
                showCounter = false;
            }
        }   // Todo: add a case for when the user gave too much text input and we have an error (the page must be refreshed)


        // Send a message to the background script
        browser.runtime.sendMessage({ type: "updateGeneratingState", data: gptGeneratingButton.getAttribute('playing') === 'true' });
        console.log("Is playing: " + gptGeneratingButton.getAttribute('playing'));
} else {
        console.log('Could not find the button element for whether GPT is currently generating content (maybe you\'ve opened a new chat).');
    }

}

// Possibly todo later:
// if the user is in another tab, alert the user when GPT has finished typing
// this will only run if the user checks the box in the options page (requires adding the option to the options page, checked by default)

// Call updateNotification function every 500ms
setInterval(checkWhetherGptTyping, 1000);