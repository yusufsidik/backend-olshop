import express from 'express'

import { getAllBrand, createBrand, deleteBrand } from '../controller/brand.controller.js'

const router = express.Router()


router.get("/", getAllBrand)
router.post("/", createBrand)
router.delete("/:id", deleteBrand)


export default router