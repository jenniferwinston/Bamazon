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
//connect to sql and start the products
connection.connect(function(err){
	if (err) throw err;
	console.log("connect as " + connection.threadId);
	start();
})

// start promopting
var start = function (){
	inquirer.prompt(
	{
		name: "welcome",
		type: "list",
		message: "Welcome, would you like to shop our products?",
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
};


var ourProducts = function (){
connection.query('SELECT * FROM products', function(err, res) {
    for (var i = 0; i < res.length; i++) {
    	//diplay products offered
        console.log(res[i].itemID + " | " + res[i].productName + " | " + res[i].departmentName + " | " + "$" + res[i].price);
    }
    console.log("-----------------------------------");
    // asks the next question ater 3 seconds
    setTimeout(function() {nextAsk();}, 3000);
})
};

// prompt next questions to find out what customer wants
var nextAsk = function (){
	inquirer.prompt([
	{
		name: "productid",
		type: "list",
		message: "Choose the ID of the product you wish to purchase:",
		choices: ["1", "2", "3", "4", "5", "6", "7"]
	},	
	{
		name: "productunits",
		type: "input",
		message: "How many units of this product would you like to puchase?",
		validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
	}]).then(function(answer) {
			checkQuantity(answer);
	})
};

// compare product units wanted vs available products
var checkQuantity = function(answer) {
	console.log("Checking my stock");
	var query = 'SELECT stockQuantity, price FROM products WHERE itemID =?';
	var params = answer.productid;

		connection.query(query, params, function(err, res) {
			if ( res[0].stockQuantity < answer.productunits) {
				console.log("Insufficient quantity");
				nextAsk(1);
			}
			else {
				// calculate the total by pulling the price and multiple by product wanted	
				var total = answer.productunits * res[0].price;
				var newQuantity = res[0].stockQuantity-answer.quantity;
				
				console.log("Total Cost: $" + total);

				connection.query("UPDATE products SET stockQuantity= " + newQuantity + "WHERE itemID = " + answer.productunits, function (err, res) {
				console.log(res[0].stockQuantity + " " + newQuantity);
				console.log("Thanks for shopping");
				})
		}

	});
}


	

	// 	setTimeout(function(){
	// 			console.log("Thanks for shopping with us!");
	// 			process.exit();
	// 		},3000);
	// })
	// connection.end();






