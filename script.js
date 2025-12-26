/* ===== TRYB CIEMNY ===== */
const themeBtn = document.getElementById("themeBtn");
const body = document.body;
let counter = 0;
const countSpan = document.getElementById("count");

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    counter++;
    countSpan.textContent = counter;
});

/* ===== ANIMACJA KART ===== */
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
    setTimeout(() => card.classList.add("show"), index * 200);
});

/* ===== SOCIAL CLICK EFFECT ===== */
const socialIcons = document.querySelectorAll(".social");
socialIcons.forEach((icon) => {
    icon.addEventListener("mousedown", () => icon.style.transform = "scale(0.95)");
    icon.addEventListener("mouseup", () => icon.style.transform = "");
});

/* ===== CHATBOT ===== */
const chatToggle = document.getElementById("chat-toggle");
const chatBody = document.getElementById("chat-body");
const chatSend = document.getElementById("chat-send");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
let chatMinimized = false;

chatToggle.addEventListener("click", () => {
    chatMinimized = !chatMinimized;
    if(chatMinimized){ chatBody.classList.add("minimized"); chatToggle.textContent = "+"; }
    else { chatBody.classList.remove("minimized"); chatToggle.textContent = "–"; }
});

function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = (sender==="user"?"Ty: ":"Bot: ") + text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userText) {
    let reply = "Nie wiem jak odpowiedzieć 😅";
    if(userText.toLowerCase().includes("cześć")) reply="Cześć! Jak mogę Ci pomóc?";
    else if(userText.toLowerCase().includes("jak się masz")) reply="Mam się świetnie! 😎";
    else if(userText.toLowerCase().includes("strona")) reply="To jest Twoja strona HTML + CSS + JS!";
    else if(userText.toLowerCase().includes("kto jest moim najlepszym przyjacielem")) reply="Krzysiu&Szymon";
    return reply;
}

chatSend.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if(text==="") return;
    addMessage(text,"user");
    chatInput.value="";
    setTimeout(()=>{ addMessage(botReply(text),"bot"); },500);
});

chatInput.addEventListener("keypress",(e)=>{ if(e.key==="Enter") chatSend.click(); });

/* ===== KÓŁKO I KRZYŻYK ===== */
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const winnerText = document.getElementById("winner");
const resetBtn = document.getElementById("resetBtn");
const scoreText = document.getElementById("score");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let score = { X: 0, O: 0 };

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // wiersze
    [0,3,6],[1,4,7],[2,5,8], // kolumny
    [0,4,8],[2,4,6]          // przekątne
];

function checkWin() {
    for (let condition of winConditions) {
        const [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winnerText.textContent = `Wygrywa: ${board[a]} 🎉`;
            gameActive = false;
            score[board[a]]++;
            updateScore();
            return;
        }
    }
    if (!board.includes("")) {
        winnerText.textContent = "Remis 🤝";
        gameActive = false;
    }
}

function updateScore() {
    scoreText.textContent = `X: ${score.X} | O: ${score.O}`;
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWin();
            if (gameActive) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                turnText.textContent = `Ruch gracza: ${currentPlayer}`;
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    turnText.textContent = `Ruch gracza: ${currentPlayer}`;
    winnerText.textContent = "";
    gameActive = true;
});

