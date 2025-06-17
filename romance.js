let character = null;
let affection = 0;
let affectionMessageShown = false;
const choiceList = [
  {
    text: 'Say hello',
    response: name => `${name}: Hello! How's your day going?`,
    delta: 1
  },
  {
    text: 'Ask on a date',
    response: name => `${name}: That sounds fun! Maybe we can plan something soon.`,
    delta: 2
  },
  {
    text: 'Say something rude',
    response: name => `${name}: That's not very nice...`,
    delta: -2
  }
];

function startConversation() {
  const nameInput = document.getElementById('char-name');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const chatBox = document.getElementById('chat-box');

  if (!nameInput.value) {
    alert('Please enter a character name.');
    return;
  }

  character = {
    name: nameInput.value.trim()
  };
  affection = 0;
  affectionMessageShown = false;
  chatBox.innerHTML = '';
  appendMessage(`${character.name}: Hi there! It's nice to meet you.`);
  userInput.disabled = false;
  sendBtn.disabled = false;
  nameInput.disabled = true;
  updateAffection();
  showChoices();
}

function appendMessage(text) {
  const chatBox = document.getElementById('chat-box');
  const p = document.createElement('p');
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showChoices() {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choiceList.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.onclick = () => chooseOption(idx);
    btn.style.marginRight = '5px';
    choicesDiv.appendChild(btn);
  });
}

function chooseOption(index) {
  const choice = choiceList[index];
  appendMessage(`You: ${choice.text}`);
  appendMessage(choice.response(character.name));
  affection += choice.delta;
  updateAffection();
}

function updateAffection() {
  document.getElementById('affection').textContent = affection;
  if (!affectionMessageShown && affection >= 5) {
    appendMessage(`${character.name}: I feel like we're getting closer!`);
    affectionMessageShown = true;
  }
}

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage(`You: ${msg}`);
  userInput.value = '';

  // simple response logic
  let response = '';
  if (msg.toLowerCase().includes('hello') || msg.toLowerCase().includes('hi')) {
    response = `${character.name}: Hello! How's your day going?`;
    affection += 1;
  } else if (msg.toLowerCase().includes('date')) {
    response = `${character.name}: That sounds fun! Maybe we can plan something soon.`;
    affection += 2;
  } else {
    const replies = [
      `${character.name}: That's interesting!`,
      `${character.name}: Tell me more about that.`,
      `${character.name}: I enjoy chatting with you.`
    ];
    response = replies[Math.floor(Math.random() * replies.length)];
  }

  appendMessage(response);
  updateAffection();
}
