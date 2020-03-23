function getImageSearchResults(searchTerm, callback, start, num) {
    start = start < 0 || start > 90 || typeof start === "undefined" ? 0 : start;
    num = num < 1 || num > 10 || typeof num === "undefined" ? 10 : num;
  
    if (!searchTerm) {
      console.error("No search term");
    }
  
    let parameters = "&q=" + encodeURIComponent(searchTerm);
     
    let host = "https://www.googleapis.com";
    let path ="/customsearch/v1?key=AIzaSyBDXj8t0_S7w1orJGdQmGFGI3JQ3PQf0wA&cx=009981358939701815566:g0kfaqf4sfi"+parameters;
  
    return fetch(host + path).then(response => response.json()).then(json => {
      let resultsArray = [];
      // check for usage limits (contributed by @ryanmete)
      // This handles the exception thrown when a user's Google CSE quota has been exceeded for the day.
      // Google CSE returns a JSON object with a field called "error" if quota is exceed.
      if (json.error && json.error.errors) {
        resultsArray.push(json.error.errors[0]);
  
        // returns the JSON formatted error message in the callback
        throw resultsArray;
      } else if (json.items) {
        // search returned results
        json.items.forEach(function(item) {
          resultsArray.push(item);
        });
  
        return resultsArray;
      } else {
        return [];
      }
    });
  }
  
  export default getImageSearchResults;