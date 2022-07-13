import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createLoginButton() {

    const container = document.querySelector(".login-container");
    const username = getUsername();

    let authLink = `<a  class="login" href="login.html"><i class="fa-solid fa-circle-user"></i>Login</a> `;
    
    if (username) {
        authLink = `<button id="logout"><i class="fa-solid fa-right-from-bracket"></i>Logout</button>`;
        
    }
    container.innerHTML = authLink;

    logoutButton();
}


