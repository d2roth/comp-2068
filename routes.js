const express = require( 'express' );
const app = express();

// Importing the routes
const blogsRoutes = require( './routes/blogs' );
const authorsRoutes = require( './routes/authors' );
const sessionsRoutes = require( './routes/sessions' );

// Register out Page Routes with our app
app.use( '/blogs', blogsRoutes );
app.use( '/authors', authorsRoutes );
app.use( '/', sessionsRoutes );

module.exports = app;