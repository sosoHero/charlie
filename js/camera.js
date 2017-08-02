(function ($) {
    $.fn.camera = function (options) {
        var settings = $.extend({
            timeout: 1000
        }, options);

        var isAttached = function (ref) {
            return ref.parents(':last').is('html');
        };

        return this.each(function () {
            var img = $(this), src = img.attr('src');
            var updateImage = function () {
                if (!isAttached(img)) {
                    return;
                }

                var random = Math.floor(Math.random() * Math.pow(2, 31)),
                    start = Date.now();
                img.attr('src', src + '?i=' + random);
                console.log("camera.updateImage(): " + src);

                var queueRefresh = function () {
                    var diff = Date.now() - start,
                        timeout = (diff > settings.timeout) ? 0 : settings.timeout - diff;

                    setTimeout(updateImage, timeout);
                    console.log("camera.queueRefresh(): " + src + " - timeout: " + timeout);
                };

                img.one("load", queueRefresh);
                img.one("error", function () {
                    console.log("camera.onError(): " + src);
                    random = Math.floor(Math.random() * Math.pow(2, 31));
                    img.attr('src', src + '?i=' + random);
                });
            };

            updateImage();
        });
    };
}(jQuery));
