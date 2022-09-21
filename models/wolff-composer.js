/*
============================================
; Title:  wolff-composer.js
; Author: Patrick Wolff
; Date:   04 September 2022
; Description: Composer Model
;===========================================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema for composer
let composerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

// Export Composer model
module.exports = mongoose.model("Composer", composerSchema);