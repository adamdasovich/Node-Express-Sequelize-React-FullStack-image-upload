const db = require('../models')

// model
const Review = db.reviews

// functions

//1. Add Review

const addReview = async (req, res) => {
	const id = req.params.id
	const { product_id, rating, description } = req.body
	try {
		const review = await Review.create({
			product_id,
			rating,
			description
		})
		res.status(200).send(review)
	} catch (error) {
		console.log(error)
	}
}

// 2. Get All Reviews
const getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.findAll({})
		res.status(200).send(reviews)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	addReview,
	getAllReviews
}