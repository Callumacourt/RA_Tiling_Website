export function getWindowWidth() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let viewPort = '';

    enum DeviceType {
        MOBILE = "mobile",
        TABLET = "tablet",
        DESKTOP = "desktop"
    }

    if (vw <= 768) {
        viewPort = DeviceType.MOBILE;
    } else if (vw <= 1024) {
        viewPort = DeviceType.TABLET;
    } else {
        viewPort = DeviceType.DESKTOP;
    }

    return viewPort;
}