const express = require("express");
const router = express.Router();
const {
  getBlogs,
  postBlog,
  getIdBlog,
  deletePost,
  updatePost,
} = require("../controllers/blog");

router.post("/", postBlog);
router.get("/", getBlogs);
router.get("/:id", getIdBlog);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
module.exports = router;
