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
graph.setAllowLoops(false);
var ruberBand = new mxRubberband(graph);
var paning = new mxPanningHandler(graph);

var graphHandlerMouseDown = mxGraphHandler.prototype.mouseDown;
mxGraphHandler.prototype.mouseDown = function(sender, me)
{
    alert('ok');
    graphHandlerMouseDown.apply(this, arguments);

    // if (this.graph.isCellSelected(me.getCell()) && this.graph.getSelectionCount() > 1)
    // {
    //     this.delayedSelection = false;
    // }
};

mxEvent.addMouseWheelListener(function (evt, up) {
    if (up) {
        graph.zoomIn();
    } else {
        graph.zoomOut();
    }
});

graph.getModel().addListener(mxEvent.CHANGE, function (sender, evt) {
    var cells = evt.getProperty('edit').changes.map(function (x) {
        return x.cell
    });

    var childs = cells.filter(function (x) {
        return x != null && x.isEdge != null
    })
    var distinct = pdArray.getDistinctBy(childs);
    evt.consume();
    graph.getModel().beginUpdate();
    for (var i in distinct) {
        if (distinct[i].isEdge()) {
            if (distinct[i].target == null || distinct[i].source == null) {
                graph.setCellWarning(distinct[i], '<b>Warning:</b>: Disconnected!');
            } else {
                graph.clearCellOverlays(distinct[i]);
            }
        }
    }
    graph.getModel().endUpdate();
});

mxGraph.prototype.createGroupCell = function (cells) {
    var group = new mxCell('', null, 'group'); //  + '=0');
    group.setVertex(true);
    group.setConnectable(false);

    return group;
};

mxGraph.prototype.convertValueToString = function (cell) {
    var value = this.model.getValue(cell);

    if (value != null) {
        if (value.nodeName != null) {
            return value.nodeName;
        } else if (typeof (value.toString) == 'function') {
            return value.toString();
        }
    }

    return '';
};


mxRubberband.prototype.oldMouseDown = mxRubberband.prototype.mouseDown;
mxRubberband.prototype.oldMouseUp = mxRubberband.prototype.mouseUp;

mxRubberband.prototype.mouseDown = function (sender, me) {
    if (me.evt.which == 1)
        this.oldMouseDown(sender, me);
}
mxRubberband.prototype.mouseUp = function (sender, me) {
    if (me.evt.which == 1)
        this.oldMouseUp(sender, me);
}

mxGraph.prototype.isValidDropTarget = function (cell, cells, evt) {
    return cell != null && ((this.isSplitEnabled() &&
        this.isSplitTarget(cell, cells, evt)) || (!this.model.isEdge(cell) &&
        (this.isSwimlane(cell) || ((this.model.getChildCount(cell) > 0 || (cell.children != null && cell.children.length == 0)) &&
            !this.isCellCollapsed(cell)))));
}
mxGraph.prototype.isValidEnding = function (cell) {
    return (cell == null && this.allowDanglingEdges) ||
        (cell != null && (!this.model.isEdge(cell) ||
            this.connectableEdges) && this.isCellConnectable(cell));
}

mxGraph.prototype.isValidSource = function (cell) {
    // if (cell != null && cell.value && cell.value.source == false)
    if (cell != null && cell.style && !pdSourcesVertex.includes(cell.style))
        return false;
    return this.isValidEnding(cell);
}

mxGraph.prototype.isValidTarget = function (cell) {
    if (cell != null && cell.style && !pdTargetVertex.includes(cell.style))
        return false;
    return this.isValidEnding(cell);
}

graph.validateEdge = function (edge, source, target) {

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

var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();


edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
edgeStyle[mxConstants.STYLE_ROUNDED] = true;
edgeStyle[mxConstants.STYLE_STROKECOLOR] = '#000';


function StartShape() {
    mxDoubleEllipse.call(this);
}

mxUtils.extend(StartShape, mxDoubleEllipse);
mxCellRenderer.prototype.defaultShapes['shape_start'] = StartShape;
var startStyle = new Object();
startStyle[mxConstants.STYLE_SHAPE] = 'shape_start';
startStyle[mxConstants.STYLE_FILLCOLOR] = '#00FF00';
startStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
startStyle[mxConstants.STYLE_STROKEWIDTH] = 2;
startStyle[mxConstants.STYLE_RESIZABLE] = '0';
startStyle[mxConstants.STYLE_NOLABEL] = 'noLabel';



graph.getStylesheet().putCellStyle(pdVertexType.START, startStyle);

function EndShape() {
    mxEllipse.call(this);
}

mxUtils.extend(EndShape, mxEllipse);
mxCellRenderer.prototype.defaultShapes['shape_end'] = EndShape;
var endStyle = new Object();
endStyle[mxConstants.STYLE_SHAPE] = 'shape_end';
endStyle[mxConstants.STYLE_FILLCOLOR] = '#FF0000';
endStyle[mxConstants.STYLE_STROKECOLOR] = '#000000';
endStyle[mxConstants.STYLE_STROKEWIDTH] = 4;
endStyle[mxConstants.STYLE_RESIZABLE] = '0';
endStyle[mxConstants.STYLE_NOLABEL] = 'noLabel';

graph.getStylesheet().putCellStyle(pdVertexType.END, endStyle);



var mask = graph.getStylesheet().getDefaultVertexStyle();

mask[mxConstants.STYLE_ROUNDED] = true;
mask[mxConstants.STYLE_SHADOW] = true;
mask[mxConstants.STYLE_ARCSIZE] = 20;
mask[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
mask[mxConstants.STYLE_STROKECOLOR] = '#000000';
mask[mxConstants.STYLE_FONTCOLOR] = '#000000';
mask[mxConstants.STYLE_RESIZABLE] = '1';
mask[mxConstants.STYLE_FILL_OPACITY] = 100;

graph.getStylesheet().putCellStyle(pdVertexType.MASK, mask);

var variable = angular.copy(mask);
variable[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
variable[mxConstants.STYLE_ROUNDED] = true;
variable[mxConstants.STYLE_SHADOW] = true;
variable[mxConstants.STYLE_FILLCOLOR] = '#FF00FF';
variable[mxConstants.STYLE_STROKECOLOR] = '#000000';
variable[mxConstants.STYLE_FONTCOLOR] = '#000000';
variable[mxConstants.STYLE_FILL_OPACITY] = 100;

graph.getStylesheet().putCellStyle(pdVertexType.VARIABLE, variable);



var nested = angular.copy(mask);

function NestedShape() {
    mxCylinder.call(this);
}
mxUtils.extend(NestedShape, mxCylinder);

NestedShape.prototype.paintVertexShape = function (c, x, y, w, h) {
    var dy = 20 * this.scale;
    var dx = 20 * this.scale;
    c.translate(x, y);
    c.setShadow(false);
    c.begin();
    c.setFillAlpha(100);

    c.moveTo(0, dy);
    c.lineTo(dx, 0);
    c.lineTo(w - dx, 0);
    c.lineTo(w, dy);
    c.close();

    c.fillAndStroke();
    c.setFillAlpha(0);
    //c.setFillColor('#FFFFFF');
    c.begin();
    c.moveTo(0, dy);
    c.lineTo(w, dy);
    c.lineTo(w, h);
    c.lineTo(0, h);
    c.close();
    c.fillAndStroke();
}

mxCellRenderer.prototype.defaultShapes['shape_nested'] = NestedShape;

nested[mxConstants.STYLE_SHAPE] = 'shape_nested';
nested[mxConstants.STYLE_ROUNDED] = false;
nested[mxConstants.STYLE_SHADOW] = false;
nested[mxConstants.STYLE_FOLDABLE] = '0';
nested[mxConstants.STYLE_FILLCOLOR] = 'lightgray';
nested[mxConstants.STYLE_FILL_OPACITY] = 100;
nested[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
nested[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
nested[mxConstants.STYLE_SPACING_TOP] = 2;

graph.getStylesheet().putCellStyle(pdVertexType.NESTED, nested);