const express = require('express');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });

// views are the files you render
app.set('views', __dirname + '/views');
//Using EJS for views
app.set('view engine', 'ejs');

app.use(cors());

app.set('public', __dirname + '/public');
//Static Folder
app.use(express.static('public'));

//Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(request, response)=>{
    //const todoItems = await db.collection('todos').find().toArray();
    //const itemsLeft = await db.collection('todos').countDocuments({completed: false});
    //response.render('index.ejs', { items: todoItems, left: itemsLeft });
    db.collection('todos').find().toArray()
    .then(data => {
        db.collection('todos').countDocuments({completed: false, visible: true})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
});

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, visible: true, completed: false})
    .then(result => {
        console.log('Todo Added');
        response.redirect('/');
    })
    .catch(error => console.error(error));
});

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete');
        response.json('Marked Complete');
    })
    .catch(error => console.error(error));
});

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Uncomplete');
        response.json('Marked Uncomplete');
    })
    .catch(error => console.error(error));
});

app.delete('/deleteItem', (request, response) => {
  db.collection('todos').updateOne({thing: request.body.itemFromJS},{
    $set: {
        visible: false
      }
},{
    sort: {_id: -1},
    upsert: false
})
    .then(result => {
        console.log('Todo Deleted');
        response.json('Todo Deleted');
    })
    .catch(error => console.error(error));
});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

// Export the Express API
module.exports = app;
