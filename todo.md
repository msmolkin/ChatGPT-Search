Next steps:
2. Compile list of messages for each of the other chat sessions as well
3. Then search through all the messages inside the all_chats
4. Publish to store

---

Manifest.json things that I might need to edit:
2. prune permissions. I don't think all of these are necessary
`"permissions": ["tabs", "storage", "activeTab", "https://chat.openai.com/"],`
I added tabs/storage originally assuming I'd open all the chats in background tabs and save them to a clipboard-like file. Might be smarter to open the chats in iframes or something like that.

---

Might change in description or a README.md file:
"Important, this only searches the current thread in each chat. If you modified a prompt, the search will only search the one that you went with and is currently open in the chat."

---

idea:
  Save the original url, so it opens that back after gathering the archived chats (it currently leaves it on the last chat)
  Even better: search through those chats in an iframe rather than the browser
  Ideally, figure out how to save the archive in a hard drive rather than in cache, so it doesn’t have to rebuild every time (in the search window: “currently searching all chats before Monday, May 23, 2023 at 9:00 PM PT. Would you like to update the index?”)

  #line83todo: Make sure I've backed up everything that I needed to before this happens, or figure out another way get back to the original URL (e.g. figure out which chat is highlighted before running clickLinks and then click on that link again, rather than saving the URL and navigating to it)

---

In popup.js:
clicking on rebuild index should run a function that generates an index of history that you'l search through
clicking on search should provide you with a list of chats that this search term is found in, along with 2 words (or two lines) of context (like `grep -C 2` does)

---

allChats.originalURL = activeTab.currentURL.beginsWith("https://chat.openai.com/c/") ? window.location.href : null;
