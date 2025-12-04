$(document).ready(function(){
    $(".mono-button").on("click", function(){
        $.ajax({
            url: "/create-invoice",
            type: "get",
            success: function(data){
                window.location.href = data.pageUrl
            }
        })
    })
})