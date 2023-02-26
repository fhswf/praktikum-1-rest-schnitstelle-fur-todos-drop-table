import express from 'express';

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();
const port = 3000
/**
 * Liste aller ToDos. 
 * Wird später durch Datenbank ersetzt!
 */
let TODOS = [
    {
        "id": 1671056616571,
        "title": "Übung 4 machen",
        "due": "2022-11-12T00:00:00.000Z",
        "status": 0
    },
    {
        "id": 1671087245763,
        "title": "Für die Klausur Webentwicklung lernen",
        "due": "2023-01-14T00:00:00.000Z",
        "status": 2
    },
];


/*Operation 	Methode 	URL 	Beschreibung
Create 	POST 	/todos 	Anlegen eines neuen ToDos. Die ID wird dabei vom Backend vergeben.
Read 	GET 	/todos/:id 	Lesen des ToDos mit ID id. Die Syntax :id wird von Express.js verwendet,
um Path Parameter zu spezifizieren.
Read 	GET 	/todos 	Lesen der Liste aller ToDos.
Update 	PUT 	/todos/:id 	Update des ToDos mit ID id.
Delete 	DELETE 	/todos/:id 	Löschen des ToDos mit ID id.*/

//Description of the API 
app.get('/', (req, res) => {
    res.send('Todo App API\n' + 'reate Todo: POST /todos\n' + 'Read Todo: GET /todos/:id\n' + 'Read all Todos: GET /todos\n' + 'Update Todo: PUT /todos/:id\n' + 'Delete Todo: DELETE /todos/:id\n');
})

//Get all todos
app.get('/todos', (req, res) => {
    res.send(TODOS);
  })

//Get a single todo
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = TODOS.find(t => t.id == id);
    res.send(todo);
  }
)

//Create a new todo
app.post('/todos', (req, res) => {
    const todo = req.body;
    const maxId = TODOS.reduce((max, t) => t.id > max ? t.id : max, 0);
    todo.id = maxId + 1;
    TODOS.push(todo);
    res.send(todo);
  }
)

//Update a todo
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = TODOS.find(t => t.id == id);
    Object.assign(todo, req.body);
    res.send(todo);
  }
)

//Delete a todo
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TODOS = TODOS.filter(t => t.id != id);
    res.send();
  }
)

app.listen(port, () => {
    console.log(`Todo App listening on port ${port}`)
  })