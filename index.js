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

console.log("Welcome to B-Amazon!");
connection.connect(function(err){
	if (err) throw err;
	console.log("connect as " + connection.threadId);
	start();
})

var start = function (){
	inquirer.prompt(
	{
		name: "welcome",
		type: "list",
		message: "Welcome, would you like to see our products? [YES] [NO]",
		choices: ["YES", "NO"]
	}).then(function(answer) {
		if (answer.welcome.toUpperCase() == "YES"){
			ourProducts();
		}
		else {
			console.log("Goodbye");
			return;
		}
	})
}

var ourProducts = function(){
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		console.log(res);
	})
}