/*
*==============================
* Title: wolff-customer.js
* Author: Patrick Wolff
* Date: 25 September 2022
* Description: Assignment 7 - NodeShopper
*==============================
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number},
    quantity: { type: Number }
});

let invoice = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
});

module.exports = mongoose.model("Customer", customerSchema);