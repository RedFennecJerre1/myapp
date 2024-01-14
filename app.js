const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const personRoutes = require('./routes/personRoutes');
app.use('/api/people', personRoutes);


//mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sct:iPHIq466n6K6qgKG@scheldepunt.qyazdgl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
