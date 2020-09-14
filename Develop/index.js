

class Employee {

    constructor (name, id, email) {
    this.name = name
    this.id = id
    this.email = email
    }

    getName() {
        return `Name: ${this.name}`
    }

    getId() {
        return `ID: ${this.id}`
    }

    getEmail() {
        return `Email: ${this.email}`
    }

    getRole() {
        return 'Employee'
    }

}

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email)
        this.officeNumber = officeNumber
    }
    getOfficeNumber () {
        return `${this.officeNumber}`
    }

    getRole() {
        return 'Manager'
    }
}

class Engineer extends Employee {
    constructor (name, id, email, gitHub) {
        super (name, id, email)
        this.gitHub = gitHub
    }
    getGitHub () {
        return `GitHub: ${this.getGitHub}`
    }

    getRole() {
        return 'Engineer'
    }
}

class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email)
        this.school = school
    }
    getSchool () {
        return `School: ${this.school}`
    }

    getRole() {
        return 'Intern'
    }
}

const managerClass = new Manager ('Josh', 1, 'josh@email.com', 2020)
const engineerClass = new Engineer ('Josh', 1, 'josh@email.com', 'guillenjoshua')
const internClass = new Intern ('Josh', 1, 'josh@email.com', 'Texas Tech')
console.log(internClass.getSchool())