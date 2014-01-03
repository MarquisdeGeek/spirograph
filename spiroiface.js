    var Event = YAHOO.util.Event,
        Dom   = YAHOO.util.Dom,
        lang  = YAHOO.lang


YUISlider = function(divStub, params) {
	var divSlider = divStub + "Thumb";
	var divValue = divStub + "Text";
	var sliderWidth = 200;
	var slider = YAHOO.widget.Slider.getHorizSlider("slider-bg", divSlider, 0, sliderWidth, 1);


 		this.params = params;
 		slider.sliderWidth = sliderWidth;
 		
        // Sliders with ticks can be animated without YAHOO.util.Anim
        slider.animate = true;

        slider.getRealValue = function() {
        	var f = params.scale_from;
        	var t = params.scale_to;
        	var d = t - f;
        	
        	var v = f + (this.getValue() * d) / slider.sliderWidth;

            return Math.round(v);
        }

        slider.subscribe("change", function(offsetFromStart) {

			
            var valnode = Dom.get(divValue);
            var realValue = slider.getRealValue();
            valnode.innerHTML = Math.floor(realValue);
            
            if (params.scale_percent) {
	            valnode.innerHTML += "%";
            } 

            // update the text box with the actual value
            //fld.value = actualValue;
            
            // WTF - calling a global function!?!?!
            // pass object/callback
            // invoke: 
            if (params.on_change) params.on_change(realValue)
            

        });

        slider.subscribe("slideStart", function() {
                YAHOO.log("slideStart fired", "warn");
            });

        slider.subscribe("slideEnd", function() {
                YAHOO.log("slideEnd fired", "warn");
            });

	this.slider = slider;
	
	this.setValue(params.value);
}


YUISlider.prototype.setValue = function(v) {
   	var f = this.params.scale_from;
   	var t = this.params.scale_to;
	var d = t - f;
 
	var scaled = ((v - f)*this.slider.sliderWidth) / d;

	this.slider.setValue(scaled, false);
}

SimpleSpirographinterface = function(spiro) {

slide1 = new YUISlider("teethOuter", { value: spiro.teethOuter, scale_from: 1, scale_to: 150, on_change: function(v) { spiro.teethOuter = v; spiro.refresh(); } } );
slide2 = new YUISlider("teethInner", { value: spiro.teethInner, scale_from: 1, scale_to: 200, scale_percent: true, on_change: function(v) { spiro.teethInner = Math.floor((spiro.teethOuter * v) /100); spiro.refresh(); } } );
slide3 = new YUISlider("radiusOuter", { value: spiro.radiusOuter, scale_from: 10, scale_to: 600, on_change: function(v) { spiro.radiusOuter = v; spiro.refresh(); } } );
slide4 = new YUISlider("radiusInner", { value: spiro.radiusInner, scale_from: 10, scale_to: 600, on_change: function(v) { spiro.radiusInner = v; spiro.refresh(); } } );
slide5 = new YUISlider("radiusPenDistance", { value: spiro.radiusPen, scale_from: 1, scale_to: 100, on_change: function(v) { spiro.radiusPen = v; spiro.refresh(); } } );
slide6 = new YUISlider("renderResolution", { value: spiro.drawResolution*10, scale_from: 1, scale_to: 30, on_change: function(v) { spiro.drawResolution = v / 10; spiro.refresh(); } } );
slide7 = new YUISlider("renderLimit", { value: spiro.drawLimit, scale_from: 1, scale_to: 720, on_change: function(v) { spiro.drawLimit = v; spiro.refresh(); } } );

$('#colorpickerHolder').ColorPicker({flat: true, 
onBeforeShow: function () {
		$(this).ColorPickerSetColor(spiro.drawColor );
	},
	
onChange: function (hsb, hex, rgb) {
	spiro.drawColor = hex;
	spiro.refresh();
	}
	
});
}


