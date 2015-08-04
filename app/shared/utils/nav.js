export default {
    getCurrentRoute : function() {
        return window.location.hash.slice(1)
    },
    navigate : function(path) {
        window.location.hash = '#'+path
    }
}
