document.addEventListener("DOMContentLoaded", function () {
    var rebuildBtn = document.getElementById("rebuild");

    var allChats = [];
  
    rebuildBtn.addEventListener("click", generateIndex);
});

async function generateIndex() {
}

async function generateIndex () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      allChats.originalURL = currentTab.url.startsWith("https://chat.openai.com/c/") ? currentTab.url : null;
    });

    allChats = await browser.tabs.executeScript({
      code: "generateSearchIndexContentScript"
    });

    browser.storage.local.set({ searchIndex: allChats });
}

rebuildBtn.addEventListener("click", );
