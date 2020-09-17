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

const employeeArr = [];

const employeeInfo = () => {

inquirer.prompt([

    { //Role
        type: "list",
        name: "role",
        message:"What is the Team Members job title?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"]
    },
    
    { //Name
        type: "input",
        name: "name",
        message:"Please enter Team Members full name."
    },

    { //ID Number
        type: "input",
        name: "id",
        message:"What is the Team Members ID number?"
    },

    { //Email
        type: "input",
        name: "email",
        message:"Please enter Team Members email address."
    },
    
])
.then(roleAnswers => {
            const { role } = roleAnswers;

        switch(role) {

            //Switch for Manager Office
            case "Manager":
                roleSpecific(role, "officeNumber", "What is the Manager's office number?", roleAnswers);
            break;

            //Switch for Engineers GitHub
            case "Engineer":
                roleSpecific(role, "github", "What is the Engineer's Github profile username?", roleAnswers);
            break;

            //Switch for Interns School Name
            case "Intern":
                roleSpecific(role, "school", "Where does the Intern go to school?", roleAnswers);
            break;
        }
    });
}
    //Additional Questions for the specific employee's role
const roleSpecific = (role, inputType, message, roleAnswers) => {
        inquirer.prompt ([
                {
                    type: "input",
                    name: inputType,
                    message: message
                }
            ])

        .then(answers => {
            let answer;

            //Use for...in statement to iterate over properties
            for (let ansProp in answers) {
                answer = answers[ansProp];
            }
            const { name, id, email } = roleAnswers;
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
            name: "addTeamMember",
            message:"Would you like to add another Team Member?" 
        }
    ])
                  
    .then(answer => {
        if (answer.addTeamMember === true) {
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
         console.log ("So let it be written, so let it be done.")
    });
};

employeeInfo();
