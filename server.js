const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src', 'public')));


// Landing page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
