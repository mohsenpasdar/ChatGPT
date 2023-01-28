const Openai = require("openai");
const { Configuration, OpenAIApi } = Openai;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

const configuration = new Configuration({
  organization: "org-DjLRrWHNIGqYuxXQLaBmviVe",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are Steve Jobs. Answer with motivational content.
      Steve: How can I help you?
      Person: I want some motivation.
      Steve: You are amazing, you can create any type of business you want.
      Person: ${message}
      Steve:
    `,
    max_tokens: 100,
    temperature: 0,
  });

  // console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`listening to port ${port}!`);
});
