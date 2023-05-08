// sample code to get use the current tab
// // get the current tab
// browser.tabs.query({ currentWindow: true, active: true })
//   .then((tabs) => {
//     // the current tab is the first tab in the array of tabs
//     const currentTab = tabs[0];

//     // do something with the current tab
//     console.log(`Current tab URL: ${currentTab.url}`);
//   })
//   .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", function () {
  var rebuildBtn = document.getElementById("rebuild");

  rebuildBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      allChats.originalURL = currentTab.url.startsWith("https://chat.openai.com/c/") ? currentTab.url : null;
    });
  });

  async function generateIndex() {
    const allChats = await browser.tabs.executeScript({
      code: "generateSearchIndexContentScript"
    });

    browser.storage.local.set({ searchIndex: allChats });
  }
  rebuildBtn.addEventListener("click", generateIndex);
});

function searchHistory(searchTerm) {
  const re = new RegExp(`(${searchTerm})`, "gi");
  const results = [];

  // Code to search through the index and extract matches and context

  return results;
}

async function generateSearchIndexContentScript() {
    // const chatInput = await waitFor('div.border-b');
    // alert(document.documentElement.outerHTML);
    let currentChat = getCurrentChat();

    var allChats = [];



const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
const chatInput = await browser.tabs.executeScript(tab.id, { code: "document.querySelector('div.border-b')" });
console.log(chatInput);
return chatInput;

    // // I only promise we're searching through the most recent 20 chats, so overdelivering anyway
    // clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton(); // Open all chats, up to 20 + 3*20 = 80 (if you have over 80 chats...)

    // const currentUrl = await browser.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0].url);
    // allChats.originalURL = currentUrl.startsWith("https://chat.openai.com/c/") ? currentUrl : null;
    // if (allChats.originalURL == null) {
    //     window.location.href = "https://chat.openai.com/";
    // }
    // console.log(allChats.originalURL)

    // clickLinksAndSaveHistory();
    // // window.location.href = allChats.originalURL; // navigate back to original URL // TODO@me CAUTION: This will probably end up reloading the page, deleting any temporary javascript. see #line83todo
    // console.log(currentChat);

    // return allChats;
  }

document.getElementById("searchBtn").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchTerm").value;
  const results = searchHistory(searchTerm);
  // Code to display search results
  // TODO@me: the allChats array needs to be an array of objects, where each object contains the chat title. So we can display the search results with the search term

  const searchResultsEl = document.createElement("div");
  searchResultsEl.innerHTML = results.map(result => {
    return `<p><strong>${result.chatTitle}</strong></p>
                <p>${result.context}</p>
                <hr>`;
  }).join("");

  document.getElementById("search-results").appendChild(searchResultsEl);

});

browser.runtime.onMessage.addListener(async (message) => {
  if (message === "generateIndex") {
    const searchIndex = await generateSearchIndexContentScript();
    browser.runtime.sendMessage({ type: "indexGenerated", data: searchIndex });
  }
});

////////////////////////////////////////////////////////////

/**
 * Waits until the chat loads, then adds the current chat
 * to the array of chats to search through
 */
// (async function () {
//   const chatInput = await waitFor('div.border-b');
//   // alert(document.documentElement.outerHTML);
//   let currentChat = getCurrentChat();

//   var allChats = []

//   // I only promise we're searching through the most recent 20 chats, so overdelivering anyway
//   clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton(); // Open all chats, up to 20 + 3*20 = 80 (if you have over 80 chats...)

//   allChats.originalURL = window.location.href;
//   clickLinksAndSaveHistory();
//   // window.location.href = allChats.originalURL; // navigate back to original URL // TODO@me CAUTION: This will probably end up reloading the page, deleting any temporary javascript. see #line83todo
//   console.log(currentChat);
// })();
async function generateSearchIndexContentScript() {
  const chatInput = await waitFor('div.border-b');
  // alert(document.documentElement.outerHTML);
  // let currentChat = getCurrentChat();

  // The description only promises we're searching through the most recent 20 chats, so overdelivering anyway
  clickShowMoreButton(); clickShowMoreButton(); clickShowMoreButton(); // Open all chats, up to 20 + 3*20 = 80 (if you have over 80 chats...)

  const currentUrl = await browser.tabs.query({ active: true, currentWindow: true }).then(tabs => tabs[0].url);
  allChats.originalURL = currentUrl.startsWith("https://chat.openai.com/c/") ? currentUrl : null;
  console.log(allChats.originalURL)

  clickLinksAndSaveHistory();
  // window.location.href = allChats.originalURL; // navigate back to original URL // TODO@me CAUTION: This will probably end up reloading the page, deleting any temporary javascript. see #line83todo
  // console.log(currentChat);

  return allChats;
}

// console.log(allChats);