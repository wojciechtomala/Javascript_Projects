const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

// ALL AUTHORS ROUTE:
router.get('/', async (req, res) =>{
    try {
        let searchOptions = {};
        if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i');
        }

        const authors = await Author.find(searchOptions);
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// NEW AUTHOR ROUTE:
router.get('/new', (req, res) =>{
    res.render('authors/new', {author: new Author()});
});

// CREATE AUTHOR ROUTE:
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        const newAuthor = await author.save();
        res.redirect(`authors/${newAuthor.id}`);
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id)
      const books = await Book.find({ author: author.id }).limit(6).exec()
      res.render('authors/show', {
        author: author,
        booksByAuthor: books
      })
    } catch {
      res.redirect('/')
    }
  })

router.get('/:id/edit', async (req, res) =>{
    try{
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', {author: author});
    }
    catch{
        res.redirect('/authors');
    }
});

router.put('/:id', async (req, res) =>{
    let author;
    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch (err) {
        if(author == null){
            res.redirect('/');
        }else{
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            });
        }
    }
});
router.delete("/:id", async (req, res) => {
    let author;
    try {
      author = await Author.findById(req.params.id);
      console.log(author);
      await author.deleteOne();
      console.log("author deleted");
      res.redirect("/authors");
    } catch {
      if (author == null) {
        console.log("author not found");
        res.redirect("/");
      } else {
        console.log("can't delete author");
        res.redirect(`/authors/${author.id}`);
      }
    }
  });

module.exports = router;