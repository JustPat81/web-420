/*
*==============================
* Title: wolff-teams.js
* Author: Patrick Wolff
* Date: 09 October 2022
* Description: Assignment 9 - Capstone
*==============================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// teamSchema
let teamSchema = new Schema({
    name: { type: String, required: true },
    mascot: { type: String, required: true },
    players: [playerSchema],
});

// playerSchema
let playerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salary: { type: Number, required: true },
});

module.exports = mongoose.model("Team", teamSchema);