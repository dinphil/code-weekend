// Navbar scrolling using JQuery animations

$(document).ready(function(){

    $('#setup-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#setup-contents").offset().top
        }, 500);
        
    }); 
    $('#node-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#node-contents").offset().top
        }, 500);
        
    });
    $('#apis-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#apis-contents").offset().top
        }, 500);
        
    });
    $('#dbs-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#dbs-contents").offset().top
        }, 500);
        
    });
    
});
