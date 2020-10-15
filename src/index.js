const App = require('./server');


(async () => {
    const server = new App();
    await server.init();
    server.express.listen(5000);
})()