angular.module('todoApp', ['ngDialog', 'ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function($scope, ngDialog) {
        $scope.xml = `<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="start" style="start" vertex="1" parent="1">
      <mxGeometry x="200" y="20" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="koniec" style="end" vertex="1" parent="1">
      <mxGeometry x="200" y="540" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="5" style="mask" vertex="1" parent="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="170" y="80" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="4" value="V" style="data_port" vertex="1" parent="5">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="7" style="mask" vertex="1" parent="1">
      <Object nodeName="d" as="value"/>
      <mxGeometry x="170" y="160" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="6" value="V" style="data_port" vertex="1" parent="7">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="9" style="mask" vertex="1" parent="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="170" y="240" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="8" value="V" style="data_port" vertex="1" parent="9">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="11" style="mask" vertex="1" parent="1">
      <Object nodeName=" " as="value"/>
      <mxGeometry x="170" y="330" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="10" value="V" style="data_port" vertex="1" parent="11">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="13" style="mask" vertex="1" parent="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="170" y="430" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="12" value="V" style="data_port" vertex="1" parent="13">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="15" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="14" value="" edge="1" parent="1" source="2" target="5">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="15" value="" edge="1" parent="1" source="5" target="3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="60" y="330"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="16" value="" edge="1" parent="1" source="5" target="7">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="17" value="" edge="1" parent="1" source="7" target="3">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="140" y="350" as="targetPoint"/>
        <Array as="points">
          <mxPoint x="80" y="380"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="18" value="" edge="1" parent="1" source="7" target="9">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="19" value="" edge="1" parent="1" source="9" target="3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="100" y="410"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="20" value="" edge="1" parent="1" source="9" target="11">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="21" value="" edge="1" parent="1" source="11" target="3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="120" y="460"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="22" value="" edge="1" parent="1" source="11" target="13">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="23" value="" edge="1" parent="1" source="13" target="3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="24" style="variable" vertex="1" parent="1">
      <Object nodeName="d_word" as="value"/>
      <mxGeometry x="590" y="200" width="90" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="25" value="" edge="1" parent="1" source="6" target="24">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="26" value="" edge="1" parent="1" source="8" target="24">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="27" style="variable" vertex="1" parent="1">
      <Object nodeName="prefix" as="value"/>
      <mxGeometry x="590" y="80" width="70" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="28" value="" edge="1" parent="1" source="4" target="27">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="29" style="variable" vertex="1" parent="1">
      <Object nodeName="postfix" as="value"/>
      <mxGeometry x="590" y="430" width="80" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="30" value="" edge="1" parent="1" source="12" target="29">
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
                var obiekt = {
                    nodeName: 'Nowa maska',
                    clone: function() {
                        return angular.copy(this);
                    }
                }
                var vertex = graph.createVertex(parent, null, obiekt, 100, 20, 100, 50, pdVertexType.MASK);
                var v11 = graph.insertVertex(vertex, null, 'V', 1, 0, 20, 20, pdPortType.DATA);
                v11.geometry.offset = new mxPoint(-10, 15);
                v11.geometry.relative = true;
                return vertex;
            }
            insertVertex(create);
        }

        $scope.createNewVariable = function() {

            var create = function() {
                var obiekt = {
                    nodeName: 'V',
                    clone: function() {
                        return angular.copy(this);
                    }
                }
                var vertex = graph.createVertex(parent, null, obiekt, 400, 200, 50, 50, pdVertexType.VARIABLE);
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

            function ChangeCurrent(cell) {
                current_cell = cell;

                possible_cells = current_cell.edges.filter(function(e) {
                    return e.source == current_cell
                }).map(function(e) {
                    return e.target
                });
            }

            ChangeCurrent(start_cell);

            while ((c = dr.Next()) != null) {
                console.log(c);
            }
        }
    });