const express = require( `express` );

const app = express();

app.get('/', (req, res) => {
  res.send( `Hey 'dare world!`);
});

app.get('/about', (req, res) => {
  res.send('I like biking by the beach');
});


app.listen( 4000, () => console.log( 'Listening on 4000') );