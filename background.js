// Author: Michael Smolkin
// Date: 2023-05-08
// License: MIT

window.onload = function () {
    console.log("background works, but it loads on its own separate page (Inspect add-on to see console.logs).");
    // unnecessary file. can delete this file and remove it from manifest.json
    // once the extension is working. just helpful to see in about:debugging#/runtime/this-firefox:
    // either "Background script: Running" or "Background script: Stopped"
}

// Listen for messages from content scripts

/**
 * @param {Object} message
 * @param {Object} sender
 * @param {Function} sendResponse
 * @returns {Promise<void>}
 * 
 * Badge the app icon with "typing…" when ChatGPT is generating a response.
 */
browser.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "updateGeneratingState") {
        console.log("Message received from content script:", message.data);

        if (Boolean(message.data)) {
            badgeText = "typing…"
         } else {
            badgeText = "";
            console.log("badgeText: ", badgeText)
         }
        browser.browserAction.setBadgeText({ text: badgeText });
        browser.browserAction.setBadgeBackgroundColor({ color: "#00FF00" });
    }
});