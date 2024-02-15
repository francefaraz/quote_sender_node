const { Router } = require('express');
const {
  sendCustomNotification,
  getAllQuotes,
  getPageQuote,
  getRandomQuote,
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

module.exports = routes;
