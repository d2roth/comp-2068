const express = require( 'express' );
const app = express();

// Import Page routes
const pageRoutes = require( './routes/pages' );
const blogsRoutes = require( './routes/blogs' );
const authorsRoutes = require( './routes/authors' );
const sessionsRoutes = require( './routes/sessions' );

// Register out Page Routes with our app
app.use( '/', pageRoutes );
app.use( '/blogs', blogsRoutes );
app.use( '/authors', authorsRoutes );
app.use( '/', sessionsRoutes );

module.exports = app;