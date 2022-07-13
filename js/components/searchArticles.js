import { renderArticles } from "./renderArticles.js";

export function searchArticles(articles) {
    const search = document.querySelector("#searchbar");
    search.onkeyup = function (event) {
        
        const searchValue = event.target.value.trim().toLowerCase();
      
        const filteredArticles = articles.filter(function (article) {
          if (article.attributes.Title.toLowerCase().includes(searchValue)) {
            return true;
          } 
        });
        
        renderArticles(filteredArticles);
      
      };
}