/* wait for jQuery... */
function defer(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function () { defer(method) }, 50);
    }
}

defer(function () {

    pppTobiiInit ();
    pppjGalleryInit ();
    pppScrollamaInit ();

});
