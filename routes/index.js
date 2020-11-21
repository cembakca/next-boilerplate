/*
  Place routes with:
    -> a pattern
    -> and a referral to the name of the file under Next.js' pages folder
    -> might be separated into different files later
*/

// eslint-disable-next-line no-unused-vars
module.exports = function getRoutes({ server, app, path }) {
  server.get('/', (req, res) => {
    app.render(req, res, '/home', {});
  });

  server.get('/contact', (req, res) => {
    app.render(req, res, '/contact', {});
  });

  server.get('/home', (req, res) => {
    res.writeHead(301, { Location: '/' });
    res.end();
  });

  server.get(/\/movie\/.*?(tt[0-9]+)((\/)?(((\?)|((%3F)|(%3f))).*)?)$/, (req, res) => {
    const movieId = req.params['0'];
    app.render(req, res, '/movie-detail', { movieId });
  });

  server.get('/404', (req, res) => {
    res.status(404);
    app.render(req, res, '/404');
  });

  server.get('/500', (req, res) => {
    app.render(req, res, '/500');
  });

  server.get('/*', (req, res) => {
    res.status(404);
    app.render(req, res, '/404');
  });
};
