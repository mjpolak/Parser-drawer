angular.module('todoApp', ['ngDialog', 'ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function($scope, ngDialog) {
        $scope.xml = `<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="start" style="start" parent="1" vertex="1" pdType="start">
      <mxGeometry x="-516" y="-316" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="koniec" style="end" parent="1" vertex="1" pdType="end">
      <mxGeometry x="200" y="540" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="69" style="variable" parent="1" vertex="1" pdType="variable">
      <Object nodeName="tag" as="value"/>
      <mxGeometry x="-291" y="-10" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="75" style="splitter" parent="1" vertex="1" pdType="splitter">
      <Object nodeName="" as="value"/>
      <mxGeometry x="-423" y="-244" width="65" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="72" value="1" style="out_port" parent="75" vertex="1" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="73" value="2" style="out_port" parent="75" vertex="1" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="35" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="76" value="" parent="1" source="72" target="60" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="77" value="" parent="1" source="73" target="58" edge="1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="-230" y="-190" as="targetPoint"/>
        <Array as="points">
          <mxPoint x="-377" y="-180"/>
          <mxPoint x="-235" y="-180"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="78" value="" style="entryX=0.5;entryY=0;" parent="1" source="2" target="75" edge="1" pdType="entryX=0.5">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="79" style="nested" vertex="1" pdType="nested" parent="1">
      <Object nodeName="argumenty" as="value"/>
      <mxGeometry x="-521" y="98" width="651" height="362" as="geometry"/>
    </mxCell>
    <mxCell id="82" style="mask" vertex="1" pdType="mask" parent="79">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="32" y="43" width="166" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="81" value="V" style="data_port" vertex="1" parent="82" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="84" style="variable" vertex="1" pdType="variable" parent="79">
      <Object nodeName="arg_name" as="value"/>
      <mxGeometry x="249" y="25" width="110" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="85" value="" edge="1" parent="79" source="81" target="84">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="87" style="mask" vertex="1" pdType="mask" parent="79">
      <Object nodeName="=&quot;" as="value"/>
      <mxGeometry x="71" y="132" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="86" value="V" style="data_port" vertex="1" parent="87" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="88" value="" edge="1" parent="79" source="82" target="87">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="90" style="mask" vertex="1" pdType="mask" parent="79">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="232" y="133" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="89" value="V" style="data_port" vertex="1" parent="90" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="91" value="" edge="1" parent="79" source="87" target="90">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="93" style="mask" vertex="1" pdType="mask" parent="79">
      <Object nodeName="&quot;" as="value"/>
      <mxGeometry x="391" y="142" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="92" value="V" style="data_port" vertex="1" parent="93" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="94" value="" edge="1" parent="79" source="90" target="93">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="100" style="splitter" vertex="1" pdType="splitter" parent="79">
      <Object nodeName="" as="value"/>
      <mxGeometry x="411" y="224" width="65" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="97" value="1" style="out_port" vertex="1" parent="100" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="98" value="2" style="out_port" vertex="1" parent="100" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="35" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="101" value="" style="entryX=0.5;entryY=0;" edge="1" parent="79" source="93" target="100">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="105" style="mask" vertex="1" pdType="mask" parent="79">
      <Object nodeName=" " as="value"/>
      <mxGeometry x="260" y="265" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="104" value="V" style="data_port" vertex="1" parent="105" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="106" value="" edge="1" parent="79" source="98" target="105">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="118" style="splitter" vertex="1" pdType="splitter" parent="79">
      <Object nodeName="" as="value"/>
      <mxGeometry x="125" y="303" width="65" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="115" value="1" style="out_port" vertex="1" parent="118" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="116" value="2" style="out_port" vertex="1" parent="118" pdType="out_port">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="35" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="119" value="" style="entryX=0.5;entryY=0;" edge="1" parent="79" source="105" target="118">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="120" value="" edge="1" parent="79" source="115" target="82">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="145" y="353"/>
          <mxPoint x="51" y="353"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="122" style="variable" vertex="1" pdType="variable" parent="79">
      <Object nodeName="arg_value" as="value"/>
      <mxGeometry x="390" y="64" width="110" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="123" value="" edge="1" parent="79" source="89" target="122">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="332" y="92"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="58" style="mask" parent="1" vertex="1" pdType="mask">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="-304" y="-143" width="140" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="57" value="V" style="data_port" parent="58" vertex="1" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="62" value="" parent="1" source="58" target="60" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="60" style="mask" parent="1" vertex="1" pdType="mask">
      <Object nodeName="&lt;" as="value"/>
      <mxGeometry x="-581" y="-69" width="108" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="59" value="V" style="data_port" parent="60" vertex="1" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="65" value="" parent="1" source="60" target="64" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="64" style="mask" parent="1" vertex="1" pdType="mask">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="-750" y="17" width="108" height="55" as="geometry"/>
    </mxCell>
    <mxCell id="63" value="V" style="data_port" parent="64" vertex="1" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="68" value="" parent="1" source="64" target="67" edge="1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="80" value="" edge="1" parent="1" source="63" target="69">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="67" style="mask" parent="1" vertex="1" pdType="mask">
      <Object nodeName=" " as="value"/>
      <mxGeometry x="-667" y="120" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="66" value="V" style="data_port" parent="67" vertex="1" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="83" value="" edge="1" parent="1" source="67" target="82">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="96" style="mask" vertex="1" pdType="mask" parent="1">
      <Object nodeName="&gt;" as="value"/>
      <mxGeometry x="-142" y="525" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="95" value="V" style="data_port" vertex="1" parent="96" pdType="data_port">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="102" value="" edge="1" parent="1" source="97" target="96">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="103" value="" edge="1" parent="1" source="96" target="3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="121" value="" edge="1" parent="1" source="116" target="96">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>

`;
        $scope.test_cases = `x<test arg="5" arg2="4">`;
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

        $scope.rotRight = function() {
            var cell = graph.getSelectionCell();
            var vertexHandler = graph.createHandler(graph.view.getState(cell));
            vertexHandler.rotateCell(cell, 90);
            vertexHandler.destroy();
            graph.refresh();
        }

        $scope.fromXML = function() {
            var doc = mxUtils.parseXml(this.xml);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());

            var start = false;
            var end = false;
            var data = graph.getChildVertices();

            data.forEach(function(element) {
                if (element.pdType == pdVertexType.START) {
                    if (start)
                        graph.getModel().remove(element);
                    else
                        start = true;
                }
                if (element.pdType == pdVertexType.END) {
                    if (end)
                        graph.getModel().remove(element);
                    else
                        end = true;
                }
            });

            var cells = Object.keys(model.cells).map(function(x) { return model.cells[x] });
            cells.forEach(function(element) {
                var type = element.pdType;
                if (type == null && element.style != null) {
                    type = element.style.split(';')[0];
                }
                pdFlow.CustomizeCell(element, type)
            }, this);

            graph.refresh();
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
                pdFlow.CustomizeCell(vertex, pdVertexType.MASK);
                var v11 = graph.insertVertex(vertex, null, 'V', 1, 0, 20, 20, pdPortType.DATA);
                pdFlow.CustomizeCell(v11, pdPortType.DATA)
                v11.geometry.offset = new mxPoint(-10, -10);
                v11.geometry.relative = true;
                return vertex;
            }
            insertVertex(create);
        }

        $scope.createNewSplitter = function() {

            var create = function() {
                var vertex = graph.createVertex(parent, null, { nodeName: '' }, 100, 20, 65, 30, pdVertexType.SPLITTER);
                pdFlow.CustomizeCell(vertex, pdVertexType.SPLITTER);
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
                pdFlow.CustomizeCell(vertex, pdVertexType.VARIABLE);
                graph.cellSizeUpdated(vertex, false);
                return vertex;
            }
            insertVertex(create);
        }

        $scope.createNewNested = function() {

            var create = function() {
                var vertex = graph.createVertex(parent, null, { nodeName: 'Nested' }, 400, 200, 50, 50, pdVertexType.NESTED);
                pdFlow.CustomizeCell(vertex,pdVertexType.NESTED);
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
                switch (element.pdType) {
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
            var consume = [];
            var buffer = '';
            var ChangeCurrent = function(cell) {

                current_cell = cell;

                var edges = current_cell.edges.filter(x => x.source == current_cell);
                if (edges.length > 0 && edges[0].target.GetPossibleCells != null) {
                    possible_cells = edges[0].target.GetPossibleCells();
                    consume = possible_cells.map(x => 0);
                } else
                    possible_cells = [];
            }

            var AddToVariables = function(text) {
                if (current_cell.children != null) {
                    var data_sources = current_cell.children.filter((x) => pdDataSources.includes(x.pdType));
                    data_sources.forEach(function(element) {
                        if (element.edges) {
                            var targets = element.edges.map(x => x.target);
                            targets.forEach(function(element) {
                                variables[element.value.nodeName] += text;
                            }, this);
                        }
                    }, this);
                }
            }

            ChangeCurrent(start_cell);

            var error = false;
            var result = {};

            var Step = function(end) {
                possible_cells.forEach(function(element, idx) {
                    if (consume[idx] == 0) {
                        if (element.Match(buffer)) {
                            consume[idx] = buffer.length;
                        } else {
                            if (!element.PartialMatch(buffer))
                                consume[idx] = -1;
                        }
                    }
                }, this);

                var all_check = !consume.some(x => x == 0);

                if (all_check || end) {
                    var next_id = consume.findIndex(x => x > 0);
                    if (next_id >= 0) {
                        var other = possible_cells[next_id];
                        var to_skip = consume[next_id];
                        var rest = buffer.substring(0, to_skip);
                        var temp_buffer = buffer.substr(to_skip, buffer.length - to_skip);

                        var len = temp_buffer.length;
                        ChangeCurrent(other);

                        AddToVariables(rest);

                        buffer = '';
                        for (var i = 0; i < len; i++) {
                            buffer += temp_buffer[i];
                            var res = Step(end);
                            if (res.error != null)
                                return res;
                        }

                    } else {
                        if (current_cell.Match == null || !current_cell.Match(buffer)) {
                            return { message: 'Unexpected value at ' + dr.pos, error: true }
                        }
                        AddToVariables(buffer);
                        consume = possible_cells.map(x => 0);
                        buffer = '';
                    }



                }
                return {}
            }

            while ((c = dr.Next()) != null) {
                buffer += c;
                result = Step();
                if (result.error != null)
                    break;
            }
            Step(true);

            if (result.error) {
                $scope.json_result = result.message;
            } else {
                $scope.json_result = JSON.stringify(variables, null, 2);
            }
        }
    });