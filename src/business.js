export default class Trivia {
  static getQuestion() {
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const url = `https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,general_knowledge,history,society_and_culture,sport_and_leisure&limit=10`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}