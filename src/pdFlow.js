var pdVertexType = {
    START: 'start',
    END: 'end',
    NESTED: 'nested',
    RECURSION: 'recursion',
    MASK: 'mask',
    VARIABLE: 'variable',
    SPLITTER: 'splitter',
    LAYER:'layer'
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
    pdPortType.OUT,
    pdVertexType.NESTED
];

var pdTargetVertex = [
    pdVertexType.END,
    pdVertexType.MASK,
    pdVertexType.VARIABLE,
    pdVertexType.SPLITTER,
    pdVertexType.NESTED
]

var pdContainersVertex = [
    pdVertexType.NESTED,
]

var pdCellExtSplitter = function() {}
var pdCellExtMask = function() {}
var pdCellStart = function() {}
var pdEndStart = function() {}
var pdExtVariable = function() {}
var pdExtNested = function(cell)
{

}

pdCellExtMask.prototype.Match = function(char) {
    return this.value.nodeName == '*' || this.value.nodeName == char || (this.value.nodeName == ' ' && char == ' ');
}

pdCellExtMask.prototype.PartialMatch = function(string) {
    return this.value.nodeName.length >= string.length && this.value.nodeName.substring(0,string.length)==string;
}

pdExtVariable.prototype.Append = function(char) {
return this.value.nodeName == '*' || this.value.nodeName == char || (this.value.nodeName == ' ' && char == ' ');
}

pdEndStart.prototype.Match = function(char) {
    return false;
}

pdEndStart.prototype.PartialMatch = function(string) {
    return false;
}


pdCellExtSplitter.prototype.GetPossibleCells = function() {
    if (this.children == null)
        return null;
    var options = this.children.filter(x => x.edges != null && x.edges.length == 1).map(x => x.edges[0].target)
        .filter(x => x != null && x.GetPossibleCells != null).reduce((t, x) => t.concat(x.GetPossibleCells()), []);
    return options;
}

pdCellExtSplitter.prototype.AddNode =function()
{
    var child_count = this.children == null ? 0 : this.children.length
    this.geometry.width = 15+(child_count+1)*25;
    graph.refresh();
    var v11 = graph.insertVertex(this, null, ''+(child_count+1), 0, 1, 20, 20, pdPortType.OUT,true);
    pdFlow.CustomizeCell(v11,pdPortType.OUT);
    v11.geometry.offset = new mxPoint(10+(25*(child_count)), -10);
    graph.refresh();
}

pdCellExtSplitter.prototype.RemoveNode = function()
{
    this.geometry.width-=25;
    graph.getModel().remove(this.children[this.children.length-1]);
    graph.refresh();
}

pdCellExtSplitter.prototype.FillMenu = function(menu)
{
    var cell = this;
    menu.addItem('Add node', null, function(){
            cell.AddNode();
        });
    if(this.children.length > 2)
    {
        menu.addItem('Remove node', null, function()
        {
        cell.RemoveNode();
        });
    }
}


pdCellExtMask.prototype.GetPossibleCells = function() {
    return [this];
}

pdCellStart.prototype.GetPossibleCells = function() {
    return [this];
}

pdEndStart.prototype.GetPossibleCells = function() {
    return [this];
}

var pdCellExtensionObjects = {}
pdCellExtensionObjects[pdVertexType.SPLITTER] = pdCellExtSplitter;
pdCellExtensionObjects[pdVertexType.MASK] = pdCellExtMask;
pdCellExtensionObjects[pdVertexType.START] = pdCellStart;
pdCellExtensionObjects[pdVertexType.END] = pdEndStart;
pdCellExtensionObjects[pdVertexType.VARIABLE] =pdExtVariable;
pdCellExtensionObjects[pdVertexType.NESTED] = pdExtNested;

var pdCloner = {
    clone: function() {
        return angular.copy(this);
    }
}

var pdFlow = {
    CustomizeCell: function(cell,style) {
        if (style == null)
        {
            //alert('pdFlow.CustomizeCell style required')
            return;
        }
        if(cell.value != null)
            Object.assign(cell.value, pdCloner);
        var cellObj = pdCellExtensionObjects[style];
        if (cellObj != null) {
            cellObj(cell);
            Object.assign(cell, cellObj.prototype);
            
        }
        cell.pdType = style;
    }
}
