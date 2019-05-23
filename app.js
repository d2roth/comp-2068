const express = require( `express` );

const app = express();

app.get('/', (req, res) => {
  res.send( `Hey 'dare world!`);
});

app.get('/about', (req, res) => {
  res.send('I like biking by the beach');
});

const port = (process.env.PORT || 4000);
app.listen( port, () => console.log( `Listening on ${port}`) );