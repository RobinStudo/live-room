import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { createPicker } from '../../node_modules/picmo/dist/index.js';

export class Room{
    constructor() {
        this.socket = io('ws://localhost:3000');
        this.elements = {
            feed: document.getElementById('feed'),
            box: document.getElementById('box'),
            boxInput: document.querySelector('#box input'),
            emojiPicker: document.querySelector('.pickerContainer'),
            emojiPickerButton: document.querySelector('.box-emoji'),
        };
        this.picker = createPicker({
            rootElement: this.elements.emojiPicker
        });

        this.bindEvents();
    }

    bindEvents() {
        this.elements.box.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.elements.boxInput.value;
            this.elements.boxInput.value = '';

            this.send(message);
            this.toggleDisplayEmojiPicker()
        });

        this.socket.on('forwardMessage', message => {
            this.display(message, 'recived');
        });

        this.elements.emojiPickerButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDisplayEmojiPicker();
        });

        this.picker.addEventListener('emoji:select', (e) => {
            console.log(e.emoji);
            this.addEmoji(e.emoji);
        });
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

    toggleDisplayEmojiPicker(){
        this.elements.emojiPicker.classList.toggle('hidden');
    }

    addEmoji(emoji){
        this.elements.boxInput.value = this.elements.boxInput.value + emoji;
    }
}
