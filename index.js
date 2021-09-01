let createEmployeeRecord = function(array) {
    let obj = {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj;
}

let createEmployeeRecords = function(array) {
   return array.map(arr => createEmployeeRecord(arr))
}

let createTimeInEvent = function(obj, date) {
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    obj.timeInEvents.push(timeIn);
    return obj;
}

let createTimeOutEvent = function(obj, date) {
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    obj.timeOutEvents.push(timeOut);
    return obj;
}

let hoursWorkedOnDate = function(obj, date) {
    let e = new TypeError('Error - no matching timeOut found for this record.')
    let inDate = obj.timeInEvents.find(function(e) {
        return e.date === date 
    })

    let outDate = obj.timeOutEvents.find(function(e) {
        return e.date === date 
    })
    if (!outDate) {
        return e.message
    } else {
    return (outDate.hour - inDate.hour) / 100;
    }
}

let wagesEarnedOnDate = function(obj, date) {
    let payRate = obj.payPerHour
    let hours = hoursWorkedOnDate(obj, date)
    return payRate * hours;
}

let allWagesFor = function(obj) {
    let dates = obj.timeInEvents.map(w => {
         return wagesEarnedOnDate(obj, w.date)
    })
    return dates.reduce((a,b) => a + b, 0)
}

let calculatePayroll = function(array) {
    let wages = array.map(a => {
        return allWagesFor(a);
    })
    return wages.reduce((a,b) => a + b, 0);
}

let findEmployeeByFirstName = function(array, name) {
    let result = array.find(function(e) {
        return e.firstName === name 
    })
    return result;
}

