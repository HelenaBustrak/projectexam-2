import { getUsername } from "./utils/storage.js";
import createLoginButton from "./components/loginButton.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/deleteButton.js";
import displayMessage  from "./components/displayMessage.js";

createLoginButton();
const articleContainer = document.querySelector(".article");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const username = getUsername();

if (!id || !username) {
  document.location.href="/"
}

const articleUrl = "https://helbusprojectexam2.herokuapp.com/api/articles/" + id;

const editForm = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description"); 
const text = document.querySelector("#text");
const date = document.querySelector("#date");
const idInput = document.querySelector("#id-input");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function() {
    loading.innerHTML = "";
    try {
        const response = await fetch(articleUrl);
        const json = await response.json();

        const details = json.data;

        title.value = details.attributes.Title;
        description.value = details.attributes.Description;
        idInput.value = details.id;
        date.value = details.attributes.Date;
        text.value = details.attributes.Text;

        deleteButton(details.id);

    }
    catch(error) {
        console.log(error);
    }
    finally {
        loading.style.display = "none";
        editForm.style.display = "flex";
    }
})();

editForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";
    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const dateValue = date.value.toString();
    const textValue = text.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || descriptionValue.length === 0 || dateValue.length === 0 || textValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, descriptionValue, dateValue, textValue, idValue);
}

async function updateProduct(title, description, date, text, id) {
    const data = JSON.stringify({data: {Title: title, Description: description, Date: date, Text: text}});

    const token = getToken();
    console.log(token);

    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: { "Content-Type": "application/json",
            "Authorization" : "Bearer " + token },
        body: data,
    };

    try {
        const response = await fetch(articleUrl, options);
        const json = await response.json();

        if(json.data.attributes.updatedAt) {
            displayMessage("success", "Article updated", ".message-container");
            
        }

        if(json.error) {
            displayMessage("error", json.error, ".message-container");
        }
    }
    catch(error) {
        console.log(error);
    }
}
