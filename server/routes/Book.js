const Book = require('./model/Book')

app.post('/add-book', async(req,res) => {
    const book = new Book(req.body)
    try{
        await book.save()
        res.status(201).json({
            status: 'Success',
            data : {
                book
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})