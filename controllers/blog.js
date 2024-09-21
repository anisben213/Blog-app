const express = require("express");
const mongoose = require("mongoose");

const Post = require("../models/db");

exports.postBlog = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch {
    return res
      .status(500)
      .json({ error: "error while creating the post", details: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ Blogs: posts });
  } catch {
    return res.status(400).json({
      error: "error posts not found, please try again.",
      details: err.message,
    });
  }
};
exports.getIdBlog = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "post not found please try again.",
        details: err.message,
      });
    }
    return res.status(200).json({ blog: post });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error while searching post", details: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res
        .status(400)
        .json({ message: "post not found try again.", details: err.message });
    }
    return res.status(200).json({message:"post deleted"})
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", details: err.message });
  }
};

exports.updatePost = async (req,res) => {
  const {title,content,author}= req.body
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{title,content,author},{new:true})
    if(!updatedPost) {
      return res
      .status(400)
      .json({ message: "post not found try again.", details: err.message });
    }
    return res.status(200).json({message:"post updated"})
  } catch (err) {
    return res
    .status(500)
    .json({ message: "internal server error", details: err.message });
  }
}