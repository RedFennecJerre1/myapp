const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();
app.use(urlencoded({ extended: true }));
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/person/add', (req, res) => {
    res.render('add-person');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);


//mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sct:iPHIq466n6K6qgKG@scheldepunt.qyazdgl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
