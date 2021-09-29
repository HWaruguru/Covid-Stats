export class Comment {
    comment: string;
    author: string;
    id: number;
  
    constructor(id: number, comment: string, author: string) {
      this.author = author;
      this.comment = comment;
      this.id = id;
    }
  }