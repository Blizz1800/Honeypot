const fs = require('fs')
const https = require('https')
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const privateKey = fs.readFileSync('keys/private.key', 'utf8');
const certificate = fs.readFileSync('keys/certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const verifyToken = (req, res, next) => {
	const tk = req.headers.authorization;
	console.log(req.headers)
	if (!tk)
		return res.status(404).send('Not Found');
	jwt.verify(tk, 'FLAG_FOUND', (err, decoded) => {
		if (err)
			return res.status(403).send("Khe jaze miloko??")
		req.user = decoded
		next()
	})
}

app.get('/success', verifyToken, (req, res) => {
        res.send("Congratulations :D");
});

app.get('/', (req, res) => {
	console.log(jwt.sign('blizz','FLAG_FOUND'))
	res.send("<span>Go to <a href='/success'>flag</a></span>");
});


httpsServer.listen(8443);
app.listen(8000);
