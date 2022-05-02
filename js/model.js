/*Used to create the class visitor and all the functions that interact with it*/
class Visitor {
    constructor(id, firstName, lastName, address, city, state, zipCode, cellNum, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.cellNum = cellNum;
        this.email = email;
    }

    get fullName() { 
        return this.firstName + ' ' + this.lastName; 
    }
    get fullAddress() { 
        return this.address + ', ' + this.city + ', ' + this.state + ' ' + this.zipCode; 
    }

    get printVisitor() {
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.address);
        console.log(this.city);
        console.log(this.state);
        console.log(this.zipCode);
        console.log(this.cellNum);
        console.log(this.email);
    }
}

let visitors = [

];

function modelAddVisitor(visitor) {
    visitors.push(visitor);
}

function modelDeleteVisitor(id) {
    for (let i=0; i<visitors.length; i++) {
        if (visitors[i].id == id) {
            visitors.splice(i, 1);
            return 0;
        }
    }
}

function findVisitor(id) {
    for (let i=0; i<visitors.length; i++) {
        if (visitors[i].id == id) {
            return visitors[i];
        }
    }
}
function findVisitorIndex(id) {
    for (let i=0; i<visitors.length; i++) {
        if (visitors[i].id == id) {
            return i;
        }
    }
}

function modelUpdateVisitor(visitor) {//finds and updates a visitor object a your arra
    for (let i=0; i<visitors.length; i++) {
        if (visitors[i].id == editId) {
            delete visitors[i];
            visitors[i] = visitor;
            return 0;
        }
    }
}