import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io('ws://localhost:3000');
const elements = {
    feed: document.getElementById('feed'),
    box: document.getElementById('box'),
    boxInput: document.querySelector('#box input'),
};

elements.box.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = elements.boxInput.value;
    if(message.length === 0){
        return;
    }

    socket.emit('originMessage', message);
    elements.boxInput.value = '';

    const messageElement = document.createElement('article');
    messageElement.classList.add('message');
    messageElement.classList.add('sent');
    messageElement.innerText = message;

    elements.feed.prepend(messageElement);
});

socket.on('forwardMessage', (message) => {
    const messageElement = document.createElement('article');
    messageElement.classList.add('message');
    messageElement.classList.add('recived');
    messageElement.innerText = message;

    elements.feed.prepend(messageElement);
});
