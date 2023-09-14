const { Router } = require('express');
const {
  sendCustomNotification,
  getAllQuotes,
  getPageQuote,
  getRandomQuote,
} = require('../controllers/quotes.controller');
const { isAuthorized } = require('../middlewares/auth');

const routes = new Router();

// Send custom notification
routes.post('/sendcustomnotify', isAuthorized, sendCustomNotification);

// Get all quotes
routes.get('/getallquotes', isAuthorized, getAllQuotes);

// Pagination
routes.get('/pagequote', isAuthorized, getPageQuote);

// Get a random quote
routes.get('/getrandomquote', isAuthorized, getRandomQuote);

module.exports = routes;
