import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) throw new ApiError(400, "Title is required");

  const task = await Task.create({
    title,
    description,
    dueDate,
    createdBy: req.user._id
  });

  res.status(201).json(new ApiResponse(201, task, "Task created"));
});

// Get All Tasks (for logged-in user)
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id });
  res.json(new ApiResponse(200, tasks, "Tasks fetched"));
});

// Get Single Task
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, task, "Task fetched"));
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, task, "Task updated"));
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, {}, "Task deleted"));
});
