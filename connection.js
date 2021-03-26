const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require('util');

require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employeeDB',
});
connection.connect((err) => {
    if (err) throw err;
    questions();
});

const questions = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View Employee',
                'Add Employee Details',
                'Remove Employee',
                'Update Employee Role',

            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Employee':
                    employeeSearch();
                    break;

                case 'Add Employee Details':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;


                case 'Update Employee Role':
                    updateEmployee();
                    break;



                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const employeeSearch = () => {

    inquirer
        .prompt({
            name: 'choice',
            type: 'rawlist',
            message: 'What information  would you like to view ?',
            choices: [
                ' Employee Details',
                'Employee by  Departments',
                '  Managers',
                'Roles'


            ],
        })

        .then((answer) => {
            switch (answer.choice) {
                case ' Employee Details':
                     
                     
                    
                    connection.query('SELECT * FROM employee', (err, res) => {
                        if (err) throw err;
                        console.table(res)
                        
                        questions()
                    })

                    break;

                case 'Employee by  Department':
                // let queryD = "SELECT * FROM employeedb.department "
                   
               let query =  "SELECT * FROM department"
                connection.query(query , (err, res) => {
                        if (err) throw err;
                        console.table(res)
                        console.log(res)
                        questions()
                    })

                    break;

                case 'Employee by Manager':
                    let queryM = "SELECT * FROM employee WHERE manager_id IS NOT NULL"
                    //SELECT * FROM employee WHERE manager_id IS NOT NULL
                    connection.query(queryM, (err, res) => {
                        if (err) throw err;
                        console.table(res)
                        console.log(res)
                        questions()
                    })
                    break;

                case 'Roles':
                    let queryR = "SELECT * FROM role"
                    connection.query(queryR, (err, res) => {
                        if (err) throw err;
                        console.table(res)
                      
                        questions()
                    })
                    break;


                // default:
                //     console.log(`Invalid action: ${answer.choice}`);
                //     break;
            }
        });
};

function addEmployee() {
    inquirer.prompt({
        type: 'rawlist',
        name: "addEmployee",
        message: "Which kind of Department you are intrested to fill  entry in ?",
        choices: ['Departments', 'Employees', 'Managers', 'Roles']
    }).then((answer) => {
        switch (answer.addEmployee) {
            case "Departments":
                inquirer.prompt({
                    type: "input",
                    name: 'departmentSelect',
                    message: "What kind of Department you would like to creat ?"


                }).then((answer) => {

                    let queryAdd = "INSERT INTO department (name) VALUE (?)";
                    connection.query(queryAdd, answer.departmentSelect, (err, res) => {
                        if (err) throw err;
                        console.table(answer)
                       
                        questions();
                    });
                })
                break;
            case "Employees":
                
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is Your First Name ?",
                            name: "firstName"

                        },

                        {
                            type: "input",
                            message: "What is Your last Name ?",
                            name: "lastName"

                        },

                        {
                            type: "input",
                            name: "roleId",
                            message: "What kind of  employee's role  ID you would prefer?",

                        },

                    ]).then((answer) => {

                        const queryEmployee = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)"
                        connection.query(queryEmployee, [answer.firstName, answer.lastName, answer.roleId], (err, res) => {
                         if(err) throw err;
                         console.table(answer)
                         questions()
                               
                        });



                    })
                break;
                
            
             case "Managers":   
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What is Your First Name ?",
                            name: "firstName"

                        },

                        {
                            type: "input",
                            message: "What is Your last Name ?",
                            name: "lastName"

                        },

                        {
                            type: "input",
                            name: "roleId",
                            message: "What kind of  employee's role  ID you would prefer?",

                        },
                        {
                            type: "input",
                            name: "managerId",
                            message: "What kind of managerId  you would like to  prefer ?",

                        },

                    ]).then((answer) => {

                        let queryMan = "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)";
                        connection.query(queryMan, [answer.firstName, answer.lastName, answer.roleId,answer.managerId ], (err, res) => {
                            if (err) throw err;
                            console.table(answer);
                            
                            questions();



                        });



                    })
                break;
            
            case "Roles":
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What  kind of  Role you would prefer ?",
                            name: "role"

                        },

                        {
                            type: "input",
                            message: "What figure of salary you would prefer ?",
                            name: "salary"

                        },
                        {
                            type: "input",
                            name: "choiceDepart",
                            message: "What is your department id for this role  ?",

                        },

                    ]).then((answer) => {

                        let queryRole = "INSERT INTO role (title,salary,department_id) VALUES (?,?,?)";
                        connection.query(queryRole, [answer.role, answer.salary, answer.choiceDepart], (err, res) => {
                            if (err) throw err;
                            console.table(answer);
                           
                            questions();



                        });



                    })
                break;

        }
    })

}
 function removeEmployee(){

    inquirer
    .prompt([
       

        {
            type: "input",
            message: "What ID you would like to remove ?",
            name: "role"

        },
        

    ]).then((answer)=>{
          
        let query = "DELETE FROM   employee  WHERE role_id = ?";

        connection.query(query, [ answer.role], (err, res) => {
            if (err) throw err;
            console.table(answer);
   
            questions();
        });

    })


 }


 function  updateEmployee(){

    inquirer
    .prompt([
        {
            type: "input",
            message: "What  ID you would like to select to update ?",
            name: "changeId"

        },

        {
            type: "input",
            message: "What ID you would like to update ?",
            name: "changedTo"

        }
        

    ]).then(function(answer){
          
        let queryU = "UPDATE  employee SET role_id = ? WHERE id =?";

        connection.query(queryU, [answer.changeId, answer.changedTo], (err, res) => {
            if (err) throw err;
            console.table(answer);
          

            questions();
        });

    })



}


 connection.connect((err) => {
   
    console.log(`connected as id ${connection.threadId}`);
    // questions();
})

connection.query = util.promisify(connection.query);

module.exports = connection;































// answer.managerId answer.roleId,










// case "Department":

                //     inquirer.prompt({

                //         type: "input",
                //         name: "department",
                //         message: "which type of department would you create "
                //     })

                //     let query = `INSERT INTO department (name) VALUES ()`;
                //     connection.query(query, (err, results) => {
                //         if (err) throw err;
                //         console.log(results);
                //         questions();
                //     });
                //     break;

                // connection.query("INSERT INTO role (title) VALUES ()", (err, results) => {
                    //     if (err) throw err;
                    //     console.log(results)
                    //     // questions();
                    //     creatEmployee();