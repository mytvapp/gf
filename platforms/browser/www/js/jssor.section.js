var options = {
    $AutoPlay: 0,
    $SlideDuration: 160,
    $SlideWidth: 211,
	$SlideHeight: 310,
    $SlideSpacing: 3,
	$Loop: 0,
    $ArrowNavigatorOptions: {
		$Class: $JssorArrowNavigator$,
		$Steps: 5
    },
    $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$
    }
};

var jssor_1_slider = new $JssorSlider$("jssor_section1", jssor_section_options);
var jssor_2_slider = new $JssorSlider$("jssor_section2", options);
var jssor_3_slider = new $JssorSlider$("jssor_section3", options);

/*#region responsive code begin*/
//var MAX_WIDTH = 1920;
var MAX_WIDTH = 920;
function ScaleSlider() {
	var containerElement = jssor_2_slider.$Elmt.parentNode;
	var containerWidth = containerElement.clientWidth;
	if (containerWidth) {
		var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
		jssor_2_slider.$ScaleWidth(expectedWidth);
		jssor_3_slider.$ScaleWidth(expectedWidth);
	} else {
		window.setTimeout(ScaleSlider, 30);
	}
}
ScaleSlider();
$Jssor$.$AddEvent(window, "load", ScaleSlider);
$Jssor$.$AddEvent(window, "resize", ScaleSlider);
$Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
/*#endregion responsive code end*/