const fetch = require("node-fetch");
const URL = "https://bravenewcoin.p.rapidapi.com/market-cap";
class ApiController {
  fetchDataFromUrl = async (req, res) => {
    const { assetId } = req.query;
    const newUrl = `${URL}?assetId=${assetId}`;
    fetch(newUrl, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EVXhNRGhHT0VReE56STVOelJCTTBJM1FrUTVOa0l4TWtRd1FrSTJSalJFTVRaR1F6QTBOZyJ9.eyJpc3MiOiJodHRwczovL2F1dGguYnJhdmVuZXdjb2luLmNvbS8iLCJzdWIiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGkuYnJhdmVuZXdjb2luLmNvbSIsImlhdCI6MTYwMzc5NDAxNywiZXhwIjoxNjAzODgwNDE3LCJhenAiOiJvQ2RRb1pvSTk2RVJFOUhZM3NRN0ptYkFDZkJmNTVSWSIsInNjb3BlIjoicmVhZDppbmRleC10aWNrZXIgcmVhZDpyYW5raW5nIHJlYWQ6bXdhIHJlYWQ6Z3dhIHJlYWQ6YWdncmVnYXRlcyByZWFkOm1hcmtldCByZWFkOmFzc2V0IHJlYWQ6b2hsY3YgcmVhZDptYXJrZXQtY2FwIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.uAEiViTmEmQ4KoscUy197ErpgvM4dHP4MAhke9dONXCcMY_f5pSoqYjAEnv6fthLsz9blTlxmvgNVdF5uNA7iqNiBUCrwW391kEA44FFroLajxdOxeBOnxzRZYqt6SDHx-j2dICzACM4oV-84l2V3socEvVNqpmKQo2Gp9YZaQ31aYGfKnAigUuHyk5lIwaOH8iJ-2JgWChqG0BDZx_kVXWD58UIsXmyFtvnyJdcVjPQSLaNY94T8HIlMU4F5igRwdRTG3Ke1CWTJlH4cLZOXhromGwarw5VZyk8jtciVoA_oHM7IDXv8SwhiNiKnmwt4lS7codoQuO4a1lM_tvmdg",
        "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
        "x-rapidapi-key": "bb3d0cb62cmsh72b5b1b3772b0bfp11bf9bjsn6162a034aaf7",
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
