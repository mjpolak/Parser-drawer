angular.module('todoApp', ['ngDialog', 'ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function($scope, ngDialog) {
        $scope.xml = `<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="start" style="start" parent="1" vertex="1">
      <mxGeometry x="200" y="20" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="koniec" style="end" parent="1" vertex="1">
      <mxGeometry x="200" y="540" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="4" style="variable" parent="1" vertex="1">
      <Object nodeName="dsaddsadsa" as="value"/>
      <mxGeometry x="540" y="160" width="130" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="6" style="mask" parent="1" vertex="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="210" y="160" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="5" value="V" style="data_port" parent="6" vertex="1">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="7" value="" parent="1" source="2" target="6" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="10" style="splitter" parent="1" vertex="1">
      <Object nodeName="" as="value"/>
      <mxGeometry x="150" y="320" width="115" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="8" value="1" style="out_port" parent="10" vertex="1">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="9" value="2" style="out_port" parent="10" vertex="1">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="35" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="22" value="3" style="out_port" vertex="1" parent="10">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="60" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="23" value="4" style="out_port" vertex="1" parent="10">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="85" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="11" value="" style="entryX=0.5;entryY=0;" parent="1" source="6" target="10" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="13" style="mask" parent="1" vertex="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="115" y="432" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="12" value="V" style="data_port" parent="13" vertex="1">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="14" value="" parent="1" source="8" target="13" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="17" value="" parent="1" source="9" target="13" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="18" value="" parent="1" source="12" target="4" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="19" value="" parent="1" source="5" target="4" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="20" value="" parent="1" source="13" target="3" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="24" value="" edge="1" parent="1" source="22" target="13">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="25" value="" edge="1" parent="1" source="23" target="13">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>

`;
        $scope.test_cases = "Testowe dane do testów";
        $scope.json_result = "";
        $scope.zoomIn = function() {
            graph.zoomIn();
        }

        $scope.zoomOut = function() {

            graph.zoomOut();
        }

        $scope.focusAll = function() {
            graph.fit();
        }

        $scope.undo = function() {
            editor.execute('undo');
        }
        $scope.redo = function() {
            editor.execute('redo');
        }

        $scope.group = function() {
            editor.execute('group');
        }

        $scope.ungroup = function() {
            editor.execute('ungroup');
        }

        $scope.toXML = function() {
            var encoder = new mxCodec();
            var node = encoder.encode(graph.getModel());
            this.xml = mxUtils.getPrettyXml(node);
        }

        $scope.fromXML = function() {
            var doc = mxUtils.parseXml(this.xml);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());

            var start = false;
            var end = false;
            var data = graph.getChildVertices();

            data.forEach(function(element) {
                if (element.style == pdVertexType.START) {
                    if (start)
                        graph.getModel().remove(element);
                    else
                        start = true;
                }
                if (element.style == pdVertexType.END) {
                    if (end)
                        graph.getModel().remove(element);
                    else
                        end = true;
                }
            });

            var cells = Object.keys(model.cells).map(function(x) { return model.cells[x] });
            cells.forEach(function(element) {
                pdFlow.CustomizeCell(element)
            }, this);
        }

        $scope.fromXML();

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
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }

        $scope.download = function() {


            ngDialog.open({
                template: '<p >File name:</p><input type="text" ng-model="file_name"/> .xml</br><button type="button" class="btn btn-info" ng-click="download()">Download</button></br>',
                plain: true,
                controller: ['$scope', function($scopedx) {
                    $scopedx.download = function() {
                        var encoder = new mxCodec();
                        var node = encoder.encode(graph.getModel());
                        this.xml = mxUtils.getPrettyXml(node);
                        download(this.xml, $scopedx.file_name + ".xml", 'text/html');
                        $scopedx.closeThisDialog("true");
                    }
                }]
            });
        }

        $scope.open = function() {

            ngDialog.open({
                template: '<p >File name:</p><input type="file" id="file" name="file" enctype="multipart/form-data" />',
                plain: true,
                controller: ['$scope', function($scopedx) {
                    function readFile(evt) {
                        var files = evt.target.files;
                        var file = files[0];
                        var reader = new FileReader();
                        reader.onload = function() {
                                $scope.xml = this.result;
                                $scope.fromXML();
                                $scopedx.closeThisDialog("true");
                            }
                            //console.log(file);
                        reader.readAsText(file)
                    }

                    $scopedx.$on('ngDialog.opened', function(e, $dialog) {
                        document.getElementById('file').addEventListener('change', readFile, false);
                    });
                }]
            });
        }



        var insertVertex = function(vertexCreator) {
            var event = {
                mouseDown: function(sender, evt) {
                    var parent;
                    if (evt.state == null) {
                        parent = graph.getDefaultParent();
                    } else
                    if (evt.state.cell != null && pdContainersVertex.includes(evt.state.cell))
                        parent = evt.parent;

                    if (parent) {

                        var vertex = vertexCreator();
                        var pt = mxUtils.convertPoint(graph.container, evt.evt.clientX, evt.evt.clientY);
                        editor.addVertex(null, vertex, pt.x, pt.y);

                        //graph.insertVertex(parent, null, obiekt, pt.x, pt.y, 120, 30, pdVertexType.MASK);
                    }
                    graph.removeMouseListener(event);
                },
                mouseMove: function(sender, evt) {},
                mouseUp: function(sender, evt) {}
            }
            graph.addMouseListener(event);
        }


        $scope.createNewMask = function() {

            var create = function() {
                var vertex = graph.createVertex(parent, null, { nodeName: '*' }, 100, 20, 100, 50, pdVertexType.MASK);
                pdFlow.CustomizeCell(vertex);
                var v11 = graph.insertVertex(vertex, null, 'V', 1, 0, 20, 20, pdPortType.DATA);
                v11.geometry.offset = new mxPoint(-10, -10);
                v11.geometry.relative = true;
                return vertex;
            }
            insertVertex(create);
        }

        $scope.createNewSplitter = function() {

            var create = function() {
                var vertex = graph.createVertex(parent, null, { nodeName: '' }, 100, 20, 65, 30, pdVertexType.SPLITTER);
                pdFlow.CustomizeCell(vertex);
                vertex.AddNode();
                vertex.AddNode();
                vertex.AddNode();
                return vertex;
            }
            insertVertex(create);
        }

        $scope.createNewVariable = function() {

            var create = function() {
                var vertex = graph.createVertex(parent, null, { nodeName: 'Zmienna' }, 400, 200, 50, 50, pdVertexType.VARIABLE);
                pdFlow.CustomizeCell(vertex);
                graph.cellSizeUpdated(vertex, false);
                return vertex;
            }
            insertVertex(create);
        }

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            var parent = graph.getDefaultParent();
            var keyHandler = new mxKeyHandler(graph);
            keyHandler.bindKey(46, function(evt) {
                if (graph.isEnabled()) {
                    graph.removeCells();
                }
            });

            keyHandler.bindKey(79, function(evt) {
                console.log(graph.getSelectionCell().value)
            });



            var obiekt = {
                nodeName: 'Obiekt',
                clone: function() {
                    return angular.copy(this);
                }
            }

            var zmienna = {
                nodeName: 'V',
                clone: function() {
                    return angular.copy(this);
                }
            }

            graph.getModel().beginUpdate();
            try {

                // var v1 = graph.insertVertex(parent, null, 'start', 200, 20, 35, 35, pdVertexType.START);
                // var v2 = graph.insertVertex(parent, null, 'koniec', 200, 200, 35, 35, pdVertexType.END);
            } finally {
                graph.getModel().endUpdate();
            }


        }

        $scope.startProcessing = function() {

            function DataReader() {
                this.pos = 0;
                this.Next = function() {

                    if (this.pos < $scope.test_cases.length) {

                        this.pos++;
                        return $scope.test_cases[this.pos - 1];
                    } else
                        return null;
                }
            }


            var model = graph.getModel();
            var all_cells = Object.keys(model.cells).map(function(x) { return model.cells[x] });

            var start_cell;
            var end_cell;
            var variables = {};

            all_cells.forEach(function(element) {
                switch (element.style) {
                    case pdVertexType.START:
                        start_cell = element;
                        break;
                    case pdVertexType.END:
                        end_cell = element;
                        break;
                    case pdVertexType.VARIABLE:
                        variables[element.value.nodeName] = '';
                        break;
                }
            }, this);

            var current_cell;

            var dr = new DataReader();

            var possible_cells = [];

            var ChangeCurrent = function(cell) {

                console.log("Ide do cell" + cell.value.nodeName);
                current_cell = cell;

                var edges = current_cell.edges.filter(x => x.source == current_cell);
                if (edges.length > 0 && edges[0].target.GetPossibleCells != null)
                    possible_cells = edges[0].target.GetPossibleCells();
                else
                    possible_cells = [];
            }

            ChangeCurrent(start_cell);

            var FindMatchingWays = function(char) {
                for (var i = 0, l = possible_cells.length; i < l; i++) {
                    if (possible_cells[i].Match(char))
                        return possible_cells[i];
                }
                return null;
            }

            var error = false;
            var result;
            while ((c = dr.Next()) != null) {

                var other = FindMatchingWays(c);
                if (other != null) {
                    ChangeCurrent(other);
                } else {
                    if (current_cell.Match == null || !current_cell.Match(c)) {
                        result = 'Unexpected value at ' + dr.pos;
                        error = true;
                        break;
                    }
                }

                if (current_cell.children != null) {
                    var data_sources = current_cell.children.filter((x) => pdDataSources.includes(x.style));
                    data_sources.forEach(function(element) {
                        if (element.edges) {
                            var targets = element.edges.map(x => x.target);
                            targets.forEach(function(element) {
                                variables[element.value.nodeName] += c;
                            }, this);
                        }
                    }, this);
                }
            }

            if (error) {
                $scope.json_result = result;
            } else {
                $scope.json_result = JSON.stringify(variables, null, 2);
            }
        }
    });