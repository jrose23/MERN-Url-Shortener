require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const linkRoutes = require('./routes/linkRoutes');
const port = process.env.PORT || 5000;

// EXPRESS APP INIT
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method}\t${req.path}\t${new Date().toLocaleString()}`);
    next();
});

// ROUTES
app.use('/api/links/', linkRoutes);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

// CONNECT TO DB & LISTEN FOR REQUESTS
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log('\n✨ CONNECTED TO DATABASE...');
            console.log(`🚀 BACKEND SERVER RUNNING ON PORT ${port}...\n`);
        });
    })
    .catch(error => console.log(error));
