const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");
const { get } = require("https");
let employee = [];


async function generateTeam() {
    await getManagerInput();
};

function teamQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select a team member position.',
            name: 'type',
            choices: [
                'Engineer',
                'Intern'
            ]
        }
    ])

        .then(async function (answer) {
            if (answer.type === 'Engineer') {
                await getEngineerInput();
            } if (answer.type === 'Intern') {
                await getInternInput();
            }
        });

};

function getManagerInput() {
    const questions = [
        {
            type: 'input',
            message: "What is the Manager's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the Manager's id?",
            name: 'id' 
        },
        {
            type: 'input',
            message: "What is the Manager's email?",
            name: 'email'  
        },
        {
            type: 'input',
            message: "What is the Manager's office number?",
            name: 'officeNumb'  
        },
    ]

    inquirer.prompt(questions)
        .then(answer => {
            let newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
            employee.push(newManager);
            teamQuestions();
        });
};

function getEngineerInput() {
    const questions = [
        {
            type: 'input',
            message: "What is the Engineer's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the Engineer's id?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the Engineer's email?",
            name: 'email'
        },
        {
            type: 'input',
            message: "What is the Engineer's github?",
            name: 'github'
        },
        {
            type: 'confirm',
            message: "Would you like to add another employee?",
            name: 'askAgain'
        },
    ]

    function ask() {
        inquirer.prompt(questions)
            .then(answer => {
                let newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
                employee.push(newEngineer);
                if(answer.askAgain) {
                    teamQuestions();
                } else {
                    let HTML = render(employee);
                    writeFileAsync(outputPath, HTML);
                    return
                }
            });
    }
    ask();
};

function getInternInput() {
    const questions = [
        {
            type: 'input',
            message: "What is the Intern's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the Intern's id?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the Intern's email?",
            name: 'email'
        },
        {
            type: 'input',
            message: "What is the Intern's school?",
            name: 'school'
        },
        {
            type: 'confirm',
            message: "Would you like to add another employee?",
            name: 'askAgain'
        },
    ]

    function ask() {
        inquirer.prompt(questions)
            .then(answer => {
                let newIntern = new Intern(answer.name, answer.id, answer.email, answer.school);
                employee.push(newIntern);
                if (answer.askAgain) {
                    teamQuestions();
                } else {
                    let HTML = render(employee);
                    writeFileAsync(outputPath, HTML);
                    return
                }
            });
    }
    ask();
};

generateTeam();