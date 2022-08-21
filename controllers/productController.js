const db = require('../models')
const multer = require('multer')
const path = require('path');

// create main Model
const Product = db.products
const Review = db.reviews

// main work

// 1. create product

const addProduct = async (req, res) => {
	const { title, price, description } = req.body
	try {
		const product = await Product.create({
			image: req.file.path,
			title,
			price,
			description,
			published: req.body.published ? req.body.published : false
		})
			.then((product) => {
				const res = {
					success: true,
					message: 'Product created successfully',
					product
				}
				return res
			}).catch((error) => {
				const res = {
					success: false,
					message: 'Product not created',
					error
				}
				return res
			})
		res.json(product)
	} catch (error) {
		console.log(error)
	}
}

// 2. get all products
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.findAll({})
			.then((products) => {
				const res = {
					success: true,
					products: products
				}
				return res
			})
			.catch((error) => {
				const res = {
					success: false,
					error: error
				}
				return res
			})
		res.json(products)
	} catch (error) {
		console.log(error)
	}
}

// 3. get single product
const getOneProduct = async (req, res) => {
	let id = req.params.id
	try {
		let product = await Product.findOne({ where: { id: id } })
		res.status(200).send(product)
	} catch (error) {
		console.log(error)
	}
}

// 4. update Product
const updateProduct = async (req, res) => {
	const id = req.params.id
	try {
		const product = await Product.update(req.body, { where: { id: id } })
		res.status(200).send(product)
	} catch (error) {
		console.log(error)
	}
}

// 5. delete product by id
const deleteProduct = async (req, res) => {
	let id = req.params.id
	try {
		await Product.destroy({ where: { id: id } })

		res.status(200).send('Product is deleted !')
	} catch (error) {
		console.log(error)
	}
}

// 6. get published products
const getPublishedProducts = async (req, res) => {
	try {
		const products = await Product.findAll({ where: { published: true } })
		res.status(200).send(products)
	} catch (error) {
		console.log(error)
	}
}

// 7. connect one to many relationship products and reviews
const getProductReviews = async (req, res) => {
	const { id } = req.params
	const data = await Product.findOne({
		include: [{
			model: Review,
			as: 'review'
		}],
		where: { id }
	})
	res.status(200).send(data)
}

// 8. upload image controller
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'Images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage,
	limits: { fileSize: '1000000' },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|gif/
		const mimeType = fileTypes.test(file.mimetype)
		const extname = fileTypes.test(path.extname(file.originalname))

		if (mimeType && extname) {
			return cb(null, true)
		}
		cb('Give proper files formate to upload')
	}
}).single('image')

module.exports = {
	addProduct,
	getAllProducts,
	getOneProduct,
	updateProduct,
	deleteProduct,
	getPublishedProducts,
	getProductReviews,
	upload
}
