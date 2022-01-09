Array.prototype.mapFromScratch = function (callback,context) {
    let newArr = [];
    for (let a = 0; a < this.length; a++){
        newArr.push(callback(context,this[a],a,this));
    }
    return newArr;
}

Array.prototype.myFilter = function (callback) {
    let newArr = [];
    for (let a = 0; a < this.length; a++){
        const isPass
    }
}