export class ChatMessage {
    #nickname;
    #message;
  
    constructor(nickname, message) {
      this.#nickname = nickname;
      this.#message = message;
    }
  
    get nickname() {
      return this.#nickname; 
    }
  
    get message() {
      return this.#message;
    }
  
    // JSON.stringify negeert private fields, dus we
    // moeten wat helpen...
    toJSON() {
      return { 
        nickname: this.#nickname,
        message: this.#message,
      };
    }
  }
  