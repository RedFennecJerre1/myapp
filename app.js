const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();
const Person = require('./models/personSchema');
const Post = require('./models/postSchema');
app.use(urlencoded({ extended: true }));
const port = 3000;


const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/post', postRoutes);


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});



app.get('/people', async (req, res) => {
    // Fetch all people from the database
    const people = await Person.find({});
  
    // Render the view with the list of people
    res.render('person', { people });
  });

// Route for updating a person
app.get("/people/:id", async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render("peopleEdit", { person });
  });
  
app.post("/people/:id", async (req, res) => {
    const { name, age } = req.body;
    if (typeof name !== 'string') {
        return res.status(400).send('Name must be string');
     }
    
     // Check if the age is an integer
     if (isNaN(age)) {
        return res.status(400).send('Age must be a numeric value');
     }
    const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.redirect("/people");
  });

  app.post("/people/delete/:id", async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
  
        if (!person) {
          return res.status(404).send();
        }
  
        res.redirect("/people");
      } catch (error) {
        res.status(500).send(error);
      }
  });



  app.get('/posts', async (req, res) => {
    const post = await Post.find({});
    res.render('post', { post });
  });


app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("postEdit", { post });
  });
  
app.post("/posts/:id", async (req, res) => {
    const { name, category, content } = req.body;
    if (typeof name !== 'string' || typeof category !== 'string' || typeof content !== 'string') {
      return res.status(400).send('Name, category and content must be strings');
   }



    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.redirect("/posts");
  });

  app.post("/posts/delete/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
  
        if (!post) {
          return res.status(404).send();
        }
  
        res.redirect("/posts");
      } catch (error) {
        res.status(500).send(error);
      }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




//mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sct:iPHIq466n6K6qgKG@scheldepunt.qyazdgl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
