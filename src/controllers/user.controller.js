import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
// Register user
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if ([username, email, password].some(field => !field || !field.trim())) {
		throw new ApiError(400, "All fields are required");
	}
	const existedUser = await User.findOne({ $or: [{ username }, { email }] });
	if (existedUser) throw new ApiError(409, "User with email or username already exists");
	const user = await User.create({
		username: username.toLowerCase(),
		email,
		password
	});
	const createdUser = await User.findById(user._id).select("_id username email");
	return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
	const { email, username, password } = req.body;
	if (!username && !email) throw new ApiError(400, "username or email is required");
	const user = await User.findOne({ $or: [{ username }, { email }] });
	if (!user) throw new ApiError(404, "User does not exist");
	const isPasswordValid = await user.isPasswordCorrect(password);
	if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");
	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();
	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });
	const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
	const options = { httpOnly: true, secure: true };
	return res.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully"));
});

// Logout user
export const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
	const options = { httpOnly: true, secure: true };
	return res.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User logged Out"));
});

// Refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
	if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request");
	const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
	const user = await User.findById(decodedToken?._id);
	if (!user) throw new ApiError(401, "Invalid refresh token");
	if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used");
	const accessToken = user.generateAccessToken();
	const newRefreshToken = user.generateRefreshToken();
	user.refreshToken = newRefreshToken;
	await user.save({ validateBeforeSave: false });
	const options = { httpOnly: true, secure: true };
	return res.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", newRefreshToken, options)
		.json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
});

// Change password
export const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const user = await User.findById(req.user?._id);
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
	if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");
	user.password = newPassword;
	await user.save({ validateBeforeSave: false });
	return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
	const { _id, username, email } = req.user;
	return res.status(200).json(new ApiResponse(200, { _id, username, email }, "User fetched successfully"));
});

// Update account details
export const updateAccountDetails = asyncHandler(async (req, res) => {
	const { email } = req.body;
	if (!email) throw new ApiError(400, "Email is required");
	const user = await User.findByIdAndUpdate(
		req.user?._id,
		{ $set: { email } },
		{ new: true }
	).select("_id username email");
	return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

// ...removed avatar and coverImage update logic...
