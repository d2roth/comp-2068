const express = require( 'express' );
const path = require( 'path' );

const app = express();

// Our views path
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );


// Our Routes
const routes = require( './routes.js' );
app.use( '/', routes );

const port = (process.env.PORT || 4000);
app.listen( port, () => console.log( `Listening on ${port}`) );