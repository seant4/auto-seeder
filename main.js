let request = require('request');
let cheerio = require('cheerio');
let URL = require('url-parse');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let players=[];

rl.question('Players ', (answer) => {
  // TODO: Log the answer in a database
  let players = answer.split(" ");
  console.log(players);
  crawl(players);
  rl.close();
});


function crawl(players){
console.log(players.length);
var pageToVisit = "";
for(let i = 0; i < players.length; i++){
    console.log("searching");
    pageToVisit = "https://braacket.com/league/E3B3615D-7A5C-48AE-A565-39C76858D704/player/"+players[i]+"?ranking=C470ED64-CEE4-4984-A780-747D7A15963F&player_hth=";

    request(pageToVisit, function(error, response, body) {
        if(error) {
          console.log("Error: " + error);
        }
        var $ = cheerio.load(body);
        if(response.statusCode === 200) {
          var $ = cheerio.load(body);
          searchForWord($, "");
        }
     });
}
}


function searchForWord($, word) {
    var bodyText = $('html > body').text();
    if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        let text = $('.my-dashboard-values-main').text();
        var res = text.split("\t");
        res = res[4].slice(0, res.length-32);
        for(let i = 0; i < res.length; i++){
            if(res[2]=="t"){
                res=res.slice(0, 2);
            }else if(res[2]=="d" || res[2]=="h"){
                res=res.slice(0,1);
            }
        }
        console.log(res);
      return true;
    }
    console.log("oh no");
    return false;
}
