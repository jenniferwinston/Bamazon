//nmp connection packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// connection to mysql
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: '',
	database: "bamazon"
})

console.log("wokring");
connection.connect(function(err){
	if (err) throw err;
	console.log("connect as " + connection.threadId);
	
})