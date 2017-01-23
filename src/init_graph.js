var container = document.getElementById('graph_container');

var editor = new mxEditor();
var graph = editor.graph;
var model = graph.getModel();
editor.setGraphContainer(container);


mxEvent.disableContextMenu(container);
graph.setDropEnabled(true);
graph.setCellsEditable(false);
graph.setConnectable(true);
graph.setCellsResizable(true);
graph.setAllowLoops(true);


mxGraph.prototype.createGroupCell = function(cells) {
    var group = new mxCell('', null, 'group'); //  + '=0');
    group.setVertex(true);
    group.setConnectable(false);

    return group;
};


mxRubberband.prototype.oldMouseDown = mxRubberband.prototype.mouseDown;
mxRubberband.prototype.oldMouseUp = mxRubberband.prototype.mouseUp;

mxRubberband.prototype.mouseDown = function(sender, me) {
    if (me.evt.which == 1)
        this.oldMouseDown(sender, me);
}
mxRubberband.prototype.mouseUp = function(sender, me) {
    if (me.evt.which == 1)
        this.oldMouseUp(sender, me);
}

mxGraph.prototype.isValidDropTarget = function(cell, cells, evt) {
    return cell != null && ((this.isSplitEnabled() &&
        this.isSplitTarget(cell, cells, evt)) || (!this.model.isEdge(cell) &&
        (this.isSwimlane(cell) || ((this.model.getChildCount(cell) > 0 || (cell.children != null && cell.children.length == 0)) &&
            !this.isCellCollapsed(cell)))));
}


var ruberBand = new mxRubberband(graph);
var paning = new mxPanningHandler(graph);
mxGraph.prototype.isValidEnding = function(cell) {
    return (cell == null && this.allowDanglingEdges) ||
        (cell != null && (!this.model.isEdge(cell) ||
            this.connectableEdges) && this.isCellConnectable(cell));
}

mxGraph.prototype.isValidSource = function(cell) {
    if (cell != null && cell.value && cell.value.source == false)
        return false;
    return this.isValidEnding(cell);
}

mxGraph.prototype.isValidTarget = function(cell) {
    if (cell != null && cell.value && cell.value.target == false)
        return false;
    return this.isValidEnding(cell);
}

graph.validateEdge = function(edge, source, target) {

    if (source.value != null && source.value.source == false)
        return 'Cannot be source';
    if (target.value != null && target.value.target == false)
        return 'Cannot be target';

    for (var i in source.edges) {
        if (source.edges[i].target === target) {
            return 'Only single connection';
        }
    }

    return null;
}


function StartShape() {
    mxDoubleEllipse.call(this);
}

mxUtils.extend(StartShape, mxDoubleEllipse);
mxCellRenderer.prototype.defaultShapes['shape_start'] = StartShape;
var startStyle = new Object();
startStyle[mxConstants.STYLE_SHAPE] = 'shape_start';
startStyle[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
startStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
startStyle[mxConstants.STYLE_STROKEWIDTH] = 2;
startStyle[mxConstants.STYLE_RESIZABLE] = '0';


graph.getStylesheet().putCellStyle('start', startStyle);

function EndShape() {
    mxEllipse.call(this);
}

mxUtils.extend(EndShape, mxEllipse);
mxCellRenderer.prototype.defaultShapes['shape_end'] = EndShape;
var endStyle = new Object();
endStyle[mxConstants.STYLE_SHAPE] = 'shape_end';
endStyle[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
endStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
endStyle[mxConstants.STYLE_STROKEWIDTH] = 4;
endStyle[mxConstants.STYLE_RESIZABLE] = '0';

graph.getStylesheet().putCellStyle('end', endStyle);



var defaultStyle = graph.getStylesheet().getDefaultVertexStyle();

defaultStyle[mxConstants.STYLE_ROUNDED] = true;
defaultStyle[mxConstants.STYLE_SHADOW] = true;
defaultStyle[mxConstants.STYLE_ARCSIZE] = 20;
defaultStyle[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
defaultStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
defaultStyle[mxConstants.STYLE_FONTCOLOR] = '#000000';
defaultStyle[mxConstants.STYLE_RESIZABLE] = '1';

var group = angular.copy(defaultStyle);
defaultStyle[mxConstants.STYLE_ROUNDED] = false;
defaultStyle[mxConstants.STYLE_SHADOW] = false;
defaultStyle[mxConstants.STYLE_FOLDABLE] = '0';
defaultStyle[mxConstants.STYLE_FILL_OPACITY] = 0;
graph.getStylesheet().putCellStyle('group', defaultStyle);