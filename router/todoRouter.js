const express = require(`express`)
const{ createContent, getOne, getAllContent, updateContent, deleteContent }=require("../controller/todoController")
const { authenticate } = require("../middleware/auth")
const router = express.Router()

router.post(`/create-content`,authenticate, createContent )
router.get(`/getone/:todoId`, authenticate, getOne)
router.get(`/getallcontent`, authenticate, getAllContent)
router.put(`/update-content/:todoId`, authenticate,updateContent )
router.delete(`/delete-content/:todoId`, authenticate, deleteContent)

module.exports = router

// router.post(`/create-content`,authenticate, createContent )
// router.get(`/getone/:todoId`, authenticate,getOne)
// router.get(`/getallcontent`, authenticate, getAllContent)
// router.put(`/update-content/:todoId`, authenticate, updateContent)
// router.delete(`/delete-content/:todoId`, authenticate, deleteContent)