const http = require('http')

module.exports = function (app) {
    app.set('port', process.env.PORT || 3000);
    app.set('host', process.env.HOST || '0.0.0.0');
    const server = http.createServer(app)
    return server
}