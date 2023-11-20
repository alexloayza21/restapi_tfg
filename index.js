const app = require('./app/app');
require('./database/database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0/0", () => {
    console.log(`Servidor on ${PORT}`);
});