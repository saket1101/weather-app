const express = require('express')
const app = express()
const port = 3000
const https = require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendfile(__dirname + "/index.html")

})
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "8195d85b936211a20e0bef51a68706ef"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      //const imageURL = "https://openweathermap.org/ig/wn/" + icon + "@2x.png "
      res.write("<p>The weather is currently " + weatherDescription + " </p>")
      res.write("<h1> The temperature in " + query + "  is " + temp + " degree celcius </h1>")
      //res.write("<img src=" + imageURL + ">");
      res.send()

    })

  })


})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})