var pdVertexType = {
    START: 'start',
    END: 'end',
    NESTED: 'nested',
    RECURSION: 'recursion',
    MASK: 'mask',
    VARIABLE: 'variable',
    SPLITTER: 'splitter'
}


var pdEdgeType = {
    VARIABLE: 'variable_edge'
}

var pdPortType = {
    DATA: 'data_port',
    OUT: 'out_port'
}

var pdDataSources = [
    pdPortType.DATA
];

var pdDataTargets = [
    pdVertexType.VARIABLE
];

var pdSourcesVertex = [
    pdVertexType.START,
    pdVertexType.MASK,
    pdPortType.OUT
];

var pdTargetVertex = [
    pdVertexType.END,
    pdVertexType.MASK,
    pdVertexType.VARIABLE,
    pdVertexType.SPLITTER
]

var pdContainersVertex = [
    pdVertexType.NESTED,
]

var pdLogicMask = function() {}

pdLogicMask.prototype.Match = function(char) {
    return this.nodeName == '*' || this.nodeName == char || (this.nodeName == ' ' && char == ' ');
}

var pdLogicVariable = function() {}

pdLogicVariable.prototype.Append = function(char) {
    return this.nodeName == '*' || this.nodeName == char || (this.nodeName == ' ' && char == ' ');
}

var pdLogicObjects = {}
pdLogicObjects[pdVertexType.MASK] = pdLogicMask;
pdLogicObjects[pdVertexType.VARIABLE] = pdLogicMask;


var pdCellExtSplitter = function() {}
var pdCellExtMask = function() {}
var pdCellStart = function() {}
var pdEndStart = function() {}

pdCellExtSplitter.prototype.GetPossibleCells = function() {
    if (this.children == null)
        return null;
    var options = this.children.filter(x => x.edges != null && x.edges.length == 1).map(x => x.edges[0].target)
        .filter(x => x != null && x.GetPossibleCells != null).reduce((t, x) => t.concat(x.GetPossibleCells()), []);
    return options;
}

pdCellExtMask.prototype.GetPossibleCells = function() {
    return [this];
}

pdCellStart.prototype.GetPossibleCells = function() {
    return [this];
}

pdEndStart.prototype.GetPossibleCells = function() {
    return [];
}

var pdCellExtensionObjects = {}
pdCellExtensionObjects[pdVertexType.SPLITTER] = pdCellExtSplitter;
pdCellExtensionObjects[pdVertexType.MASK] = pdCellExtMask;
pdCellExtensionObjects[pdVertexType.START] = pdCellStart;
pdCellExtensionObjects[pdVertexType.END] = pdEndStart;

var pdCloner = {
    clone: function() {
        return angular.copy(this);
    }
}

var pdFlow = {
    /*CreateValueByType: function(type) {
        var logicObj = pdLogicObjects[type];
        if (logicObj != null) {
            var obj = new logicObj();
            Object.assign(obj, pdCloner);
            return obj;
        }
        return {}
    },*/
    CustomizeCell: function(cell) {
        if (cell.style == null)
            return;
        var logicObj = pdLogicObjects[cell.style];
        var cellObj = pdCellExtensionObjects[cell.style];
        if (logicObj != null) {
            Object.assign(cell.value, logicObj.prototype, pdCloner);
        }
        if (cellObj != null) {
            Object.assign(cell, cellObj.prototype);
        }
    }
}