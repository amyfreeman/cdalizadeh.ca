const express = require('express');

const app = express();

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('<h1>cdalizadeh in tha house</h1>');
});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}