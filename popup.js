function generateIndex() {
    // Code to generate search index

}
async function generateIndex() {
    const searchIndex = await browser.tabs.executeScript({ file: "content_script.js" });
    browser.storage.local.set({ searchIndex });
}
document.getElementById("rebuild").addEventListener("click", generateIndex);

function searchHistory(searchTerm) {
    const re = new RegExp(`(${searchTerm})`, "gi");
    const results = [];

    // Code to search through the index and extract matches and context

    return results;
}


document.getElementById("search").addEventListener("click", function () {
    const searchTerm = document.getElementById("search-input").value;
    const results = searchHistory(searchTerm);
    // Code to display search results
    // TODO@me: the allChats array needs to be an array of objects, where each object contains the chat title. So we can display the search results with the search term

    document.getElementById("search").addEventListener("click", function () {
        const searchTerm = document.getElementById("search-input").value;
        const results = searchHistory(searchTerm);

        const searchResultsEl = document.createElement("div");
        searchResultsEl.innerHTML = results.map(result => {
            return `<p><strong>${result.chatTitle}</strong></p>
                  <p>${result.context}</p>
                  <hr>`;
        }).join("");

        document.getElementById("search-results").appendChild(searchResultsEl);
    });

});

browser.runtime.onMessage.addListener(async (message) => {
    if (message === "generateIndex") {
        const searchIndex = await generateSearchIndex();
        browser.runtime.sendMessage({ type: "indexGenerated", data: searchIndex });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var checkTabBtn = document.getElementById("check-tab-btn");
  
    checkTabBtn.addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        if (currentTab.url.startsWith("https://chat.openai.com/c/")) {
          console.log("Tab is open to https://chat.openai.com/c/");
        } else {
          console.log("Tab is not open to https://chat.openai.com/c/");
        }
      });
    });
  });
  