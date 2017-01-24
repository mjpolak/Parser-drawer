angular.module('todoApp', ['ngDialog', 'ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function ($scope, ngDialog) {
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

        $scope.group = function () {
            //edtitor.undo();
            editor.execute('group');
        }

        $scope.ungroup = function () {
            //edtitor.undo();
            editor.execute('ungroup');
        }

        $scope.toXML = function () {
            var encoder = new mxCodec();
            var node = encoder.encode(graph.getModel());
            this.xml = mxUtils.getPrettyXml(node);
        }

        $scope.fromXML = function () {
            var doc = mxUtils.parseXml(this.xml);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());
            //console.log(mxUtils.parseXml());
        }

        function download(data, filename, type) {
            var a = document.createElement("a"),
                file = new Blob([data], {
                    type: type
                });
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }

        $scope.download = function () {
            var encoder = new mxCodec();
            var node = encoder.encode(graph.getModel());
            this.xml = mxUtils.getPrettyXml(node);
            download(this.xml, 'plik.xml', 'text/html')
        }

        $scope.open = function () {

            ngDialog.open({
                template: '<p>File name:</p><input type="file" id="file" name="file" enctype="multipart/form-data" />',
                plain: true,
                controller: ['$scope', function ($scope) {
                    function readFile(evt) {
                        var files = evt.target.files;
                        var file = files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            console.log(this.result);
                        }
                        reader.readAsText(file)
                    }
                    document.getElementById('file').addEventListener('change', readFile, false);
                }]
            });
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
                console.log(graph.getSelectionCell().value)
            });
            //edgeStyle[mxConstants.STYLE_EDGE] = 'Loop';
            //edgeStyle[mxConstants.STYLE_CURVED] = '1';


            var start = {
                source: true,
                target: false,
            }

            var koniec = {
                source: false,
                target: true,
            }

            var obiekt = {
                source: true,
                target: true,
                nodeName: 'Obiekt',
                clone: function () {
                    return angular.copy(this);
                }
            }

            mxEvent.addMouseWheelListener(function (evt, up) {
                if (up) {
                    graph.zoomIn();
                } else {
                    graph.zoomOut();
                }
            });



            graph.getModel().beginUpdate();
            try {

                var v1 = graph.insertVertex(parent, null, start, 200, 20, 30, 30, 'start');
                var v2 = graph.insertVertex(parent, null, koniec, 200, 200, 30, 30, 'end');
                var v3 = graph.insertVertex(parent, null, obiekt, 400, 100, 100, 50);



                var e1 = graph.insertEdge(parent, null, '', v1, v3);
                var e2 = graph.insertEdge(parent, null, '', v3, v2);

                //graph.setCellWarning(e1, '<b>Warning:</b>: Hello, World!');
                //   var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
                //   var e1 = graph.insertEdge(parent, null, '', v1, v2);
                //   var e2 = graph.insertEdge(parent, null, '', v1, v1, mxConstants.STYLE_CURVED+'=1;'+mxConstants.STYLE_EDGE+'=Loop');
            } finally {
                // Updates the display
                graph.getModel().endUpdate();
            }

            // graph.getModel().addListener(mxEvent.CHANGE, function (sender, evt) {
            //     var cells = evt.getProperty('edit').changes.map(function (x) {
            //         return x.cell
            //     });

            //     var childs = cells.filter(function (x) {
            //         return x != null && x.isEdge != null
            //     })
            //     var distinct = pdArray.getDistinctBy(childs);
            //     evt.consume();
            //     graph.getModel().beginUpdate();
            //     for (var i in distinct) {
            //         if (distinct[i].isEdge()) {
            //             if (distinct[i].target == null || distinct[i].source == null) {
            //                 graph.setCellWarning(distinct[i], '<b>Warning:</b>: Hello, World!');
            //             } else {
            //                 graph.clearCellOverlays(distinct[i]);
            //             }
            //         }
            //     }
            //     graph.getModel().endUpdate();
            // });
        }
    });