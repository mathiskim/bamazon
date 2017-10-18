var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");
var rArray = [];
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
    }
});

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
		//  console.log(item);
		  console.log(numberDesired);
		  connection.query('select stock_quantity,  price from products where item_id =?',[answers.userItem], function(error, rows){
				if (error){
					console.log(error);
				} else {
						//			rArray = JSON.parse(rows);

				rArray = JSON.stringify(rows);
				 console.log("rArray " + JSON.stringify(rArray[0]));  
				 console.log(rArray[0].stock_quantity);
				 		 console.log(rArray[0]);
						 
				 console.log("rows " + rows);
				  
				}
			});
		});	 
};	
	/* 	  inquirer.prompt([{
			type: "input",
			name: "userChoice",
			message: "What is the product name?",
		  }]).then(function (answers) {
			var total = 0;
			var item = answers.
			connection.query('update products set stock_quantity = if(stock_quantity > 0, stock_quantity-1, stock_quantity) where product_name = ?',
			 [answers.userChoice], function(error, results){
				if (error) {
				  console.log("Out of stock");
			  }
				else{
				  connection.query('select price from products where product_name=?', [answers.userChoice], function(err, results){
				  console.log("You have purchased " + answers.userChoice + "! " + results);
				})
			  }
			  })
			  connection.end();
		  });
	   */
	