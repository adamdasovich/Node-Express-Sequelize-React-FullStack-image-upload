// import controllers review, products
const productController = require('../controllers/productController.js')
const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()

// use routers
router.post('/addProduct', productController.upload, productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/published', productController.getPublishedProducts)

// review urls and controllers
router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview', reviewController.addReview)

// get product reviews
router.get('/productReviews/:id', productController.getProductReviews)


// Products router
router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router