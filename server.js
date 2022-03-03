const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening to port 3000"));
app.use(express.static('client'));

const mongoose = require('mongoose');
const Stock = require("./Stock");
mongoose.connect("mongodb://localhost/testdb");

const Alpaca = require('@alpacahq/alpaca-trade-api');
const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.SECRET_API_KEY,
  paper: true,
});

app.get('/search/:ticker', async (request, response) => {

  const data = await alpaca.getBarsV2(
    request.params.ticker,
    {
      start: "2021-01-01",
      end: "2022-01-01",
      timeframe: "1Day",
      adjustment: "all",
    },
    alpaca.configuration,
  );
  const dailyPrice = [];
  for await (const b of data) {
    dailyPrice.push(b);
  }

  await dailyPrice.forEach(n => {

    const stock = Stock.create({

      ticker: request.params.ticker,
      time: n.Timestamp,
      open: n.OpenPrice,
      close: n.ClosePrice,
      low: n.LowPrice,
      high: n.HighPrice,
      volume: n.Volume,
      vwap: n.VWAP,
    });
  });

  response.json(await Stock.find({ ticker: "AMD"}));
  //response.json(dailyPrice);
});

// dbRun();
// async function dbRun() {
//   try{
//     const stock = await Stock.create({

//       ticker: dumbData.ticker,
//       time: dumbData.time,
//       open: dumbData.open,
//       close: dumbData.close,
//       low: dumbData.low,
//       high: dumbData.high,
//       volume: dumbData.volume,
//       vwap: dumbData.vwap,
//     });
//     console.log(stock);
//   }
//   catch (error) {
//     console.log(error.message);
//   }
// }

// async function dbRun() {
//   try{
//     const stock = await Stock.find({ ticker: "AMD"});
//     console.log(stock);
//   }
//   catch (error) {
//     console.log(error.message);
//   }
// }