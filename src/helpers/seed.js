const dbConnection = require('../configs/db');
const Quote = require('../models/quote.model');
const fs = require('fs');
const path = require('path'); // Import the path module

// Get the absolute path of quotes.json using __dirname
const quotesJsonPath = path.join(__dirname, 'quotes.json');
const quotesJson = fs.readFileSync(quotesJsonPath, 'utf8');
// const quotesJson = fs.readFileSync('./quotes.json', 'utf8');
const seedQuotes = JSON.parse(quotesJson);

const seedDb = async () => {
  try {
    await Quote.deleteMany({});
    const result = await Quote.insertMany(seedQuotes);
    console.log(`${result.length} quotes inserted successfully`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDb()
  .then(async () => {
    console.log("Successfully seeded");
    await dbConnection.connection.close();
    console.log("CONNECTION CLOSED");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  });