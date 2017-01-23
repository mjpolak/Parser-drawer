angular.module('todoApp', ['ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function ($scope) {
        $scope.zoomIn = function () {
            graph.zoomIn();
        }

        $scope.zoomOut = function () {

            graph.zoomOut();
        }

        $scope.focusAll = function () {
            graph.fit();
        }

        $scope.undo = function () {
            //edtitor.undo();
            editor.execute('undo');
        }
        $scope.redo = function () {
            //edtitor.undo();
            editor.execute('redo');
        }

        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        } else {

            // Creates the graph inside the given container


            // Enables rubberband selection
            //new mxRubberband(graph);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();


            // Settings for edges

            // Adds cells to the model in a single step

            var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();


            edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.OrthConnector;
            edgeStyle[mxConstants.STYLE_ROUNDED] = true;
            edgeStyle[mxConstants.STYLE_STROKECOLOR] = '#000';
            

            //graph.addListener(mxEvent.CLICK, function (sender, evt) {
            //    //console.log(evt);
            //});

            var keyHandler = new mxKeyHandler(graph);
            keyHandler.bindKey(46, function (evt) {
                //console.log(graph.cellsEditable);
                if (graph.isEnabled()) {
                    graph.removeCells();
                }
            });

            keyHandler.bindKey(79, function (evt) {
                console.log(graph.getEdgeValidationError)
            });
            //edgeStyle[mxConstants.STYLE_EDGE] = 'Loop';
            //edgeStyle[mxConstants.STYLE_CURVED] = '1';


            var start = {
                source: true,
                target: false,
                toString: function () {
                    return "";
                }
            }

            var koniec = {
                source: false,
                target: true,
                toString: function () {
                    return "";
                }
            }

            var obiekt = {
                source: true,
                target: true,
                toString: function () {
                    return "Obiekt";
                }
            }


            graph.getModel().beginUpdate();
            try {

                var v1 = graph.insertVertex(parent, null, start, 200, 20, 30, 30, 'start');
                var v2 = graph.insertVertex(parent, null, koniec, 200, 200, 30, 30, 'end');
                var v3 = graph.insertVertex(parent, null, obiekt, 400, 100, 100, 50);

                graph.insertEdge(parent, null, '', v1, v3);
                graph.insertEdge(parent, null, '', v3, v2);
                //   var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                //   var e1 = graph.insertEdge(parent, null, '', v1, v2);
                //   var e2 = graph.insertEdge(parent, null, '', v1, v1, mxConstants.STYLE_CURVED+'=1;'+mxConstants.STYLE_EDGE+'=Loop');
            } finally {
                // Updates the display
                graph.getModel().endUpdate();
            }
            //var toolbox = document.getElementById('toolbox');


            //wnd = new mxWindow('Test', toolbox, (0.8 * container.clientWidth) - 200, 50, 200, null, true, true);
            //wnd.setMaximizable(false);
            //wnd.setScrollable(false);
            //wnd.setResizable(false);
            //wnd.setMinimizable(false);
            //wnd.setVisible(true);

        }
    });