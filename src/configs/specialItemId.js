const dotenv = require('dotenv');

dotenv.config();

const specialItemId = process.env.SPECIAL_ITEM_ID;

module.exports = isNaN(specialItemId) ? null : Number(specialItemId);
