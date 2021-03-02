class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.isStarred = star || false;
    this.comments = [];
  }
  saveToStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  deleteFromStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  updateIdea(title, body, id, star, comments) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.isStarred = star;
  }

  addComment(newComment) {
    this.comments.push(newComment)
  }

}
