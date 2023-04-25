Next steps:
2. Compile list of messages for each of the other chat sessions as well
3. Then search through all the messages inside the all_chats
4. Publish to store

---

Manifest.json things that I might need to edit:
1. add when I make an icon
```
"icons": {
  "48": "icons/icon48.png",
  "96": "icons/icon96.png"
}
```
2. prune permissions. I don't think all of these are necessary
`"permissions": ["tabs", "storage", "activeTab", "https://chat.openai.com/"],`
I added tabs/storage originally assuming I'd open all the chats in background tabs and save them to a clipboard-like file. Might be smarter to open the chats in iframes or something like that.

---

Might change in description or a README.md file:
"Important, this only searches the current thread in each chat. If you modified a prompt, the search will only search the one that is currently open in the chat."

---

Current problem: the background.js file isn't loading.
```
    "background": {
        "scripts": ["background.js"],
        "persistent": false
    },
```
same with content_script.js
```

    "content_scripts": [
        {
          "matches": ["https://chat.openai.com/*"],
          "js": ["content_script.js"]
        }
      ],
```