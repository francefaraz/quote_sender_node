const { Router } = require('express');
const {
  sendCustomNotification,
  getAllQuotes,
  getPageQuote,
  getRandomQuote,
  dislikeQuote,
  likeQuote,
  addQuote
} = require('../controllers/quote.controller');
const { isAuthorized } = require('../middlewares/auth');

const routes = new Router();

// Send custom notification
routes.post('/sendcustomnotify', isAuthorized, sendCustomNotification);
routes.post('/sendquotetomobile', sendCustomNotification);

// Get all quotes
routes.get('/getallquotes', isAuthorized, getAllQuotes);

// Pagination
routes.get('/pagequote', isAuthorized, getPageQuote);

// Get a random quote
routes.get('/getrandomquote', isAuthorized, getRandomQuote);

routes.get('/getquote',getRandomQuote)

routes.put('/:quoteId/like', likeQuote);
routes.put('/:quoteId/dislike',dislikeQuote);

routes.post('/addquote',addQuote);
module.exports = routes;
