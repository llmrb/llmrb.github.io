import createWasmLLM from "./llm.js";

const keyInput = document.getElementById("demo-key");
const providerSelect = document.getElementById("demo-provider");
const initBtn = document.getElementById("demo-init");
const messagesEl = document.getElementById("demo-messages");
const inputEl = document.getElementById("demo-input");
const sendBtn = document.getElementById("demo-send");
const statusEl = document.getElementById("demo-status");

let llm = null;
let provider = null;
let agent = null;
let busy = false;

function addMessage(role, text) {
  const el = document.createElement("div");
  el.className = "demo-msg " + role;
  el.textContent = text;
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return el;
}

function setStatus(text) {
  statusEl.textContent = text;
}

async function initDemo() {
  const key = keyInput.value.trim();
  if (!key) { setStatus("Enter an API key first."); return; }

  initBtn.disabled = true;
  initBtn.textContent = "Loading...";
  setStatus("Loading WASM runtime...");

  try {
    if (!llm) {
      llm = await createWasmLLM();
    }

    const selected = providerSelect.value;
    const methodMap = {
      deepseek: "deepseek",
      openai: "openai",
      anthropic: "anthropic",
      google: "google",
      xai: "xai"
    };
    provider = llm[methodMap[selected] || "openai"]({key});

    agent = null;
    messagesEl.innerHTML =
      '<div class="demo-msg system">Runtime loaded. Start chatting!</div>';

    inputEl.disabled = false;
    sendBtn.disabled = false;
    inputEl.focus();

    initBtn.textContent = "Reinitialize";
    setStatus("Running in WASM via " + selected);
  } catch (err) {
    setStatus("Error: " + err.message);
    initBtn.textContent = "Initialize";
    initBtn.disabled = false;
  }
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || busy || !provider) return;

  busy = true;
  inputEl.disabled = true;
  sendBtn.disabled = true;

  addMessage("user", text);
  inputEl.value = "";

  if (!agent) {
    agent = new llm.Agent(provider, {
      model: providerSelect.value + "-chat"
    });
  }

  const typingEl = addMessage("assistant", "");
  typingEl.className = "demo-msg assistant typing";
  setStatus("Waiting for response...");

  try {
    const response = await agent.talk(text);
    const content = response.content || "[no response]";
    typingEl.className = "demo-msg assistant";
    typingEl.textContent = content;
    setStatus("Ready");
  } catch (err) {
    typingEl.className = "demo-msg assistant";
    typingEl.textContent = "[error: " + err.message + "]";
    setStatus("Error: " + err.message);
  }

  busy = false;
  inputEl.disabled = false;
  sendBtn.disabled = false;
  inputEl.focus();
}

initBtn.addEventListener("click", initDemo);
sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
