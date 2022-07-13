import createLoginButton from "./components/loginButton.js";
import { renderArticles } from "./components/renderArticles.js";
import { searchArticles } from "./components/searchArticles.js";
import { url } from "./settings/api.js";
import { getUsername } from "./utils/storage.js";

const addContainer = document.querySelector(".add-article-container");

createLoginButton();

const username = getUsername();
let addPostLink = "";

if (username) {
  addPostLink = `<a  class="add-article" href="post.html"><i class="fa-solid fa-plus"></i> Add Article</a>`;
}

addContainer.innerHTML = addPostLink;


 async function getArticles(articles) {
  const articlesContainer = document.querySelector(".articles");

  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.data);

    const articles = json.data;

    articlesContainer.innerHTML = "";

    renderArticles(articles);
    searchArticles(articles);
    
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

getArticles();
