const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({

  ticker: {
    type: String,
    uppercase: true,
  },
  time: {
    type: String,
  },
  open: {
    type: Number,
    min: 0,
  },
  close:  {
    type: Number,
    min: 0,
  },
  low:  {
    type: Number,
    min: 0,
  },
  high:  {
    type: Number,
    min: 0,
  },
  volume:  {
    type: Number,
    min: 0,
  },
  vwap:  {
    type: Number,
    min: 0,
  },
});

module.exports = mongoose.model("Stock", stockSchema);