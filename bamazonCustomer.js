var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");
var rArray = [];
var newQuantity = 0;
var connection = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "1002",
	database: "bamazon"
});


connection.query('select * from products', function(error, results){
	if (error){
			console.log(error);
		} else {
			console.table(results);	  
			buyItem();
    } // end of else
});  // end of query

function buyItem(){

	inquirer.prompt([{
		type: "input",
		name: "userItem",
		message: "Perhaps you would like to purchase an item from the list above?  \nWhich item would you like to purchase?" 		
	  },
	  {
      type: "input",
      message: "Excellent choice!  How many would you like?",
      name: "userCount"
      }
	  ]).then(function (answers) {
		  var item = answers.userItem;
		  var numberDesired = answers.userCount;
		  var price = 0; 
		  connection.query('select stock_quantity,  price, product_name from products where item_id =?',[answers.userItem], function(error, rows){
				if (error){
						console.log(error);
					} else {						
						//console.log(JSON.stringify(rows, null, 4));
						var availableQuantity = (rows[0].stock_quantity);
						var orderAmount = (rows[0].price) * numberDesired;				
						var itemName = (rows[0].product_name);
						newQuantity = availableQuantity - numberDesired;
						var userItemID = answers.userItem;
						var moneyFormat = orderAmount.toLocaleString('en-US', {minimumFractionDigits: 2}); 
						var sql = "update products set stock_quantity = " + newQuantity + " where item_id = " +  userItemID;
						if ( newQuantity>= 0){
							var orderPrice = numberDesired * orderAmount;
							console.log("Congratulations!!  For " + moneyFormat + ", you are the owner of " + numberDesired + " " + itemName + "!");	
							connection.query(sql,function(error, rows){
								if (error){
									console.log(error);
								}  else {
										connection.end();
								}	  
							});  // end of 2nd connection.query
					} else {
						console.log("I'm sorry. We don't seem to have that many in stock. \nTry another item or a smaller quantity.");
						buyItem();
					}  //end of else
						
			}  // end of first "else"
		});	 // end of first connection.query 
	});  // end of inquirer

};	
	