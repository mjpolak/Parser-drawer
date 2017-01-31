var container = document.getElementById('graph_container');

var editor = new mxEditor();
var graph = editor.graph;
var model = graph.getModel();
editor.setGraphContainer(container);

// mxConstants.DEFAULT_HOTSPOT = 1;
// mxConstants.MIN_HOTSPOT_SIZE = 50;

mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
mxEvent.disableContextMenu(container);
graph.setDropEnabled(true);
//graph.setCellsEditable(false);
graph.setConnectable(true);
graph.setCellsResizable(true);
graph.setAllowLoops(false);
var ruberBand = new mxRubberband(graph);
var paning = new mxPanningHandler(graph);

graph.getModel().valueForCellChanged = function(cell, value) {
    var previous = cell.value.nodeName;
    cell.value.nodeName = value;

    return previous;
};

mxEvent.addMouseWheelListener(function(evt, up) {
    if (up) {
        graph.zoomIn();
    } else {
        graph.zoomOut();
    }
});

graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt) {
    var cells = evt.getProperty('edit').changes.map(function(x) {
        return x.cell
    });

    var childs = cells.filter(function(x) {
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

mxGraph.prototype.createGroupCell = function(cells) {
    var group = new mxCell('', null, 'group'); //  + '=0');
    group.setVertex(true);
    group.setConnectable(false);

    return group;
};

mxGraph.prototype.convertValueToString = function(cell) {
    var value = this.model.getValue(cell);

    if (value != null) {
        if (value.nodeName != null) {
            return value.nodeName;
        } else if (typeof(value.toString) == 'function') {
            return value.toString();
        }
    }

    return '';
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

    return cell.pdType != null && pdContainersVertex.includes(cell.pdType) && !cells.some(function(x) {
        return x.pdType == pdVertexType.START || x.pdType == pdVertexType.END
    });
}

mxGraph.prototype.oldisValidConnection = mxGraph.prototype.isValidConnection;


mxGraph.prototype.isValidEnding = function(cell) {
    //console.log('isValidEnding');
    return (cell == null && this.allowDanglingEdges) ||
        (cell != null && (!this.model.isEdge(cell) ||
            this.connectableEdges) && this.isCellConnectable(cell));
}

var previous = graph.model.getStyle;

graph.model.getStyle = function(cell) {
    if (cell != null && cell.source != null && cell.source.pdType == pdPortType.DATA) {
        return pdEdgeType.VARIABLE;
    } else {
        return previous.apply(this, arguments)
    }
}

mxGraph.prototype.isValidSource = function(cell) {
    if (cell != null && cell.pdType) {
        if (!pdSourcesVertex.includes(cell.pdType) && cell.pdType != pdPortType.DATA)
            return false;
        if (pdSourcesVertex.includes(cell.pdType) && cell.edges != null && cell.edges.some(x => x.source == cell && x.target != null))
            return false;
    }

    return this.isValidEnding(cell);
}

mxGraph.prototype.isValidTarget = function(cell) {
    if (cell == null || cell.pdType == null || !(pdTargetVertex.includes(cell.pdType) || pdDataTargets.includes(cell.pdType)))
        return false;
    return this.isValidEnding(cell);
}
mxGraph.prototype.isValidConnection = function(source, target) {

    // variable port to variables
    if (source != null && target != null) {
        var is_data_source = pdDataSources.includes(source.pdType);
        var id_data_target = pdDataTargets.includes(target.pdType);



        if (is_data_source != id_data_target)
            return false;

        if (source.pdType == pdVertexType.START && target.pdType == pdVertexType.END)
            return false;
    }
    return this.oldisValidConnection(source, target);
}
graph.validateEdge = function(edge, source, target) {

    if (!pdSourcesVertex.includes(source.pdType) && !pdDataSources.includes(source.pdType))
        return 'Cannot be source';
    if (!pdTargetVertex.includes(target.pdType) && !pdDataTargets.includes(target.pdType))
        return 'Cannot be target';

    var is_data_source = pdDataSources.includes(source.pdType);
    var id_data_target = pdDataTargets.includes(target.pdType);
    // console.log("TEST:");
    // console.log(is_data_source);
    // console.log(id_data_target);
    if (is_data_source != id_data_target) {
        return 'Diffrent connections type'
    }

    for (var i in source.edges) {
        if (source.edges[i].target === target && source.edges[i] != edge) {
            return 'Only single connection';
        }
    }

    return null;
}

var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();


edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
edgeStyle[mxConstants.STYLE_ROUNDED] = true;
//edgeStyle[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_DIAMOND;
edgeStyle[mxConstants.STYLE_ENDSIZE] = 20;
edgeStyle[mxConstants.STYLE_STROKECOLOR] = '#000';

var dataEdgeStyle = angular.copy(edgeStyle);
dataEdgeStyle[mxConstants.STYLE_STROKECOLOR] = 'lightblue';
graph.getStylesheet().putCellStyle(pdEdgeType.VARIABLE, dataEdgeStyle);

var core_getStyle = mxGraphModel.prototype.getStyle;
mxGraphModel.prototype.getStyle = function(cell)
{
    if(cell.edge != null && cell.edge == 1 )
    {
        return pdEdgeType.VARIABLE;
    }
    return core_getStyle.apply(this,arguments);
}

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
startStyle[mxConstants.STYLE_EDITABLE] = 0;
startStyle[mxConstants.STYLE_DELETABLE] = 0;





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
endStyle[mxConstants.STYLE_EDITABLE] = 0;
endStyle[mxConstants.STYLE_DELETABLE] = 0;

graph.getStylesheet().putCellStyle(pdVertexType.END, endStyle);



var mask = graph.getStylesheet().getDefaultVertexStyle();

//mask[mxConstants.STYLE_ROUNDED] = true;
mask[mxConstants.STYLE_SHADOW] = true;
mask[mxConstants.STYLE_ARCSIZE] = 20;
mask[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
mask[mxConstants.STYLE_STROKECOLOR] = '#000000';
mask[mxConstants.STYLE_FOLDABLE] = '0';
mask[mxConstants.STYLE_FONTCOLOR] = '#000000';
mask[mxConstants.STYLE_RESIZABLE] = '1';
mask[mxConstants.STYLE_FILL_OPACITY] = 100;
mask[mxConstants.STYLE_SHADOW] = false;
//mask[mxConstants.STYLE_EDITABLE] = 0;

graph.getStylesheet().putCellStyle(pdVertexType.MASK, mask);



function SplitterShape() {
    mxCylinder.call(this);
}
mxUtils.extend(SplitterShape, mxCylinder);

SplitterShape.prototype.paintVertexShape = function(c, x, y, w, h) {
    var dx = 10 // * this.scale;
    c.translate(x, y);
    c.setShadow(false);

c.begin();
c.setFillAlpha(0);
    c.moveTo(0,0);
    c.lineTo(w, 0);
    c.lineTo(w, h);
    c.lineTo(0, h);
    c.fill();

    c.begin();
    c.setFillAlpha(0);

    c.moveTo(2*dx, 10);
    c.lineTo(w - 2*dx, 10);
    c.moveTo(w/2, 0);
    c.lineTo(w/2, 10);
    
    var children = this.state.cell.children;

    children.forEach(function(element) {
        var x = element.geometry.offset.x+element.geometry.width/2;
        c.moveTo(x, 10);
        c.lineTo(x, 20);
    }, this);

    c.fillAndStroke();

}

mxCellRenderer.prototype.defaultShapes['shape_splitter'] = SplitterShape;

var splitter = angular.copy(mask);
//mask[mxConstants.STYLE_ROUNDED] = true;
splitter[mxConstants.STYLE_SHAPE] = 'shape_splitter';
splitter[mxConstants.STYLE_SHADOW] = true;
splitter[mxConstants.STYLE_ARCSIZE] = 20;
splitter[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
splitter[mxConstants.STYLE_STROKECOLOR] = '#000000';
splitter[mxConstants.STYLE_FOLDABLE] = '0';
splitter[mxConstants.STYLE_FONTCOLOR] = '#000000';
splitter[mxConstants.STYLE_RESIZABLE] = '0';
splitter[mxConstants.STYLE_FILL_OPACITY] = 100;
splitter[mxConstants.STYLE_PORT_CONSTRAINT] = mxConstants.DIRECTION_NORTH;
splitter[mxConstants.STYLE_PORT_CONSTRAINT_ROTATION] = 1;
splitter[mxConstants.STYLE_SHADOW] = false;
//mask[mxConstants.STYLE_EDITABLE] = 0;

graph.getStylesheet().putCellStyle(pdVertexType.SPLITTER, splitter);

var out_port = angular.copy(mask);
out_port[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
out_port[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
out_port[mxConstants.STYLE_STROKECOLOR] = '#000000'; //#000000';
out_port[mxConstants.STYLE_FOLDABLE] = '0';
out_port[mxConstants.STYLE_FONTCOLOR] = '#000000';
out_port[mxConstants.STYLE_STROKEWIDTH] = 2;
//data_port[mxConstants.STYLE_RESIZABLE] = '0';
//data_port[mxConstants.STYLE_MOVABLE] = '0';
out_port[mxConstants.STYLE_PORT_CONSTRAINT] = mxConstants.DIRECTION_SOUTH;
out_port[mxConstants.STYLE_PORT_CONSTRAINT_ROTATION] = 1;
out_port[mxConstants.STYLE_FILL_OPACITY] = 100;
out_port[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
out_port[mxConstants.STYLE_SHADOW] = false;
out_port[mxConstants.STYLE_EDITABLE] = 0;

graph.getStylesheet().putCellStyle(pdPortType.OUT, out_port);

var data_port = angular.copy(mask);
data_port[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
data_port[mxConstants.STYLE_FILLCOLOR] = 'lightblue';
data_port[mxConstants.STYLE_STROKECOLOR] = 'none'; //#000000';
data_port[mxConstants.STYLE_FOLDABLE] = '0';
data_port[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
//data_port[mxConstants.STYLE_RESIZABLE] = '0';
//data_port[mxConstants.STYLE_MOVABLE] = '0';
data_port[mxConstants.STYLE_PORT_CONSTRAINT] = mxConstants.DIRECTION_EAST;
data_port[mxConstants.STYLE_PORT_CONSTRAINT_ROTATION] = 1;
data_port[mxConstants.STYLE_FILL_OPACITY] = 100;
data_port[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
data_port[mxConstants.STYLE_SHADOW] = false;
data_port[mxConstants.STYLE_EDITABLE] = 0;

graph.getStylesheet().putCellStyle(pdPortType.DATA, data_port);

var variable = angular.copy(mask);
variable[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
variable[mxConstants.STYLE_ROUNDED] = true;
variable[mxConstants.STYLE_SHADOW] = true;
variable[mxConstants.STYLE_ARCSIZE] = 100;
variable[mxConstants.STYLE_FILLCOLOR] = 'lightblue';
variable[mxConstants.STYLE_STROKECOLOR] = 'none'; //#000000';
variable[mxConstants.STYLE_FONTCOLOR] = '#FFFFFF';
variable[mxConstants.STYLE_FONTSIZE] = 20;
variable[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
variable[mxConstants.STYLE_RESIZABLE] = '0';
variable[mxConstants.STYLE_EDITABLE] = 1;
variable[mxConstants.STYLE_AUTOSIZE] = 1;
variable[mxConstants.STYLE_SPACING] = 10;

//variable[mxConstants.STYLE_STROKEWIDTH] = 0;
variable[mxConstants.STYLE_FILL_OPACITY] = 100;

graph.getStylesheet().putCellStyle(pdVertexType.VARIABLE, variable);



var nested = angular.copy(mask);

function NestedShape() {
    mxCylinder.call(this);
}
mxUtils.extend(NestedShape, mxCylinder);

NestedShape.prototype.paintVertexShape = function(c, x, y, w, h) {
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
				mxConstraintHandler.prototype.intersects = function(icon, point, source, existingEdge)
				{
					return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
				};
graph.getAllConnectionConstraints = function(terminal)
{
    if (terminal.cell != null && terminal.cell.pdType != null && terminal.cell.pdType == pdVertexType.SPLITTER)
    {
        return [new mxConnectionConstraint(new mxPoint(0.5, 0))];
    }

    return null;
};

graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
{
    if(cell!=null)
    {
        if(cell.FillMenu!=null)
            cell.FillMenu(menu);
        if(cell.parent.FillMenu!=null)
            cell.parent.FillMenu(menu);
    }

    // menu.addItem('Item 1', null, function()
    // {
    //     alert('Item 1');
    // });
    
    // menu.addItem('Item 2', null, function()
    // {
    //     alert('Item 2');
    // });

    // menu.addSeparator();
    
    // var submenu1 = menu.addItem('Submenu 1', null, null);
    
    // menu.addItem('Subitem 1', null, function()
    // {
    //     alert('Subitem 1');
    // }, submenu1);
    // menu.addItem('Subitem 1', null, function()
    // {
    //     alert('Subitem 2');
    // }, submenu1);
};