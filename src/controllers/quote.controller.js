const axios = require('axios');
const quotes = require('../models/quote.model');
const sendNotification = require('../services/notification');

var notifyData = {
  to: '/topics/far',
  notification: {
    body: "The only way to do great work is to love what you do. 💼💛",
    title: "Today's Quote",
  },
};

// Send custom notification
const sendCustomNotification = async (req, res) => {
  const { quote, title } = req.body;

  notifyData.notification.body = quote;
  notifyData.notification.title = title;

  try {
    const requestBody = JSON.stringify(notifyData);
    const config = await {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Authorization': `key=${process.env.QUOTE_SERVER_KEY}`,
        'Content-Type': 'application/json',
      },
      data: notifyData,
    };
    console.log("config data is",config)
    await axios.request(config);
    res.status(200).json({ success: true, message: "Notification Successfully Sent" });
  } catch (error) {
    console.log("\n error message", error);
    res.status(500).json({ success: false, error: "Unable to send notification" });
  }
};

// Get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const allQuotes = await quotes.find();
    res.status(200).json(allQuotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Unable to get quotes data" });
  }
};

// Pagination
const getPageQuote = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalQuotes = await quotes.countDocuments({});
    const totalPages = Math.ceil(totalQuotes / limit);

    const quotesData = await quotes
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const quotesResponse = {
      page,
      totalPages,
      quotesData: quotesData.length > 0 ? quotesData : "noquotes",
    };

    res.json(quotesResponse);
  } catch (error) {
    console.log("error is", error);
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};

// Get a random quote
const getRandomQuote = async (req, res) => {
  try {
    const randomQuoteData = await quotes.aggregate([{ $sample: { size: 1 } }]);
    const quote = randomQuoteData[0]['quote'];
    const quoteTitle = randomQuoteData[0]['quoteTitle'];

    sendNotification(quote, quoteTitle);
    res.status(200).json(randomQuoteData);
  } catch (error) {
    console.log("error is", error);
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
};


// Controller method to handle liking a quote
const likeQuote = async (req, res) => {
  try {
      const quoteId = req.params.quoteId;
      const updatedQuote = await quotes.findByIdAndUpdate(quoteId, { $inc: { likes: 1 } }, { new: true });

      if (!updatedQuote) {
          return res.status(404).json({ error: 'Quote not found' });
      }

      res.json(updatedQuote);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to handle disliking a quote
const dislikeQuote = async (req, res) => {
  try {
      const quoteId = req.params.quoteId;
      const updatedQuote = await quotes.findByIdAndUpdate(quoteId, { $inc: { dislikes: 1 } }, { new: true });

      if (!updatedQuote) {
          return res.status(404).json({ error: 'Quote not found' });
      }

      res.json(updatedQuote);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  sendCustomNotification,
  getAllQuotes,
  getPageQuote,
  getRandomQuote,
  likeQuote,
  dislikeQuote
};
