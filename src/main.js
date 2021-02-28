//  Global Variables:
var newIdea;
var ideas = localStorage.getItem("ideas") ? JSON.parse(localStorage.getItem("ideas")) : [];

// var newComment;
// var comments = localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [];

//  Query Selectors:
var form = document.querySelector(".form");
var showStarred = document.querySelector("#showStarred");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var saveButton = document.querySelector("#saveButton");
var searchInput = document.querySelector("#searchInput");
var star = document.querySelectorAll(".star");
// var starActive = document.querySelector("#starActive");
// var starInactive = document.querySelector("#starInactive");
// var deleteActive = document.querySelector("#deleteActive");
// var deleteInactive = document.querySelector("#deleteInactive");
var commentIcon = document.querySelector("#commentIcon");
var cardSection = document.querySelector("#cardSection");

var savedIdeas = [];

saveButton.disabled = true;
//  Event Listeners:
// showStarred.addEventListener("click", showStarred);
// searchInput.addEventListener("keydown", filterIdeas);
// starInactive.addEventListener("click", activateStar);
// starActive.addEventListener("click", removeStar);
// deleteInactive.addEventListener("mousedown", activateDelete);
// deleteActive.addEventListener("mouseup", removeIdea);
form.addEventListener("keydown", activateSave);
cardSection.addEventListener("click", deleteCard);
document.addEventListener("DOMContentLoaded", displayCards);
// commentIcon.addEventListener("click", addComment);

//  Functions:
function showStarred() {
  // Hides instances where `isStarred = false`
}

// save button needs to be disabled by default and not after keypress
function activateSave(e) {
  var key = e.key;
  if(titleInput.value && bodyInput.value) {
    // enableSaveBttn();
    saveButton.disabled = false;
  } else if (key === "Backspace" || key === "Delete") {
      // disableSaveBttn();
      saveButton.disabled = true;
  } else if (!titleInput.value && !bodyInput.value) {
      // disableSaveBttn();
      saveButton.disabled = true;
  }
}

function disableSaveBttn() {
  saveButton.disabled = true;
  titleInput.value = "";
  bodyInput.value = "";
}
//
// function enableSaveBttn(){
//   saveButton.disabled = false;
//   saveButton.style.background = "#353667";
//   saveButton.classList.add("pointer");
// }

saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  newIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(newIdea);
  newIdea.saveToStorage();
  disableSaveBttn()
  displayCards();
  return newIdea;
  }
)

//change grey star to red star
//have card save in Local storage.
// function activateStar() {
//   togglePictures(starInactive, starActive)
//
// }
//
// function removeStar() {
//   togglePictures(starActive, starInactive);
// }

//
// cardSection.addEventListener("mousedown", activateDelete);
//
// function activateDelete(event) {
//   if (event.target.classList.value === "delete-inactive") {
//     togglePictures(deleteInactive, deleteActive);
// }}



//DELETE: desired card from screen and local storage
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

// function togglePictures(pic1, pic2) {
//   pic1.hidden = true;
//   pic2.hidden = false;
// }

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
  for (var i = 0; i<ideas.length; i++) {
    if (parseInt(event.target.closest(".idea-card").id) === ideas[i].id) {
      var focusIdea = new Idea(ideas[i].title, ideas[i].body);
      if (ideas[i].isStarred === true) {
      ideas[i].isStarred = false;
      focusIdea.saveToStorage();
    } else {
      ideas[i].isStarred = true;
      focusIdea.saveToStorage();
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

function displayCards() {
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
      <h2 class="comment" id="commentIcon">Comment</h2>
    </div>
  </div>`
}


/*

- Search (filter) - takes form string and scans our instances for it (both title and body)
- Star icon - Sets the instance isStarred value to `true`/ changes icon
  *toggles value and icon upon conditions met*
- Delete icon - Changes icon on mousedown/
  removes item from array on mouse up/ displays fresh view

*/
