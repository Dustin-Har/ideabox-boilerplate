class Comment {
  constructor(id, title, body, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.isStarred = star || false;
  }

  saveToStorage() {
    localStorage.setItem("comments", JSON.stringify(ideas));
  }

  deleteFromStorage() {
    localStorage.setItem("comments", JSON.stringify(ideas));
  }
}
