class Idea {
  constructor(title, body, star) {
    this.id = Date.now();
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

  updateIdea() {
      if (this.isStarred) {
        this.isStarred = true;
      } else {
        this.isStarred = false;
      }
    }
  }
