import { getUsername } from "./utils/storage.js";
import createLoginButton from "./components/loginButton.js";

createLoginButton();
const articleContainer = document.querySelector(".article");
const pageTitle = document.querySelector("title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const username = getUsername();


const articleUrl =
  "https://helbusprojectexam2.herokuapp.com/api/articles/" + id;

(async function fetchArticle() {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    const article = json.data;
    pageTitle.innerHTML = `Front-End Wiki - ${article.attributes.Title}`;

    console.log(article)
    const username = getUsername();

    let edit = `<a class="edit" href="edit.html?id=${article.id}"><i class="fas fa-pen"></i> Edit<a/>`;

    if (!username) {
      edit = "";
    }

    articleContainer.innerHTML = `
                                    <h5>${article.attributes.Date}</h5>
                                    ${edit}
                                    <h1>${article.attributes.Title}</h1>
                                    <h5>Written by: Helena Bustrak</h5>
                                    <p>${article.attributes.Text}</p>`;
  } catch (error) {
    console.log(error);
  }
})();
