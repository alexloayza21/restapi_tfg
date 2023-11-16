const app = require('./app/app');
require('./database/database');

app.listen(3001, () => {
    console.log('Servidor on');
});