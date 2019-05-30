const express = require( 'express' );
const app = express();

// Import Page routes
const pageRoutes = require( './routes/pages.js' );

// Register out Page Routes with our app
app.use( '/', pageRoutes );

module.exports = app;