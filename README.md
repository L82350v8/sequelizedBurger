# sequelizedBurger is "Eat Da Burger" modified to use Sequelize.js. 
Eat Da Burger is a full stack web app that enables customers to order burgers and devour them. This application uses the Sequelize.js library for all SQL queries, inserts, updates and delete actions. 
All burgers entered and devoured are stored in a mySQL database until they are deleted by a user.  

##Setup Instructions:
This application uses several JavaScript npm packages to interact with the JavaScript runtime environment.

To install these npm packages: Open your Command Prompt terminal and navigate to your cloned project folder. Run the 'npm install' command to add the required npm packages.

Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.
```
node modules
```
Be sure to run your database schema file before executing the server.js node application. 
This will create the sequelize_burgers_db database. Sequelize.js will perform all other SQL functions for the application. 

This project is useful because it gave the developer more experience with setting up full stack file structures, modular programming design, exporting/requiring modules, defining server html/api routes, using jquery and ajax, using Sequelize.js to perform all of the interactions with the mySQL database, and using a html view template (Handlebars.js).     

Currently, only the original developer maintains and contributes to this project.
