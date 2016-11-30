var express = require("express");
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'user'
})
con.connect();

app.listen(3000, function() {
	console.log('服务器在3000端口启动');
});
app.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/site/index.html');
});
app.use(express.static(__dirname + '/site/public'));

////////////////////////从后台获取数据
app
	.get('/user', function(req, res) {
		var sql = 'select * from address';
		con.query(sql, function(err, rows) {
			console.log(rows)
			res.json(rows);
		});
	})
	.post('/user', function(req, res) {

	})
	.put('/user', function(req, res) {

	})
	.delete('/user', function(req, res) {

	})