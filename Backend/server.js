const express = require('express');
const mongoose = require('mongoose');
const Book = require('./modeles/bookModel');
require('dotenv').config(); 
const app = express();
const port = 3000;

app.use(express.json());

 
mongoose.connect( process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).send(newBook);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
