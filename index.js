const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('docs'))

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}