const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { randomUUID: uuidv4 } = require('node:crypto');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let posts=[
    {
        id: uuidv4(),
        username: "zaid ali shah",
        content: "i love backend development",
    },
    {
        id: uuidv4(),
        username: "shayan shah",
        content: "cyber security is my passion",
    },
    {
        id: uuidv4(),
        username: "jawad shah", 
        content: "anxiety is a mental health issue",
    }
]
app.get('/posts', (req, res) => {
    res.render('index.ejs', {  posts });
});
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content})
    res.redirect("/posts");
})
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render('show.ejs',{ post });
})
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { content: newContent } = req.body;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.sendStatus(404);
    }
    if (typeof newContent !== 'string') {
        return res.status(400).send('Post content is required');
    }
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get('/posts/:id/edit', (req, res) => {
     let { id } = req.params;
     let post = posts.find((p) => p.id === id);
     if (!post) {
         return res.sendStatus(404);
     }
        res.render('edit.ejs', { post }); 
})
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");

})

app.listen(port, () => {
    console.log("port is listening on 8080");
});
