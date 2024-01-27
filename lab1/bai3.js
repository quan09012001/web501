var urlAPI = 'https://jsonplaceholder.typicode.com/todos';

fetch(urlAPI)
.then(response = response => response.json()) // JSON -> JavaScript Types
.then(duLieu => console.log(duLieu)) // nếu api hoạt động
.catch(err => console.log(err)); // nếu api không hoạt động