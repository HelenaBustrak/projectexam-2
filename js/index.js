import { url } from "./settings/api.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

(async function getArticles() {
  const articlesContainer = document.querySelector(".articles");

  

  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.data);

    const articles = json.data;
    articlesContainer.innerHTML = "";

    articlesContainer.innerHTML += `<div class="article">
    <div class="article__imageContainer">
        <a href=""><img class="article__image" src="${articles[0].attributes.Image.data.attributes.url}"></a>
    </div>
    <div class="article__info">
        <h4>${articles[0].attributes.Title}</h4>
        <h5>{${articles[0].attributes.Date}}</h5>
        <p>${articles[0].attributes.Description}</p>
        <a  class="button" href="">Read More</a>
    </div>
</div>
<div class="article">
    <div class="article__imageContainer">
        <a href=""><img class="article__image" src="${articles[2].attributes.Image.data.attributes.url}"></a>
    </div>
    <div class="article__info">
        <h4>${articles[2].attributes.Title}</h4>
        <h5>{${articles[2].attributes.Date}}</h5>
        <p>${articles[2].attributes.Description}</p>
        <a  class="button" href="">Read More</a>
    </div>
</div>
<div class="article">
    <div class="article__imageContainer">
        <a href=""><img class="article__image" src="${articles[5].attributes.Image.data.attributes.url}"></a>
    </div>
    <div class="article__info">
        <h4>${articles[5].attributes.Title}</h4>
        <h5>{${articles[5].attributes.Date}}</h5>
        <p>${articles[5].attributes.Description}</p>
        <a  class="button" href="">Read More</a>
    </div>
</div>`;

    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();
