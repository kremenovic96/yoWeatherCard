const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const config = require('./utils/config');
const moment = require('moment')

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    console.log(moment(new Date()).get('d'));
    
});