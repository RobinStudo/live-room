const modal = document.getElementById('modal');
const btnLogin = document.getElementById('btn-login');
const input = document.getElementById('username');

let username = null;

input.addEventListener('input', () => {
    username = input.value;
});

const login = event => {  
    if(username != null || username.match("[^\\s]"))
    {
        console.log(username);
        modal.style.display = 'none';
    }
}

btnLogin.addEventListener('click', login);




import { Room } from './src/Room.js';

new Room();
