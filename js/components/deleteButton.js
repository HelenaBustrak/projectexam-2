import { url } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export default function deleteButton(id) {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `<button class="button button-large" type="button" id="delete">Delete Article</button>`;

  const button = document.querySelector("#delete");

  button.onclick = async function () {
    const doDelete = confirm("Are you sure you want to delete this article?");

    if (doDelete) {
      const deleteUrl = url + "/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        mode: "cors",
        headers: { Authorization: "Bearer " + token },
      };

      try {
        const response = await fetch(deleteUrl, options);
        const json = await response.json();

        location.href = "/";

      } catch (error) {
        console.log(error);
      }
    }
  };
}
