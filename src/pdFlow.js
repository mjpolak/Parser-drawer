var pdVertexType = {
    START: 'start',
    END: 'end',
    NESTED: 'nested',
    RECURSION: 'recursion',
    MASK: 'mask',
    VARIABLE: 'variable'
}

var pdOptionalFilters = [
    pdVertexType.MASK
]

var pdEdgeType = {
    VARIABLE: 'variable_edge'
}

var pdPortType = {
    DATA: 'data_port',
    IN: 'in_port',
    OUT: 'port'
}

var pdDataSources = [
    pdPortType.DATA
];

var pdDataTargets = [
    pdVertexType.VARIABLE
];

var pdSourcesVertex = [
    pdVertexType.START,
    pdVertexType.MASK
];

var pdTargetVertex = [
    pdVertexType.END,
    pdVertexType.MASK,
    pdVertexType.VARIABLE
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

var pdCloner = {
    clone: function() {
        return angular.copy(this);
    }
}

var pdFlow = {
    CreateValueByType: function(type) {
        var logicObj = pdLogicObjects[type];
        if (logicObj != null) {
            var obj = new logicObj();
            Object.assign(obj, pdCloner);
            return obj;
        }
        return {}
    },
    AddLogicToCell: function(cell) {
        if (cell.style == null)
            return;


        var logicObj = pdLogicObjects[cell.style];

        if (logicObj != null) {
            var obj = new logicObj();

            Object.assign(obj, cell.value, pdCloner);
            cell.value = obj;
        }
    }
}