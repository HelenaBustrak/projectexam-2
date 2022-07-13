export function renderArticles(articlesToRender) {
    const articlesContainer = document.querySelector(".articles");
    articlesContainer.innerHTML = "";

    articlesToRender.forEach((article) => {
        articlesContainer.innerHTML += `<div class="card">
                                      <h4>${article.attributes.Title}</h4>
                                      <h5 class="card-date">${article.attributes.Date}</h5>
                                      <p class="card-paragraph">${article.attributes.Description}</p>
                                      <a class="button" href="article.html?id=${article.id}">Read More</a>
                                 </div>`;
      });
}