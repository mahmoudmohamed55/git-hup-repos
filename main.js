let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");
getButton.onclick = function () {
    console.log(theInput.value);
  getRepos();
};
function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        reposData.innerHTML = "";
        repositories.forEach((repo) => {
          let mainDiv = document.createElement("div");
          mainDiv.className = "repo-box";
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          let theUrl = document.createElement("a");
          theUrl.setAttribute(
            "href",
            `https://github.com/${theInput.value}/${repo.name}`
          );
          theUrl.setAttribute("target", "_blank");
          let theUrlText = document.createTextNode("Visit");

          // Append The Repo Url Text To Anchor Tag
          theUrl.appendChild(theUrlText);
          let theUrl2 = document.createElement("a");
          theUrl2.setAttribute(
            "href",
            `https://${theInput.value}.github.io/${repo.name}/`
          );
          theUrl2.setAttribute("target", "_blank");
          let theUrlText2 = document.createTextNode("Demo");

          // Append The Repo Url Text To Anchor Tag
          theUrl2.appendChild(theUrlText2);
          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          mainDiv.appendChild(theUrl);
          mainDiv.appendChild(theUrl2);
          reposData.appendChild(mainDiv);
        });
      });
  }
}
