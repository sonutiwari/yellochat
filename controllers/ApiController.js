const fetch = require("node-fetch");
require("dotenv").config();
const URL = "https://bravenewcoin.p.rapidapi.com/market-cap";
class ApiController {
  fetchDataFromUrl = async (req, res) => {
    const { assetId } = req.query;
    const newUrl = `${URL}?assetId=${assetId}`;
    fetch(newUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BEARER}`,
        "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const { content } = data;
        return res.status(200).json(this._formatResponse(content[0]));
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  _formatResponse(item) {
    const assetDate = new Date(item.timestamp);
    const responseObject = {};
    responseObject["date"] = `${assetDate.getFullYear()}-${
      assetDate.getMonth() + 1
    }-${assetDate.getDay()}`;
    responseObject["time"] = assetDate.toISOString().substr(11, 8);
    responseObject["price"] = Number(item.price).toFixed(2);
    return responseObject;
  }
}

module.exports = ApiController;
