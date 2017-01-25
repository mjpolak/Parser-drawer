var pdVertexType = {
    START: 'start',
    END: 'end',
    NESTED: 'nested',
    RECURSION: 'recursion',
    MASK: 'mask',
    VARIABLE: 'variable'
}

var pdSourcesVertex = [
    pdVertexType.START,
    pdVertexType.MASK
];

var pdTargetVertex = [
    pdVertexType.END,
    pdVertexType.MASK
]

var pdContainersVertex = [
    pdVertexType.NESTED
]