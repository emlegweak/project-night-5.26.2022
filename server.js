const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (page == '/api') {
        if ('student' in params) {
            if (params['student'] == 'rock' || params['student'] == 'paper' || params['student'] == 'scissors') {
                let compChoice = rockPaperScissors()
                let result = checkWin(params['student'], compChoice)

                res.writeHead(200, { 'Content-Type': 'application/json' });
                const objToJson = {
                    Your_Choice: params['student'],
                    CPU_Choice: compChoice,
                    result: result
                }
                res.end(JSON.stringify(objToJson));
            }
            else if (params['student'] !== 'rock' || params['student'] !== 'paper' || params['student'] !=='scissors') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const objToJson = {
                    Your_Choice: "unknown",
                    CPU_Choice: "unknown",
                    result: 'unknown'
                }
                res.end(JSON.stringify(objToJson));
            }
        }
    }
    else if (page == '/style.css') {
        fs.readFile('style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/main.js') {
        fs.readFile('main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    } else {
        figlet('404!!', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);


function rockPaperScissors() {
    let result = Math.ceil(Math.random() * 3)
    if (result == 1) {
        return 'rock'
    } else if (result == 2) {
        return 'paper'
    } else {
        return "scissors"
    }

}
    function checkWin(playerChoice, botChoice) {
        if ((playerChoice === 'rock' && botChoice === 'scissors') || (playerChoice === 'paper' && botChoice === 'rock') || (playerChoice === 'scissors' && botChoice === 'paper')) {
            return ('You Win!')
        } else if (playerChoice === botChoice) {
            return ('You Tied')
        } else {
            return ('You Lose')
        }
    }

    