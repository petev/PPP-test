// each scrollama instance must have specific class [.scrolly]
// optional data-scrolly-offset parameter [0.33]
// steps are instance children with specific class [.scrollystep]

var scrollyClass= '.scrolly' ;
var scrollyStepClass= '.step' ;
var scrollyIdBase= 'pppScrolly' ;
var iScrollyId= 1;
var pppScroller= [];
var scrollyDefaultOffset= 0.33 ;

var scrollyStepScaler= '.storyimg.scrollscale' ;
var pppScaleStart= 0.3 ;
var pppScaleBy= 0.2 ;

function pppScrollamaInit () {
/*  original 
    var pppScroller = scrollama();
    pppScroller.setup({
        step: "#scrolly article .step",
        offset: 0.33,
        debug: false
    });
    pppScroller.onStepEnter(scrollStepEnter);
    pppScroller.onStepExit(scrollStepExit);
*/
    $(scrollyClass).each( function(iScrolly){

        console.log('Found scrolly ' + (iScrolly+1));

        // assign ID if required
        if (!($(this).attr('id'))) {
            $(this).attr('id', scrollyIdBase + iScrollyId);
            iScrollyId++;
        }

        // handle data offset
        var thisScrollyOffset= scrollyDefaultOffset ;
        if (typeof $(this).attr('data-scrolly-offset') !== 'undefined') {
            thisScrollyOffset= $(this).attr('data-scrolly-offset');
        } 
        console.log('Offset ' + thisScrollyOffset);

        // assign parent ID as data-scrolly-id to each step
        $(this).find(scrollyStepClass).attr('data-scrolly-id', $(this).attr('id'));

        // intialise
        var pppScrollyStepStr=  '#' + $(this).attr('id') + ' ' + scrollyStepClass;

        pppScroller[iScrolly] = scrollama();

        // does scroller have an element which needs scaling by scroll progress
        var pppHasProgress= ($(this).find(scrollyStepScaler).length !== 0);

        pppScroller[iScrolly].setup({
            step: pppScrollyStepStr,
            offset: thisScrollyOffset,
            progress: pppHasProgress,
            debug: false
        });
        pppScroller[iScrolly].onStepEnter(scrollStepEnter);
        pppScroller[iScrolly].onStepExit(scrollStepExit);
        if (pppHasProgress) {
            console.log('Scroller has zooming element');
            pppScroller[iScrolly].onStepProgress(scrollStepProgress);
        }

    });
}

function scrollStepEnter(response) {
    // response.element.classList.add("is-active");
    // $(response.element).closest(#<data-scrolly-id>) is the scroller parent
    console.log(response);
    $(response.element).addClass("is-active");
}

function scrollStepExit(response) {
    // $(response.element).closest(#<data-scrolly-id>) is the scroller parent
    console.log(response);
    $(response.element).removeClass("is-active");
}

function scrollStepProgress(response) {
    var pppScaleThis= $(response.element).find(scrollyStepScaler);
    var pppScale= ((Math.max (0, (response.progress - pppScaleStart))) / (1.0 - pppScaleStart) * pppScaleBy) + 1;
    console.log('Progress ' + response.progress + ', scale by ' + pppScale);
    pppScaleThis.css('transform', 'scale(' + pppScale + ')');
}
