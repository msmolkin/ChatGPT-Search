< !DOCTYPE html >
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>ChatGPT Search</title>
            <style>
                body {
                    width: 400px;
                height: 250px;
      }
                h1 {
                    font - size: 20px;
      }
                input[type="text"] {
                    width: 300px;
                height: 20px;
                margin-top: 10px;
                margin-bottom: 10px;
                font-size: 16px;
      }
                button {
                    background - color: #4caf50;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
      }
                button:hover {
                    background - color: #3e8e41;
      }
                #rebuild {
                    margin - top: 20px;
      }
                #last-index {
                    font - size: 14px;
      }
            </style>
        </head>
        <body>
            <h1>ChatGPT Search</h1>
            <input type="text" placeholder="Search term" id="searchTerm" />
            <button id="searchBtn">Search</button>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <button id="rebuild">Rebuild search index</button>
                <p id="last-index">Currently searching through chats up until [last index date and time]</p>
            </div>
            <script src="popup.js"></script>
        </body>
    </html>