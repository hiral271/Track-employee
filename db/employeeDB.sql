DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT ,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT
);

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");


INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("MOHAN", "Patel", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Denish", "Patel", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("chrish","Evance",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brade", "Pitt", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("jhony", "Deep", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Hritik", "Roshan", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("hiral", "Patel", 2, 7);

-- INSERT INTO  Manager (first_name, last_name, manager_id, role_id)
-- VALUE ("Brade", "Pitt", 1, 4);
-- INSERT INTO  Manager (first_name, last_name, manager_id, role_id)
-- VALUE ("jhony", "Deep", 4, 5);
-- INSERT INTO  Manager (first_name, last_name, manager_id, role_id)
-- VALUE ("Hritik", "Roshan", 1, 6);
-- INSERT INTO  Manager(first_name, last_name, manager_id, role_id)
-- VALUE ("hiral", "Patel", 2, 7);
