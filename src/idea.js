class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.isStarred = star || false;
    this.comments = [
      // {
      //   id: this.id,
      //   title: "Fake Title",
      //   body: "Big long fake body keeps going many text and text",
      //   isStarred: false,
      // },
      // {
      //   id: this.id,
      //   title: "Fake Title 2",
      //   body: "Big long fake body keeps going many text and textsssssssss",
      //   isStarred: false,
      // },
      // {
      //   id: this.id,
      //   title: "Fake Title",
      //   body: "Big long fake body keeps going many text and text",
      //   isStarred: false,
      // },
      // {
      //   id: this.id,
      //   title: "Fake Title 2",
      //   body: "Big long fake body keeps going many text and textsssssssss",
      //   isStarred: false,
      // }
    ];
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

  addComment(id, commentTitle, commentBody, star) {
    var newComment = new Comment(id, commentTitle, commentBody, star);
    this.comments.push(newComment);
    newComment.saveToStorage();
  }

}
