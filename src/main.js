var ideas = [];
var bodyInput = document.querySelector("#bodyInput");
var cardSection = document.querySelector("#cardSection");
var commentSection = document.querySelector("#commentSection");
var form = document.querySelector("#form");
var search = document.querySelector("#search");
var searchInput = document.querySelector("#searchInput");
var showStarredBtn = document.querySelector("#showStarred");
var titleInput = document.querySelector("#titleInput");
var filterHeader = document.querySelector("#filterHeader");

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
  if (event.target.classList.contains("save-comment")) {
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

function displayComments(index) {
  commentSection.innerHTML = "";
  for (var i = 0; i < ideas[index].comments.length; i++) {
    popCommentBox(i, index);
  }
}

function displayCards() {
  showStarredBtn.innerText = "Show Starred Ideas";
  cardSection.innerHTML = "";
  commentSection.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    htmlCreator(i);
  }
}

function disableSaveBttn() {
  saveButton.hidden = false;
  saveCommentBtn.hidden = true;
  resetForm();
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

function changeButtonText() {
  searchInput.value = "";
  if (showStarredBtn.innerText === "Show Starred Ideas") {
    showStarredBtn.innerText = "Show All Ideas";
  } else {
    showStarredBtn.innerText = "Show Starred Ideas";
  }
}

function showAllCards() {
  if (showStarredBtn.innerText === "Show All Ideas") {
    changeButtonText();
    displayCards();
    commentSection.innerHTML = "";
    filterHeader.innerText = "Filter Starred Ideas"
  }
}

function showStarredCards() {

  if (showStarredBtn.innerText === "Show Starred Ideas") {
    changeButtonText();
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
  if (search.classList.contains("hidden")) {
    cardView();
    filterHeader.innerText = "Filter Starred Ideas"
    return;
  }
  focusCard();
}

function focusCard(index) {
  for (var i = 0; i < ideas.length; i++) {
    if (index) {
      commentView();
      displayComments(index);
      htmlCreator(index);
    } else if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
      commentView();
      displayComments(i);
      htmlCreator(i);
    }
  }
}

function commentView() {
  saveButton.hidden = true;
  saveCommentBtn.hidden = false;
  saveCommentBtn.disabled = true;
  saveCommentBtn.classList.add("comment-view");
  search.classList.add("hidden");
  filterHeader.innerText = "Comment View";
  changeButtonText();
  resetForm();
  cardSection.innerHTML = "";
}

function cardView() {
  saveButton.hidden = false;
  saveCommentBtn.hidden = true;
  saveCommentBtn.classList.remove("comment-view");
  search.classList.remove("hidden");
  filterHeader.innerText = "Show Starred Ideas"
  resetForm();
  displayCards();
}

function saveComment(event) {
  event.preventDefault();
  console.log(event);
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(event.path[5].cardSection.childNodes[1].id) === ideas[i].id) {
      ideas[i].addComment(ideas[i].id, titleInput.value, bodyInput.value, false);
  }
  // disableSaveBttn();
  resetForm();
  cardView();
  displayCards();
}
}

function resetForm() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.disabled = true;
  saveCommentBtn.disabled = true;
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

function popCommentBox(i,index) {
  commentSection.innerHTML += `
  <div class="commentArea" id=${ideas[index].comments[i].id}>
    <div class="comment-controls">
      <img class="star" src="assets/star.svg" alt="star">
      <img class="delete" src="assets/delete.svg" alt="delete">
    </div>
    <article class="comment-content">
      <h1 class="idea-title"><strong>${ideas[index].comments[i].title}</strong></h1>
      <p class="idea-body">${ideas[index].comments[i].body}</p>
    </article>
  </div>`;
  // posterForm.hidden = false;
  // form.hidden = true;
}
