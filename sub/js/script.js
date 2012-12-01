/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 28.11.12
 * Time: 18:06
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    var iframe = $("iframe#myFrame");
    var li = $('li.title');
    var selectedLi = $("li.selected");

//    var iframeHeightfirst = $(iframe).contents().find('body').height();
//    iframeHeightfirst = iframeHeightfirst + 10;
//    var iframeHeightFirstpx = iframeHeightfirst.toString() + 'px';
//
//    $(iframe).css('height', iframeHeightFirstpx);



    $("ul.smallCh a").click(function(e){
//        console.log("click");

        url = $(this).attr("href");
        $(iframe).attr('src', url);

//        TODO getting the height of iframe
//        var iframeHeight = $(iframe).contents().find('html').height();
//        alert(iframeHeight)
//        var iframeHeightpx = iframeHeight.toString() + 'px';
//        $(iframe).css('height', iframeHeightpx);


        selectedLi.removeClass('selected');
        selectedLi = $(this.parentNode);
        selectedLi.addClass('selected');

        e.preventDefault();
    });

    li.click(function(){
        var wrappSmallCH = $(this).parent().find('div.wrappSmallCh'); //css('height', ulHeightStr);
        var ulHeight = $(this).parent().find('ul.smallCh').height();
        if(wrappSmallCH.height() > 0){
            if(ulHeight * 3 < 600){
                wrappSmallCH.animate({ height: 0 }, ulHeight * 3);
            }else{
                wrappSmallCH.animate({ height: 0 }, 600);
            }
        }else{
            if(ulHeight * 3 < 600){
                wrappSmallCH.animate({ height: ulHeight }, ulHeight * 3);
            }else{
                wrappSmallCH.animate({ height: ulHeight }, 600);
            }
        }
    });

    setTimeout(function(){
        var wrappSmallCH = $(li[0]).parent().find('div.wrappSmallCh'); //css('height', ulHeightStr);
        var ulHeight = $(li[0]).parent().find('ul.smallCh').height();

        wrappSmallCH.animate({ height: ulHeight }, ulHeight * 4);
    }, 3000);
});