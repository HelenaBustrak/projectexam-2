import createLoginButton from "./components/loginButton.js";
import displayMessage from "./components/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { url } from "./settings/api.js";
import { getUsername } from "./utils/storage.js";

createLoginButton();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const username = getUsername();

if (!username) {
  document.location.href="/"
}

const postForm = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#title"); 
const text = document.querySelector("#text");
const date = document.querySelector("#date");
const message = document.querySelector(".message-container");



postForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
    message.innerHTML = "";

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const dateValue = date.value.toString();
    const textValue = text.value.trim();

    if (titleValue.length === 0 || descriptionValue.length === 0 || dateValue.length === 0 || textValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    postArticle(titleValue, descriptionValue, dateValue, textValue);

}

async function postArticle(title, description, date, text) {
    const data = JSON.stringify({data: {Title: title, Description: description, Date: date, Text: text}});

    const token = getToken();

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "application/json",
            "Authorization" : "Bearer " + token },
        body: data,
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.data.attributes.Title) {
            displayMessage("success", "Article Posted!", ".message-container");
            postForm.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }

    } catch(error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}