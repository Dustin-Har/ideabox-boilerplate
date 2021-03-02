var ideas = [];
var bodyInput = document.querySelector("#bodyInput");
var cardSection = document.querySelector("#cardSection");
var commentSection = document.querySelector("#commentSection")
var form = document.querySelector("#form");
var searchInput = document.querySelector(".search");
var showStarredBtn = document.querySelector("#showStarred");
var titleInput = document.querySelector("#titleInput");

window.addEventListener('keyup', keyupHandler);
window.addEventListener('click', clickHandler);
window.addEventListener('onload', getStorage());

function keyupHandler(event) {
  if (event.target === titleInput || event.target === bodyInput) {
    activateSave(event);
  }
  if (event.target.classList.contains('search')) {
    inputSearch(event);
  }
}

function clickHandler(event) {
  if (event.target.classList.contains("star")) {
    changeStar(event);
  }
  if (event.target.classList.value === "delete") {
    deleteCard();
  }
  if (event.target.classList.value === "comment-icon") {
    toggleComment();
  }
  if (event.target.classList.value === "show-starred-ideas") {
    showStarredCards();
  }
  if (event.target.classList.value === "save-comment") {
    saveComment(event);
  }
  if (event.target.classList.value === "save-button") {
    saveCard(event);
  }
}

function getStorage() {
  var storedIdeas = localStorage.getItem("ideas");
  ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  instantiateStorage(ideas);
}

function instantiateStorage(parsedStorage) {
  for (var i = 0; i < parsedStorage.length; i++) {
    parsedStorage[i] = new Idea(parsedStorage[i].title, parsedStorage[i].body, parsedStorage[i].id, parsedStorage[i].isStarred)
    // parsedStorage[i].saveToStorage();
    localStorage.setItem("ideas", JSON.stringify(parsedStorage));
    displayCards();
  }
}

function displayCards() {
  showStarredBtn.innerText = "Show Starred Ideas";
  cardSection.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    htmlCreator(i);
  }
}

function disableSaveBttn() {
  saveButton.disabled = true;
  saveButton.hidden = false;
  saveCommentBtn.hidden = true;
  titleInput.value = "";
  bodyInput.value = "";
}

function activateSave(e) {
  var key = e.key;
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveCommentBtn.disabled = false;
  } else {
    saveButton.disabled = true;
    saveCommentBtn.disabled = true;
  }
}

function saveCard(event) {
  event.preventDefault();
  newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
  newIdea.saveToStorage();
  disableSaveBttn()
  displayCards();
  return newIdea;
}

function changeView() {
  searchInput.value = "";
  if (showStarredBtn.innerText === "Show Starred Ideas") {
    showStarredBtn.innerText = "Show All Ideas";
  } else {
    showStarredBtn.innerText = "Show Starred Ideas";
  }
}

function showAllCards() {
  if (showStarredBtn.innerText === "Show All Ideas") {
    changeView();
    displayCards();
  }
}

function showStarredCards() {
  if (showStarredBtn.innerText === "Show Starred Ideas") {
  changeView();
  cardSection.innerHTML = "";
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].isStarred) {
        htmlCreator(i);
    }
  }
} else {
  showAllCards();
}
}

function inputSearch() {
  if (searchInput.innerText === "") {
    showStarredBtn.innerText = "Show Starred Ideas";
  }
  cardSection.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    ideas[i].body.toLowerCase().includes(searchInput.value.toLowerCase())) {
      htmlCreator(i);
    }
  }
}

function deleteCard() {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
      var focusIdea = new Idea(ideas[i].title, ideas[i].body);
      ideas.splice(i, 1);
      focusIdea.deleteFromStorage();
      displayCards();
    }
  }
}

function changeStar(event) {
    if (event.target.src.includes("/assets/star.svg")) {
      event.target.src = "assets/star-active.svg";
      updateInstance(event);
    } else {
      event.target.src = "assets/star.svg";
      updateInstance(event);
  }
}

function updateInstance(event) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
      if (!ideas[i].isStarred) {
        ideas[i].updateIdea(ideas[i].title, ideas[i].body, ideas[i].id, true);
        ideas[i].saveToStorage();
      } else {
        ideas[i].updateIdea(ideas[i].title, ideas[i].body, ideas[i].id, false);
        ideas[i].saveToStorage();
      }
    }
  }
}

function checkStarredValue(index) {
  if (ideas[index].isStarred) {
    return "assets/star-active.svg"
  } else {
    return "assets/star.svg"
  }
}

function toggleComment() {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
      saveButton.hidden = true;
      saveCommentBtn.hidden = false;
      titleInput.value = "";
      bodyInput.value = "";
    }
  }
}

function saveComment(event) {
  event.preventDefault();
  newComment = new Comment(titleInput.value, bodyInput.value)
  comments.push(newComment);
  newComment.saveToStorage();
  disableSaveBttn()
  displayCards();
  return newComment;
}

function htmlCreator(index) {
  cardSection.innerHTML += `
  <div class="idea-card" id=${ideas[index].id}>
    <div class="card-controls">
      <img class="star" src="${checkStarredValue(index)}" alt="star">
      <img class="delete" src="assets/delete.svg" alt="delete">
    </div>
    <article class="idea-content">
      <h1 class="idea-title"><strong>${ideas[index].title}</strong></h1>
      <p class="idea-body">${ideas[index].body}</p>
    </article>
    <div class="comment-body">
      <img class="comment-icon" id="commentIcon" src="assets/comment.svg" alt="comment">
      <h2 class="comment" id="comment">Comment</h2>
    </div>
  </div>`
}

function commentBox(index) {
  cardSection.innerHTML += `
  <div class="commentArea" id=${ideas[index].id}>
    <div class="comment-controls">
      <img class="star" src="${checkStarredValue(index)}" alt="star">
      <img class="delete" src="assets/delete.svg" alt="delete">
    </div>
    <article class="comment-content">
      <h1 class="idea-title"><strong>${ideas[index].title}</strong></h1>
      <p class="idea-body">${ideas[index].body}</p>
    </article>
  </div>`;
  posterForm.hidden = false;
  form.hidden = true;
}
