import express from "express"
import {
  getAllCategory, 
  getCategory, 
  createCategory, 
  deleteCategory, 
  getCategoriesWithManySubcategories,
  getCategoriesWithSubcategories } from "../controller/category.controller.js"

const router = express.Router()

router.route('/subcategory-count').get(getCategoriesWithManySubcategories)
router.route('/subcategory-with-category').get(getCategoriesWithSubcategories)
router.route('/').get(getAllCategory).post(createCategory)
router.route('/:id').get(getCategory).delete(deleteCategory)


export default router