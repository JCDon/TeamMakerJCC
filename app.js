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

let employee = "";
let manager = "";
let engineer = "";
let intern = "";

const teamMembers = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const start = () => {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Manager", "Engineer", "Intern", "Exit Member Adder"],
            message: "What type of employee are we talking about?",
            name: "empType"
        }
    ]).then((ans) => {
        console.log(ans);
        const newEmployee = new Employee(ans.empName, ans.id, ans.email, ans.officeNum);

        switch (ans.empType) {
            case "Manager":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What's their name?",
                        name: "manName"
                    },
                    {
                        type: "input",
                        message: "What is their ID?",
                        name: "manId"
                    },
                    {
                        type: "input",
                        message: "What is their email?",
                        name: "manEmail"
                    },
                    {
                        type: "input",
                        message: "What is the office number?",
                        name: "officeNum"
                    }
                ]).then((ans) => {
                    const newManager = new Manager(ans.manName, ans.manId, ans.manEmail, ans.officeNum);
                    teamMembers.push(newManager);
                    restart();
                })
                break;
        
            case "Engineer":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What's their name?",
                        name: "engName"
                    },
                    {
                        type: "input",
                        message: "What is their ID?",
                        name: "engId"
                    },
                    {
                        type: "input",
                        message: "What is their email?",
                        name: "engEmail"
                    },
                    {
                        type: "input",
                        message: "What is their github username?",
                        name: "github"
                    }
                ]).then((ans) => {
                    const newEngineer = new Engineer(ans.engName, ans.engId, ans.engEmail, ans.github);
                    console.log(newEngineer);
                    teamMembers.push(newEngineer);
                    restart();
                })
                break;
        
            case "Intern":
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What's their name?",
                        name: "intName"
                    },
                    {
                        type: "input",
                        message: "What is their ID?",
                        name: "intId"
                    },
                    {
                        type: "input",
                        message: "What is their email?",
                        name: "intEmail"
                    },
                    {
                        type: "input",
                        message: "Where are they enrolled?",
                        name: "school"
                    }
                ]).then((ans) => {
                    const newIntern = new Intern(ans.intName, ans.intId, ans.intEmail, ans.school);
                    console.log(newIntern);
                    teamMembers.push(newIntern);
                    restart();
                })
                break;
        
            default:
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
                break;
        }
    });
}
start();

const restart = () => {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add any more team members?",
            name: "continue"
        }
    ]).then((ans) => {
        console.table(ans);
        if (ans.continue) {
            start();
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }
    })
}

// // After the user has input all employees desired, call the `render` function (required
// // above) and pass in an array containing all employee objects; the `render` function will
// // generate and return a block of HTML including templated divs for each employee!

// // After you have your html, you're now ready to create an HTML file using the HTML
// // returned from the `render` function. Now write it to a file named `team.html` in the
// // `output` folder. You can use the variable `outputPath` above target this location.
// // Hint: you may need to check if the `output` folder exists and create it if it
// // does not.

// // HINT: each employee type (manager, engineer, or intern) has slightly different
// // information; write your code to ask different questions via inquirer depending on
// // employee type.

// // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// // and Intern classes should all extend from a class named Employee; see the directions
// // for further information. Be sure to test out each class and verify it generates an
// // object with the correct structure and methods. This structure will be crucial in order
// // for the provided `render` function to work! ```
