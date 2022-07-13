import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { loginURL } from "./settings/api.js";

const loginForm = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");
const input = document.querySelectorAll("input");

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const data = JSON.stringify({identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(loginURL, options);
        const json = await response.json();

        if (json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".message-container");
        }

        
    }
    catch(error) {
        displayMessage("error", "An error occured", ".message-container");
    }
}