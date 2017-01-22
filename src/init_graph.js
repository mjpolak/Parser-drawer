var container = document.getElementById('graph_container');
var graph = new mxGraph(container);

graph.setCellsEditable(false);
graph.setConnectable(true);
graph.setCellsResizable(false);
graph.setAllowLoops(true);
new mxRubberband(graph);

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

graph.getStylesheet().putCellStyle('end', endStyle);



var defaultStyle = graph.getStylesheet().getDefaultVertexStyle();

defaultStyle[mxConstants.STYLE_ROUNDED] = true;
defaultStyle[mxConstants.STYLE_SHADOW] = true;
defaultStyle[mxConstants.STYLE_ARCSIZE] = 20;
defaultStyle[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
defaultStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
defaultStyle[mxConstants.STYLE_FONTCOLOR] = '#000000';