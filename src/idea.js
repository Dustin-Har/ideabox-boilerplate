class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.isStarred = star || false;
  }
  saveToStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  deleteFromStorage() {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }

  updateIdea(title, body, id, star) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.isStarred = star;
    }
  }
