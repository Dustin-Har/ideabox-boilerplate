//  Global Variables:
var ideas = [];
var comments = [];

//  Query Selectors:
var form = document.querySelector(".form");
var showStarred = document.querySelector("#showStarred");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var saveButton = document.querySelector("#saveButton");
var saveCommentBtn = document.querySelector("#saveCommentBtn");
var searchInput = document.querySelector("#searchInput");
var star = document.querySelectorAll(".star");
var commentIcon = document.querySelector("#commentIcon");
var cardSection = document.querySelector("#cardSection");
var showStarredBtn = document.querySelector("#showStarred");
var commentSection = document.querySelector("#commentSection")
var filterOn = false;
saveButton.disabled = true;
saveCommentBtn.disabled = true;

form.addEventListener("input", activateSave);
// form.addEventListener("keyup", saveComment);
cardSection.addEventListener("click", deleteCard);
cardSection.addEventListener("click", toggleComment)
showStarredBtn.addEventListener("click", showStarredCards);
window.addEventListener("onload", getStorage());
searchInput.addEventListener("keyup", inputSearch);
saveCommentBtn.addEventListener("click", saveComment);

saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
  newIdea.saveToStorage();
  disableSaveBttn()
  displayCards();
  return newIdea;
})


function getStorage() {
  var storedIdeas = localStorage.getItem("ideas");
  ideas = JSON.parse(localStorage.getItem("ideas")) || [];
  instanciateStorage(ideas);
}

function instanciateStorage(parsedStorage) {
  for (var i = 0; i < parsedStorage.length; i++) {
    parsedStorage[i] = new Idea(parsedStorage[i].title, parsedStorage[i].body, parsedStorage[i].id, parsedStorage[i].isStarred)
    localStorage.setItem("ideas", JSON.stringify(parsedStorage));
    displayCards();
  }
}

function showStarredCards() {
  if (!filterOn) {
    cardSection.innerHTML = "";
    filterOn = true;
    showStarredBtn.innerText = "Show All Ideas"
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].isStarred) {
        htmlCreator(i);
      }
    }
  } else {
    filterOn = false;
    showStarredBtn.innerText = "Show Starred Ideas";
    displayCards();
  }
}

function activateSave(e) {
  var key = e.key;
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveCommentBtn.disabled = false;
  } else if (key === "Backspace" || key === "Delete") {
    saveButton.disabled = true;
    saveCommentBtn.disabled = true;
  }if (!titleInput.value && !bodyInput.value) {
    saveButton.disabled = true;
    saveCommentBtn.disabled = true;
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

function disableSaveBttn() {
  saveButton.disabled = true;
  saveButton.hidden = false;
  saveCommentBtn.hidden = true;
  titleInput.value = "";
  bodyInput.value = "";
}


function deleteCard() {
  if (event.target.classList.value === "delete") {
    for (i = 0; i < ideas.length; i++) {
      if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
        var focusIdea = new Idea(ideas[i].title, ideas[i].body);
        ideas.splice(i, 1);
        focusIdea.deleteFromStorage();
        displayCards();
      }
    }
  }
}

cardSection.addEventListener('click', changeStar);

function changeStar(event) {
  if (event.target.classList.contains("star")) {
    if (event.target.src.includes("/assets/star.svg")) {
      event.target.src = "assets/star-active.svg";
      updateInstance(event);
    } else {
      event.target.src = "assets/star.svg";
      updateInstance(event);
    }
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
  if (event.target.classList.value === "comment-icon") {
    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
        saveButton.hidden = true;
        saveCommentBtn.hidden = false;
        titleInput.value = "";
        bodyInput.value = "";
      }
    }
  }
}


function saveComment() {
  event.preventDefault();
  newComment = new Comment(titleInput.value, bodyInput.value)
  comments.push(newComment);
  newComment.saveToStorage();
  disableSaveBttn()
  displayCards();
  return newComment;
}

function displayCards() {
  showStarredBtn.innerText = "Show Starred Ideas";
  filterOn = false;
  cardSection.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    htmlCreator(i);
  }
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

function commentBox() {
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
