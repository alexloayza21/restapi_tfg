const app = require('./app/app');
require('./database/database');

app.listen(3000, () => {
    console.log('Servidor on');
});