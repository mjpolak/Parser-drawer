var pdVertexType = {
    START: 'start',
    END: 'end',
    NESTED: 'nested',
    RECURSION: 'recursion',
    MASK: 'mask',
    VARIABLE: 'variable'
}

var pdEdgeType = {
    VARIABLE: 'variable_edge'
}

var pdPortType = {
    DATA: 'data_port',
    IN: 'in_port',
    OUT: 'port'
}

var pdDataSources = [
    pdPortType.DATA
];

var pdDataTargets = [
    pdVertexType.VARIABLE
];

var pdSourcesVertex = [
    pdVertexType.START,
    pdVertexType.MASK
];

var pdTargetVertex = [
    pdVertexType.END,
    pdVertexType.MASK,
    pdVertexType.VARIABLE
]

var pdContainersVertex = [
    pdVertexType.NESTED,
]