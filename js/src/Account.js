export class Account{
    constructor() {
        this.buildElements();
        this.bindEvents();
    }

    buildElements() {
        this.elements = {
            loginModal: document.getElementById('modal'),
            loginForm: document.getElementById('login'),
            usernameInput: document.querySelector('#usernameInput')
        };
    }

    bindEvents() {
        this.elements.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = this.elements.usernameInput.value;
            if(username.match(/^\w{3,20}$/g) === null) {
                return;
            }

            this.elements.loginModal.classList.add('hidden');
            this.user = username;
        });
    }

    getUser(){
        return this.user;
    }
}
