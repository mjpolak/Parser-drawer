mxGraph.prototype.addListenerOnce = function(event, funct) {
    var index = this.eventListeners.indexOf(name);
    if (index < 0) {
        this.addListener(event, funct);
    }
}