jQuery(document).ready(function(){

    $ = jQuery;

    /*-----------------------------------------------------------------------------------*/
    /* Cross Browser
    /*-----------------------------------------------------------------------------------*/
    $('.property-item .features span:last-child').css('border', 'none');
    $('.dsidx-prop-title').css('margin','0 0 15px 0');
    $('.dsidx-prop-summary a img').css('border','none');



    /*-----------------------------------------------------------------------------------*/
    /* Main Menu Dropdown Control
    /*-----------------------------------------------------------------------------------*/
    $('.main-menu ul li').hover(function(){
        $(this).children('ul').stop(true, true).slideDown(200);
    },function(){
        $(this).children('ul').stop(true, true).delay(50).slideUp(750);
    });


    /*-----------------------------------------------------------------------------------*/
    /*	Responsive Nav
     /*-----------------------------------------------------------------------------------*/
    var $mainNav    = $('.menu-main-menu-container').children('ul');
    var optionsList = '<option value="" selected>Menu...</option>';

    $mainNav.find('li').each(function() {
        var $this   = $(this),
            $anchor = $this.children('a'),
            depth   = $this.parents('ul').length - 1,
            indent  = '';
        if( depth ) {
            while( depth > 0 ) {
                indent += ' - ';
                depth--;
            }
        }
        optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
    }).end().last()
        .after('<select class="responsive-nav">' + optionsList + '</select>');

    $('.responsive-nav').on('change', function() {
        window.location = $(this).val();
    });


    /*-----------------------------------------------------------------------------------*/
    /*	Flex Slider
     /*-----------------------------------------------------------------------------------*/
    if(jQuery().flexslider)
    {
        // Flex Slider for Homepage
        $('#home-flexslider .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 7000,
            animationSpeed:	1500,
            directionNav: true,
            controlNav: false,
            keyboardNav: true
        });

        // Remove Flex Slider Navigation for Smaller Screens Like IPhone Portrait
    $('.slider-wrapper , .listing-slider').hover(function(){
        var mobile = $('body').hasClass('probably-mobile');
        if(!mobile)
        {
            $('.flex-direction-nav').stop(true,true).fadeIn('slow');
        }
    },function(){
        $('.flex-direction-nav').stop(true,true).fadeOut('slow');
    });

    // Flex Slider for Detail Page
    $('#property-detail-flexslider .flexslider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: "thumbnails"
    });

    // Flex Slider Gallery Post
    $('.listing-slider ').flexslider({
        animation: "slide"
    });

}


    /*-----------------------------------------------------------------------------------*/
    /*	jCarousel
    /*-----------------------------------------------------------------------------------*/
    if(jQuery().jcarousel){
        // Jcarousel for Detail Page
        jQuery('#property-detail-flexslider .flex-control-nav').jcarousel({
            vertical: true,
            scroll:1
        });

        // Jcarousel for partners
        jQuery('.brands-carousel .brands-carousel-list ').jcarousel({
            scroll:1
        });
    }


    /*-----------------------------------------------------------------------------------*/
    /*	Carousel - Elastislide
     /*-----------------------------------------------------------------------------------*/
    if(jQuery().elastislide){
        var fp = $('.featured-properties-carousel .es-carousel-wrapper ul'),
            fpCarousel = $('.featured-properties-carousel .carousel');

        $param ={
            speed : 500,
            imageW : 245,
            minItems : 1,
            margin : 30,
            onClick : function($object) {
                window.location = $object.find('a').first().attr('href');
                return true;
            }
        };

        function cstatus(a,b,c){
            temp = a.children("li");
            temp.last().attr('style', 'margin-right: 0px !important');
            if ( temp.length > c ) { b.elastislide($param); }
        };

        cstatus(fp,fpCarousel,4);
    }


    /*-------------------------------------------------------*/
    /*	Select Box
    /* -----------------------------------------------------*/
    if(jQuery().selectbox){
        $('.search-select').selectbox();
    }


    $('body').on('click',function(e){
        if ($(e.target).hasClass('selectbox')) return;
        $('.selectbox-wrapper').css('display','none');
    });


    /*-------------------------------------------------------*/
    /*	 Focus and Blur events with input elements
    /* -----------------------------------------------------*/
    var addFocusAndBlur = function($input, $val){

        $input.focus(function(){
            if (this.value == $val) {this.value = '';}
        });

        $input.blur(function(){
            if (this.value == '') {this.value = $val;}
        });
    }

    // Attach the events
    addFocusAndBlur(jQuery('#principal'),'Principal');
    addFocusAndBlur(jQuery('#interest'),'Interest');
    addFocusAndBlur(jQuery('#payment'),'Payment');
    addFocusAndBlur(jQuery('#texes'),'Texes');
    addFocusAndBlur(jQuery('#insurance'),'Insurance');
    addFocusAndBlur(jQuery('#pmi'),'PMI');
    addFocusAndBlur(jQuery('#extra'),'Extra');
    addFocusAndBlur(jQuery('.agent-detail .contact-form #name'),'Name');
    addFocusAndBlur(jQuery('.agent-detail .contact-form #email'),'Email');
    addFocusAndBlur(jQuery('.agent-detail .contact-form #comment'),'Message');


    /*-----------------------------------------------------------------------------------*/
    /*	Apply Bootstrap Classes on Comment Form Fields to Make it Responsive
     /*-----------------------------------------------------------------------------------*/
    $('#respond #submit, #dsidx-contact-form-submit').addClass('real-btn');
    $('.pages-nav > a').addClass('real-btn');
    $('.dsidx-search-button .submit').addClass('real-btn');


    /*----------------------------------------------------------------------------------*/
    /* Contact Form AJAX validation and submission
    /* Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    /* Form Ajax Plugin : http://www.malsup.com/jquery/form/
    /*---------------------------------------------------------------------------------- */
    if(jQuery().validate && jQuery().ajaxSubmit)
    {
        // Contact Form Handling
        var contact_options = {
            target: '#message-sent',
            beforeSubmit: function(){
                $('#contact-loader').fadeIn('fast');
                $('#message-sent').fadeOut('fast');
            },
            success: function(){
                $('#contact-loader').fadeOut('fast');
                $('#message-sent').fadeIn('fast');
                $('#contact-form .contact-form').resetForm();
            }
        };

        $('#contact-form .contact-form').validate({
            errorLabelContainer: $("div.error-container"),
            submitHandler: function(form) {
                $(form).ajaxSubmit(contact_options);
            }
        });


        // Agent Message Form Handling
        var agent_form_options = {
            target: '#message-sent',
            beforeSubmit: function(){
                $('#contact-loader').fadeIn('fast');
                $('#message-sent').fadeOut('fast');
            },
            success: function(){
                $('#contact-loader').fadeOut('fast');
                $('#message-sent').fadeIn('fast');
                $('#agent-contact-form').resetForm();
            }
        };

        $('#agent-contact-form').validate({
            errorLabelContainer: $("div.error-container"),
            submitHandler: function(form) {
                $(form).ajaxSubmit(agent_form_options);
            }
        });
    }



    /*-----------------------------------------------------------------------------------*/
    /* Swipe Box Lightbox
     /*-----------------------------------------------------------------------------------*/
    if( jQuery().swipebox )
    {
        $(".swipebox").swipebox();
    }


    /*-----------------------------------------------------------------------------------*/
    /* Pretty Photo Lightbox
    /*-----------------------------------------------------------------------------------*/
    if( jQuery().prettyPhoto )
    {
        $(".pretty-photo").prettyPhoto({
            deeplinking: false,
            social_tools: false
        });

        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });

        $("a[rel^='prettyPhoto']").prettyPhoto({
            overlay_gallery: false,
            social_tools:false
        });
    }



    /*-------------------------------------------------------*/
    /*	Isotope
    /*------------------------------------------------------*/
    if( jQuery().isotope )
    {
        $(function() {

            var container = $('.isotope'),
                filterLinks = $('#filter-by a');

            filterLinks.click(function(e){
                var selector = $(this).attr('data-filter');
                container.isotope({
                    filter : '.' + selector,
                    itemSelector : '.isotope-item',
                    layoutMode : 'fitRows',
                    animationEngine : 'best-available'
                });

                filterLinks.removeClass('active');
                $('#filter-by li').removeClass('current-cat');
                $(this).addClass('active');
                e.preventDefault();
            });

        });
    }



    /* ---------------------------------------------------- */
    /*	Gallery Hover Effect
    /* ---------------------------------------------------- */

    var $mediaContainer=$('.gallery-item .media_container'),
        $media=$('.gallery-item .media_container a');

    var $margin= -($media.height()/2);
    $media.css('margin-top',$margin);

    $(function(){

        $('.gallery-item figure').hover(

            function(){
                var media= $media.width(),
                    container= ($mediaContainer.width()/2)-(media+2);

                $(this).children('.media_container').stop().fadeIn(300);
                $(this).find('.media_container').children('a.link').stop().animate({'right':container}, 300);
                $(this).find('.media_container').children('a.zoom').stop().animate({'left':container}, 300);
            },
            function(){
                $(this).children('.media_container').stop().fadeOut(300);
                $(this).find('.media_container').children('a.link').stop().animate({'right':'0'}, 300);
                $(this).find('.media_container').children('a.zoom').stop().animate({'left':'0'}, 300);
            }

        );

    });



    /* ---------------------------------------------------- */
    /*  Sizing Header Outer Strip
    /* ---------------------------------------------------- */
    function outer_strip(){
        var $item    = $('.outer-strip'),
            $c_width = $('.header-wrapper .container').width(),
            $w_width = $(window).width(),
            $i_width = ($w_width -  $c_width)/2;
        $item .css({
            right: -$i_width,
            width: $i_width
        });

    }

    outer_strip();
    $(window).resize(function(){
        outer_strip();
    });


    /* ---------------------------------------------------- */
    /*	Notification Hide Function
    /* ---------------------------------------------------- */
    $(".icon-remove").click(function() {
       $(this).parent().fadeOut(300);
    });


    /*-----------------------------------------------------------------------------------*/
    /*	Image Hover Effect
    /*-----------------------------------------------------------------------------------*/
    if(jQuery().transition)
    {
        $('.zoom_img_box img').hover(function(){
            $(this).stop(true,true).transition({
                scale: 1.1
            },300);
        },function(){
            $(this).stop(true,true).transition({
                scale: 1
            },150);
        });
    }


    /*-----------------------------------------------------------------------------------*/
    /*	Grid and Listing Toggle View
    /*-----------------------------------------------------------------------------------*/
    if($('.lisitng-grid-layout').hasClass('property-toggle')) {
        $('.listing-layout  .property-item-grid').hide();
        $('a.grid').on('click', function(){
                  $('.listing-layout').addClass('property-grid');
                  $('.property-item-grid').show();
                  $('.property-item-list').hide();
                  $('a.grid').addClass('active');
                  $('a.list').removeClass('active');
        });
        $('a.list').on('click', function(){
            $('.listing-layout').removeClass('property-grid');
            $('.property-item-grid').hide();
            $('.property-item-list').show();
            $('a.grid').removeClass('active');
            $('a.list').addClass('active');
        });
     }


    /*-----------------------------------------------------------------------------------*/
    /* Calendar Widget Border Fix
    /*-----------------------------------------------------------------------------------*/
    var $calendar = $('.sidebar .widget #wp-calendar');
    if( $calendar.length > 0){
        $calendar.each(function(){
            $(this).closest('.widget').css('border','none').css('background','transparent');
        });
    }

    var $single_listing = $('.sidebar .widget .dsidx-widget-single-listing');
    if( $single_listing.length > 0){
        $single_listing.each(function(){
            $(this).closest('.widget').css('border','none').css('background','transparent');
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Tags Cloud
    /*-----------------------------------------------------------------------------------*/
    $('.tagcloud').addClass('clearfix');
    $('.tagcloud a').removeAttr('style');

    /*-----------------------------------------------------------------------------------*/
    /*	Max and Min Price Related JavaScript - to show red outline of min is bigger than max
    /*-----------------------------------------------------------------------------------*/
    $('#select-min-price,#select-max-price').change(function(obj, e){
        var min_text_val = $('#select-min-price').val();
        var min_int_val = (isNaN(min_text_val))?0:parseInt(min_text_val);

        var max_text_val = $('#select-max-price').val();
        var max_int_val = (isNaN(max_text_val))?0:parseInt(max_text_val);

        if( (min_int_val >= max_int_val) && (min_int_val != 0) && (max_int_val != 0)){
            $('#select-max-price_input,#select-min-price_input').css('outline','2px solid red');
        }else{
            $('#select-max-price_input,#select-min-price_input').css('outline','none');
        }
    });




});