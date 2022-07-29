import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { createPicker } from '../../node_modules/picmo/dist/index.js';
import { DateUtil } from './DateUtil.js';

export class Room{
    constructor(account) {
        this.socket = io('ws://localhost:3000');
        this.audioNotification = new Audio("../sound/notification.mp3");
        this.elements = {
            feed: document.getElementById('feed'),
            box: document.getElementById('box'),
            usernameInput: document.getElementById('username'),
            boxInput: document.querySelector('#box textarea'),
            boxButton: document.querySelector('#box .box-send'),
            emojiPicker: document.querySelector('.pickerContainer'),
            emojiPickerButton: document.querySelector('#box .box-emoji'),
            messageTemplate: document.getElementById('messageTemplate'),
        };
        this.emojiPicker = createPicker({
            rootElement: this.elements.emojiPicker
        });

        this.account = account;
        this.bindEvents();
    }

    bindEvents() {
        this.elements.box.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.elements.boxInput.value;
            this.elements.boxInput.value = '';

            this.send(message);
            this.toggleDisplayEmojiPicker(true);
        });

        this.socket.on('forwardMessage', messageData => {
            this.display(JSON.parse(messageData), 'recived');
            this.playNotification();
        });

        this.elements.boxInput.addEventListener('keypress', (e) => {
            const keyCode = e.code;
            if (keyCode === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.elements.boxButton.click();
            }
        });

        this.elements.emojiPickerButton.addEventListener('click', () => {
            this.toggleDisplayEmojiPicker();
        });

        this.emojiPicker.addEventListener('emoji:select', (e) => {
            this.addEmoji(e.emoji);
        });
    }

    send(message){
        if(message.length === 0){
            return;
        }

        const messageData = {
            username: this.account.getUser(),
            message: message,
        };

        this.socket.emit('originMessage', JSON.stringify(messageData));
        this.display(messageData, 'sent');
    }

    display(messageData, classname){
        const timeMessage = DateUtil.getCurrentFormatted();

        const messageElement = this.elements.messageTemplate.content.cloneNode(true).querySelector('article');
        messageElement.classList.add(classname);
        messageElement.querySelector('.message-username').innerText = messageData.username;
        messageElement.querySelector('.message-content').innerText = messageData.message;
        messageElement.querySelector('.message-timer').innerText = timeMessage;

        this.elements.feed.prepend(messageElement);
    }

    playNotification(){
        this.audioNotification.currentTime = 0;
        this.audioNotification.play();
    }

    toggleDisplayEmojiPicker(closeOnly = false){
        if(closeOnly){
            this.elements.emojiPicker.classList.add('hidden');
        }else{
            this.elements.emojiPicker.classList.toggle('hidden');
        }
    }

    addEmoji(emoji){
        this.elements.boxInput.value += emoji;
    }
}
