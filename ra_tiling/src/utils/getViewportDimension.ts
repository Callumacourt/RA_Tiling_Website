export function getWindowWidth () {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let viewPort = '';

    enum DeviceType {
        MOBILE = "mobile",
        TABLET = "tablet",
        DESKTOP = "desktop"
    }

    switch(vw) {
        case 768 :
        viewPort = DeviceType.MOBILE;
        break;
        case 1024 : 
        viewPort = DeviceType.TABLET;
        break;
        default:
        viewPort = DeviceType.DESKTOP;
    };
    return viewPort;
};