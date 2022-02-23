const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.SECRET_API_KEY,
  paper: true,
});

async function spyData() {

  const data = await alpaca.getBarsV2(
    'SPY',
    {
      start: "2021-01-01",
      end: "2022-01-01",
      timeframe: "1Day",
      adjustment: "all",
    },
    alpaca.configuration
  );
  const bars = [];

  for await (const b of data) {

    console.log(b);
  }
}

spyData();