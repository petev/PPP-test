/* initialise justifiedGallery(ies) */
function pppjGalleryInit () {

    var pppJGalleryClass= ".jgallery" ;
    var pppJGalleryRowHt= 240;
    var pppJGalleryMargins= 6;
    var pppJGalleryCaptions= false;
    var pppJGalleryLastrow= 'justify';

    $(pppJGalleryClass).each( function(){

        var thisJGalleryRowHt= pppJGalleryRowHt;
        if (typeof $(this).attr('data-jgallery-height') !== 'undefined') {
            thisJGalleryRowHt= $(this).attr('data-jgallery-height');
        }
        $(this).justifiedGallery({ 
            rowHeight: thisJGalleryRowHt, 
            margins: pppJGalleryMargins, 
            captions: pppJGalleryCaptions, 
            lastRow: pppJGalleryLastrow 
        });

    });
    
    


//    $(".jgallery").justifiedGallery({ rowHeight: 240, margins: 6, captions: false, lastRow: 'justify' });
}

