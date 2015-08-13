Update from Angular Fullstack Latest
====================================

# Create directory
	> mkdir yo-worktajm
	> cd yo-worktajm

# Generate project

	> yo angular-fullstack worktajm
	Use the following choices:

	## Client

		? What would you like to write scripts with? JavaScript
		? Would you like to use Javascript ES6 in your client by preprocessing it with Babel? Yes
		? What would you like to write markup with? Jade
		? What would you like to write stylesheets with? Sass
		? What Angular router would you like to use? uiRouter
		? Would you like to include Bootstrap? Yes
		? Would you like to include UI Bootstrap? Yes

	## Server

		? Would you like to use mongoDB with Mongoose for data modeling? Yes
		? Would you scaffold out an authentication boilerplate? Yes
		? Would you like to include additional oAuth strategies? Google, Facebook, Twitter
		? Would you like to use socket.io? Yes

# Generate the endpoints
	
	## Customer
	> yo angular-fullstack:endpoint customer
	Use defaults

	## Project
	> yo angular-fullstack:endpoint project

	## Time Entries
	> yo angular-fullstack:endpoint timeentry

# 
