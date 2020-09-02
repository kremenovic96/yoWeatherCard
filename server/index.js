const app = require('./app');
const http = require('http');
const server = http.createServer(app);


const moment = require('moment');
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    const d = new Date(moment().add(2, 'days').toDate());
    // console.log(d > new Date());
    // console.log(moment().add(2, 'days').diff(moment(), 'h'));
    console.log(moment().diff(moment(new Date("2020-09-02T09:00:00Z")), 'h'));
    console.log(new Date("2020-09-02T09:00:00Z").toUTCString(), moment().toDate().toUTCString());
});