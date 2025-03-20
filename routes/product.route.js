import express from 'express'

import { getAllProduct, createProduct, getProduct } from '../controller/product.controller.js'

const router = express.Router()

router.route('/').get(getAllProduct).post(createProduct)
router.route('/:id').get(getProduct)


export default router