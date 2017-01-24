var pdArray = {}
pdArray.containByFun = function (array,value) {
    for (var i = 0, l = array.length; i < l; ++i) {
        if (value==array[i])
            return array;
    }
    return false;
}
pdArray.getDistinctBy = function (array) {
    var 
        a = [];
    for (var i = 0, l = array.length; i < l; ++i) {
        if (pdArray.containByFun(array[i])) {
            continue;
        }
        a.push(array[i]);
    }
    return a;
}