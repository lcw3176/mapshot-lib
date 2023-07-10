export class ProxyTile {

    requestImage(proxyProfile, uuid, onSuccess) {
        var proxyTileOnErrorEvent = new CustomEvent("proxyTileOnError");

        var image = new Image();
        image.crossOrigin = "*";
        image.src = proxyProfile.getProxyUrl() + "/" + uuid;

        image.onload = function () {
            onSuccess(image);
        };

        image.onerror = function () {
            document.body.dispatchEvent(proxyTileOnErrorEvent);
        }
    }
}