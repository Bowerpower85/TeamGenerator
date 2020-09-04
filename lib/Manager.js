// TODO: Write code to define and export the Manager class
const Employee = require('../lib/Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };

    getTitle() {
        return 'Manager'
    };

    getOfficeNumber() {
        return this.officeNumber
    };
};

module.exports = Manager;