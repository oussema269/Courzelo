export class Answer {
    id?: string; // Optional due to @JsonIgnore in Java class
    response: string;
  
    constructor(response: string, id?: string) {
      this.response = response;
      this.id = id;
    }
  }