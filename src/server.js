const dotenv = require('dotenv');
const app = require('./App');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.init(PORT, (err) => {
  if (err) return;
  console.log(`App running at ${PORT}`);
});
