/*
*==============================
* Title: wolff-person.js
* Author: Patrick Wolff
* Date: 11 September 2022
* Description: Assignment 5 - Person's API
*==============================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let roleSchema = new Schema({
    text: { type: String }
});

let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

let personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
})

module.exports = mongoose.model('Person', personSchema);