const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})

// connecting database

const mongoose = require('mongoose')
const DB = 'mongodb+srv://wasifhammad30:K2E6jPUQFlcqqZio@cluster0.vzigs0i.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB, {
    // useNewUrlParser: true,
    //  useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected..')
})
const Book = require('../server/Models/Book')

app.post('/add-book', async (req, res) => {
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).json({
            status: 'Success',
            data: {
                book
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})




app.get('/get-book', async (req, res) => {
    const book = await Book.find({})
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                book
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})
app.get('/get-book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Book not found',
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                book,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message,
        });
    }
});




app.patch('/update-book/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updatedBook
            }
        })
    } catch (err) {
        console.log(err)
    }
})



app.delete('/delete-book/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})