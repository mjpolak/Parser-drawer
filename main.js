angular.module('todoApp', ['ngDialog', 'ui.bootstrap', 'ui.layout'])
    .controller('BodyController', function($scope, ngDialog) {
        $scope.xml = `<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="start" style="start" parent="1" vertex="1">
      <mxGeometry x="-231" y="-324" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="koniec" style="end" parent="1" vertex="1">
      <mxGeometry x="200" y="540" width="35" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="58" style="mask" vertex="1" parent="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="-190" y="-165" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="57" value="V" style="data_port" vertex="1" parent="58">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="60" style="mask" vertex="1" parent="1">
      <Object nodeName="&lt;" as="value"/>
      <mxGeometry x="-188" y="-76" width="98" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="59" value="V" style="data_port" vertex="1" parent="60">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="62" value="" edge="1" parent="1" source="58" target="60">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="64" style="mask" vertex="1" parent="1">
      <Object nodeName="*" as="value"/>
      <mxGeometry x="40" y="-74" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="63" value="V" style="data_port" vertex="1" parent="64">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="65" value="" edge="1" parent="1" source="60" target="64">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="67" style="mask" vertex="1" parent="1">
      <Object nodeName=" " as="value"/>
      <mxGeometry x="40" y="39" width="100" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="66" value="V" style="data_port" vertex="1" parent="67">
      <mxGeometry x="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="-10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="68" value="" edge="1" parent="1" source="64" target="67">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="69" style="variable" vertex="1" parent="1">
      <Object nodeName="tag" as="value"/>
      <mxGeometry x="404" y="-88" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="70" value="" edge="1" parent="1" source="63" target="69">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="71" value="" edge="1" parent="1" source="67" target="3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="75" style="splitter" vertex="1" parent="1">
      <Object nodeName="" as="value"/>
      <mxGeometry x="-270" y="-220" width="90" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="72" value="1" style="out_port" vertex="1" parent="75">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="10" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="73" value="2" style="out_port" vertex="1" parent="75">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="35" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="74" value="3" style="out_port" vertex="1" parent="75">
      <mxGeometry y="1" width="20" height="20" relative="1" as="geometry">
        <mxPoint x="60" y="-10" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="76" value="" edge="1" parent="1" source="72" target="60">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="77" value="" edge="1" parent="1" source="73" target="58">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="78" value="" style="entryX=0.5;entryY=0;" edge="1" parent="1" source="2" target="75">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>
`;
        $scope.test_cases = `x<test arg="5"></test>`;
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

        $scope.rotRight = function()
        {
            var cell = graph.getSelectionCell();
            var vertexHandler = graph.createHandler(graph.view.getState(cell));
            vertexHandler.rotateCell(cell,90);
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
            var consume=[];
            var buffer = '';
            var ChangeCurrent = function(cell) {

                current_cell = cell;

                var edges = current_cell.edges.filter(x => x.source == current_cell);
                if (edges.length > 0 && edges[0].target.GetPossibleCells != null)
                {
                    possible_cells = edges[0].target.GetPossibleCells();
                    consume = possible_cells.map(x=>0);
                }
                else
                    possible_cells = [];
            }

            var AddToVariables = function(text)
            {
                    if (current_cell.children != null) {
                        var data_sources = current_cell.children.filter((x) => pdDataSources.includes(x.style));
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
            var result={};

            var Step = function(end)
            {
                possible_cells.forEach(function(element,idx) {
                    if(consume[idx]==0)
                    {
                        if(element.Match(buffer))
                        {
                            consume[idx] = buffer.length;
                        } else {
                            if(!element.PartialMatch(buffer))
                                consume[idx] = -1;
                        }
                    } 
                }, this);

                var all_check = !consume.some(x=>x==0);
                
                if( all_check || end)
                {
                    var next_id = consume.findIndex(x=>x>0);
                    if (next_id >= 0) {
                        var other = possible_cells[next_id];
                        var to_skip = consume[next_id];
                        var rest = buffer.substring(0,to_skip);
                        var temp_buffer = buffer.substr(to_skip,buffer.length-to_skip);
                        
                        var len = temp_buffer.length;
                        ChangeCurrent(other);

                        AddToVariables(rest);

                        buffer = '';
                        for(var i=0;i<len;i++)
                        {
                            buffer+=temp_buffer[i];
                            var res = Step(end);
                            if( res.error != null)
                                return res;
                        }

                    } else {
                        if (current_cell.Match == null || !current_cell.Match(buffer)) {
                            return {message:'Unexpected value at ' + dr.pos,error:true}
                        }
                        AddToVariables(buffer);
                        consume = possible_cells.map(x=>0);
                        buffer = '';
                    }



                }
                return {}
            }

            while ((c = dr.Next()) != null) {
                buffer+=c;
                result = Step();
                if(result.error != null)
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