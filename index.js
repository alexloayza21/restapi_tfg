const app = require('./app/app');
require('./database/database');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor on ${PORT}`);
});