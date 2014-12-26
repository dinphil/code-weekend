// Navbar scrolling using JQuery animations

$(document).ready(function(){

    $('#setup-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#setup-section").offset().top
        }, 500);
        
    }); 
    $('#node-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#node-section").offset().top
        }, 500);
        
    });
    $('#apis-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#api-section").offset().top
        }, 500);
        
    });
    $('#dbs-menu').click(function(){
        
        $('html, body').animate({
            scrollTop: $("#db-section").offset().top
        }, 500);
        
    });
    
});
