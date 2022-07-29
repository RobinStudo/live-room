import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class Room{
    constructor() {
        this.socket = io('ws://localhost:3000');
        this.elements = {
            feed: document.getElementById('feed'),
            box: document.getElementById('box'),
            boxInput: document.querySelector('#box textarea'),
            button: document.querySelector('button'),
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elements.box.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.elements.boxInput.value;
            this.elements.boxInput.value = '';

            this.send(message);
        });

        this.socket.on('forwardMessage', message => {
            this.display(message, 'recived');
        });

        this.elements.boxInput.onkeypress = (e) => {
            const keyCode = e.keyCode
            if (keyCode === 13  && !e.shiftKey) {
                this.elements.button.click();
               e.preventDefault();
            }
        }
    }

    send(message){
        if(message.length === 0){
            return;
        }

        this.socket.emit('originMessage', message);
        this.display(message, 'sent');
    }

    display(message, classname){
        const messageElement = document.createElement('article');
        messageElement.classList.add('message');
        messageElement.classList.add(classname);
        messageElement.innerText = message;

        this.elements.feed.prepend(messageElement);
    }
}
