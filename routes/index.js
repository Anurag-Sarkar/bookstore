var express = require("express");
var router = express.Router();

const BookCollection = require("../models/bookSchema");

router.get("/", function (req, res, next) {
  res.render("home");
});


router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/create-book", function (req, res, next) {
  res.render("createbook");
});

router.post("/create-book", async function (req, res, next) {
  try {
    const newBook = await new BookCollection(req.body)
    await newBook.save();
    res.redirect("/library");
  } catch (error) {
    res.send(error);
  }
});
router.get("/library", async function (req, res, next) {
    const saareBooks = await BookCollection.find({})
    console.log(saareBooks)
    res.render("library",{books:saareBooks});
});

router.get("/details/:id", async function (req, res, next) {
    const bookID = req.params.id
    const book = await BookCollection.findById(bookID)
    res.render("detailsbook",{book:book});
});

router.get("/update-book/:id", async function (req, res, next) {
  const bookID = req.params.id
  const book = await BookCollection.findById(bookID)
  console.log(book)
  res.render("updatebook",{book:book});
});


router.post("/update-book/:id", async function (req, res, next) {
  const bookID = req.params.id
  const updateBook = await BookCollection.findByIdAndUpdate(bookID,req.body) 
  return res.redirect(`/details/${bookID}`)
});


router.get("/delete-book/:id", async function (req, res, next) {
  const bookID = req.params.id
  const updateBook = await BookCollection.findByIdAndDelete(bookID) 
  return res.redirect(`/library`)
});



module.exports = router;

