const express = require('express')
const booksRouter = express.Router()
const Book = require('../models/bookModel')

booksRouter.route('/')
    .get((req, res) => {
        Book.find({}, (err, books) => {
            if (err) {
                res.statusCode(404).json({ msg: 'no books found' })
            }
            res.json(books)
        })
    })
    .post((req, res) => {
        let book = new Book({
            title: req.body.title,
            author: req.body.author
        })
        book.save()
        res.status(201).json(book)
    })

booksRouter.route('/:bookId')

    .put((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            book.title = req.body.title,
                book.author = req.body.author
            book.save()
            res.json(book)
        })
    })
    .delete((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            book.remove(err => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(204).send('Removed !')

            })
        })
    })
module.exports = booksRouter
