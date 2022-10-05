/*
*==============================
* Title: wolff-user.js
* Author: Patrick Wolff
* Date: 18 September 2022
* Description: Assignment 6 - NodeSecurity
*==============================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: Array }
});

module.exports = mongoose.model("User", userSchema);