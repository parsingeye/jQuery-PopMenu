/* PopupMenu Plugin by Dragan Stefanov - March 2012 */
(function($){
	var defaults = {
		
		menu_items: {},
        width: 200
		
	};
	var settings = {};
	var parent;
	var menu_wrapper;
    var self = this;
	
	var methods = {
		
		
		init: function(options){

            settings = $.extend({}, defaults, options);
			$el = $(this);
			var el_x = $el.offset().left;
			var el_y = $el.offset().top;
			var el_width = $el.width();
			var el_height = $el.height();

            self.menu_wrapper = $('<div></div>', {class: 'popmenu dialog_window'});
			
			var arrow = $('<div></div>', {class: 'popmenu_arrow_down'});
			var close_btn = $('<div></div>', {class: 'close_button_corner_top_left'}).on('click', function(){methods.close()});
			
			var menu = $('<ul></ul>');
			$.each(settings.menu_items, function(text, func){
				$('<li></li>', {text: text}).on('click', function(){
                    methods.close();
                    func();
                }).appendTo(menu);
			});
					
			close_btn.appendTo(self.menu_wrapper);
			arrow.appendTo(self.menu_wrapper);
			menu.appendTo(self.menu_wrapper);
            self.menu_wrapper.appendTo('body');
				
		/*
				// botttom right
				menu_wrapper.css({
					left: x + width,
					top: y + height
				});
				
				// top right
				menu_wrapper.css({
					left: x + width,
					top: y - menu_wrapper.height()
				});				
		
				// top left
				menu_wrapper.css({
					left: x - menu_wrapper.width(),
					top: y - menu_wrapper.height()
				});	
		
				// bottom left
				menu_wrapper.css({
					left: x - menu_wrapper.width(),
					top: y + height
				});
				
				//	
		*/
		
			// top center
            self.menu_wrapper.css({
				left: (el_x + el_width / 2) - settings.width / 2,
				top: (el_y - self.menu_wrapper.height()),
                width: settings.width,
                opacity: 0.1
			});
	
			arrow.css({
				left: (self.menu_wrapper.width() / 2) - 7 / 2,
				bottom: -7,
				position: 'absolute'
			});

            self.menu_wrapper.animate({
                top: self.menu_wrapper.offset().top - 5,
                opacity: 1
            }, 200);


            // self.menu_wrapper.on('mouseleave', function(){
            //     self.menu_wrapper.delay(500).fadeOut(500, function(){
            //         self.menu_wrapper.remove();
            //     });
            // });
		
		},

        close: function(){
            self.menu_wrapper.remove();
        }
	};
	
  $.fn.popMenu = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.popMenu' );
    }    
  
  };

})(jQuery);