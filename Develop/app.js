const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeArr = [];

const employeeInfo = () => {

inquirer.prompt([

    { //Role
        type: "list",
        name: "role",
        message:"What is the employee's job title?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"]
    },
    
    { //Name
        type: "input",
        name: "name",
        message:"Please enter employee's full name."
    },

    { //ID Number
        type: "input",
        name: "id",
        message:"What is the employee's ID number?"
    },

    { //Email
        type: "input",
        name: "email",
        message:"Please enter employee's email address."
    },
    
    

])
.then(mainAnswers => {
            const { role } = mainAnswers;

            //SWITCH - evaluates an expression, matching the expression's value to a case clause, and executes 
            //          statements associated with that case, as well as statements in cases that follow the matching case.
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

            //BREAK - terminates the current switch statement and transfers program control 
            //          to the statement following the terminated statement.
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break

        switch(role) {

            //Manager Office Number
            case "Manager":
                roleSpecific(role, "officeNumber", "What is the Manager's office number?", mainAnswers);
            break;

            //Engineer Github
            case "Engineer":
                roleSpecific(role, "github", "What is the Engineer's Github profile username?", mainAnswers);
            break;

            //Intern School
            case "Intern":
                roleSpecific(role, "school", "Where does the Intern go to school?", mainAnswers);
            break;
        }
    });
}
    //Questions for specific roles.
const roleSpecific = (role, inputType, message, mainAnswers) => {
        inquirer.prompt ([
                {
                    type: "input",
                    name: inputType,
                    message: message
                }
            ])

        .then(answers => {
            let answer;

            for (let key in answers) {
                answer = answers[key];
            }
            const { name, id, email } = mainAnswers;
            let employee;
            
            switch(role) {
                case "Manager":
                    employee = new Manager(name, id, email, answer);
                break;

                case "Engineer":
                    employee = new Engineer(name, id, email, answer);
                break;

                case "Intern":
                    employee = new Intern(name, id, email, answer);
                break;
            }
            employeeArr.push(employee);
            addEmployee();
        });

}
const addEmployee = () => {

    inquirer.prompt ([

        {
            type: "confirm",
            name: "addAnother",
            message:"Would you like to add another employee?" 
        }
    ])
                  
    .then(answer => {
        if (answer.addAnother === true) {
            employeeInfo();
        }
        else {
            const html = render(employeeArr);
            writeHTMLtoFile(html);
        }
    });
}  


const writeHTMLtoFile = (html) => {
    fs.writeFile(outputPath, html, function(err) {
        if (err) {
            return console.log(err);
         }
         console.log ("Your team has thus been written.")
    });
};

employeeInfo();
