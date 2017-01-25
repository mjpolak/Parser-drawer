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
            editor.execute('undo');
        }
        $scope.redo = function () {
            editor.execute('redo');
        }

        $scope.group = function () {
            editor.execute('group');
        }

        $scope.ungroup = function () {
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


            ngDialog.open({
                template: '<p >File name:</p><input type="text" ng-model="file_name"/> .xml</br><button type="button" class="btn btn-info" ng-click="download()">Download</button></br>',
                plain: true,
                controller: ['$scope', function ($scopedx) {
                    $scopedx.download = function () {
                        var encoder = new mxCodec();
                        var node = encoder.encode(graph.getModel());
                        this.xml = mxUtils.getPrettyXml(node);
                        download(this.xml, $scopedx.file_name + ".xml", 'text/html');
                        $scopedx.closeThisDialog("true");
                    }
                }]
            });
        }

        $scope.open = function () {

            ngDialog.open({
                template: '<p >File name:</p><input type="file" id="file" name="file" enctype="multipart/form-data" />',
                plain: true,
                controller: ['$scope', function ($scopedx) {
                    function readFile(evt) {
                        var files = evt.target.files;
                        var file = files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            $scope.xml = this.result;
                            $scope.fromXML();
                            $scopedx.closeThisDialog("true");
                        }
                        reader.readAsText(file)
                    }

                    $scopedx.$on('ngDialog.opened', function (e, $dialog) {
                        document.getElementById('file').addEventListener('change', readFile, false);
                    });
                }]
            });
        }
        var listener = graph.addListener(mxEvent.MOUSE_DOWN, function(sender, evt)
        {
            alert("ok");
        });
        $scope.createNew = function () {

        }

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('Browser is not supported!', 200, false);
        } else {
            var parent = graph.getDefaultParent();
            var keyHandler = new mxKeyHandler(graph);
            keyHandler.bindKey(46, function (evt) {
                if (graph.isEnabled()) {
                    graph.removeCells();
                }
            });

            keyHandler.bindKey(79, function (evt) {
                console.log(graph.getSelectionCell().value)
            });

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

            var zmienna = {
                source: false,
                target: false,
                nodeName: 'V',
                clone: function () {
                    return angular.copy(this);
                }
            }

            graph.getModel().beginUpdate();
            try {

                var v1 = graph.insertVertex(parent, null, start, 200, 20, 30, 30, pdVertexType.START);
                var v2 = graph.insertVertex(parent, null, koniec, 200, 200, 30, 30, pdVertexType.END);
                var v3 = graph.insertVertex(parent, null, obiekt, 400, 100, 100, 50, pdVertexType.MASK);
                var v4 = graph.insertVertex(parent, null, zmienna, 400, 200, 50, 50, pdVertexType.VARIABLE);

                var e1 = graph.insertEdge(parent, null, '', v1, v3);
                var e2 = graph.insertEdge(parent, null, '', v3, v2);
            } finally {
                graph.getModel().endUpdate();
            }


        }
    });