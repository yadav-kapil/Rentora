const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    imageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === '' ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v 
    },
    price: { type: Number },
    location: { type: String },
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;