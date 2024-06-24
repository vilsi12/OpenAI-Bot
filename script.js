const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Send message when Enter key is pressed
userInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') {
    appendMessage('You', message);
    userInput.value = '';

    // Send message to the bot
    fetchMessageFromBot(message);
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

async function fetchMessageFromBot(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  const botMessage = data.choices[0].message.content;
  appendMessage('Cosmotown Bot', botMessage);
}
