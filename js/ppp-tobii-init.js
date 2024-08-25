/* initialise Tobii lightboxes within galleries */
var pppTobii ; /* Tobii lightboxes */
var pppTobiiParams= { captions: false };

function pppTobiiInit () {

    // Cloudinary source URL
    var pppCldBase = "https://res.cloudinary.com/dpulivsul/image/upload/";
    var pppCldBaseLen = pppCldBase.length;
    var pppDefaultWidth = '600';
    var pppDefaultGroup = '';
    var pppGalleryClass= "jgallery";

    // for each lightbox
    $(".lightbox").each(function () {

        // is it in a gallery? if so copy down width and group attributes if not specified
        var pppThisParent= $(this).parent();
        var pppInGallery= pppThisParent.hasClass(pppGalleryClass);

        // is the thumbnail width specified here? gallery width overrides this
        var pppThisWidth= $(this).attr("data-tmb-width");
        if (pppInGallery) {pppThisWidth = pppThisParent.attr("data-tmb-width")}
        if (typeof pppThisWidth === "undefined") { 
            pppThisWidth= pppDefaultWidth
            $(this).attr("data-tmb-width", pppThisWidth);
        } ;

        // is data group specified here? only override with gallery group if none specified
        var pppThisGroup = $(this).attr("data-group");
        if (typeof pppThisGroup === "undefined") { 
            if (pppInGallery) {
                pppThisGroup = pppThisParent.attr("data-group");
                $(this).attr("data-group", pppThisGroup);
            } else {
                pppThisGroup= pppDefaultGroup ;
            }
        }

        // apply Cloudinary resizing to generate lightbox thumbnails
        var pppThisSrc = $(this).attr("href");
        var pppThisTmbSrc = pppCldBase + "w_" + pppThisWidth + ",c_scale/" + pppThisSrc.substring(pppCldBaseLen);
        $(this).children("img").attr("src", pppThisTmbSrc);

    });

    // setup the lightboxes
    pppTobii = new Tobii( pppTobiiParams );
}

