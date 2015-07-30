export default class NavigationActions {
    getCurrentRoute() {
        return window.location.hash.slice(1)
    }
    navigate(path) {
        window.location.hash = '#'+path
    }
}
