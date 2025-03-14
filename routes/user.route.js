import express from "express"
import {getDataUser, getUser} from "../controller/user.controller.js"

const router = express.Router()

router.get("/", getDataUser)
router.get("/:id", getUser)
  
export default router