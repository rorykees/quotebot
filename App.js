require('dotenv').config()
const {TwitterClient} = require('twitter-api-client')
const {quotes} = require("./quotes")

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var quoteWithCitation = quotes[Math.floor(Math.random()*quotes.length)]
var quote = quoteWithCitation.split("|")[0]
var citation = "@quotebot9000 " + quoteWithCitation.split("|")[1]

twitterClient.tweets.statusesUpdate({
  status: quote
}).then (response => {
  console.log(response)      
  twitterClient.tweets.statusesUpdate({
          status: citation,
          in_reply_to_status_id: response.id_str,
          in_reply_to_status_id_str: response.id_str
        }).then(replyResponse => {
          console.log(replyResponse)
    }).catch(err => {
        console.error(err)
    })
});

    

  
