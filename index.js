const app = require('./app/app');
require('./database/database');

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log(`Servidor on ${app.get('port')}`);
});