var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var pinyin = require('pinyin');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

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
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/site/admin.html');
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
		var sql = 'insert into address set ?';
		con.query(sql, {
			name: ''
		}, function(err, r) {
			if(!err) {
				res.json({
					id: r.insertId
				});
			}
		});
	})
	.put('/user', function(req, res) {
		if(req.body.name) {
			var name = req.body.name;
			var o = pinyin(name, {
				style: pinyin.STYLE_NORMAL
			}).join(' ');
			var sql = 'update address set name=?,pinyin=? where id =?';
			con.query(sql, [name, o, req.body.id], function(err, r) {
				if(!err) {
					res.json(r.name);
				}
			})
		} else if(req.body.phone) {
			var sql = 'update address set phone=? where id=?';
			con.query(sql, [req.body.phone, req.body.id], function(err, r) {
				if(!err) {
					res.json(r.phone);
				}
			})
		}
	})
	.delete('/user', function(req, res) {
		console.log(req.body.id);
		var sql = 'delete from address where id=?';
		con.query(sql, [req.body.id], function(err, r) {
			if(!err) {
				res.json({
					state: 'ok'
				});
			}
		});
	})