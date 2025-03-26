import express from "express"
import {
  getAllCategory, 
  getCategory, 
  createCategory, 
  deleteCategory, 
  getCategoriesWithManySubcategories,
  getCategoriesWithSubcategories,
  editCategory } from "../controller/category.controller.js"

const router = express.Router()

router.route('/subcategory-count').get(getCategoriesWithManySubcategories)
router.route('/subcategory-with-category').get(getCategoriesWithSubcategories)
router.route('/').get(getAllCategory).post(createCategory).put(editCategory)
router.route('/:id').get(getCategory).delete(deleteCategory)


export default router