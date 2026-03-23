$(document).ready(function(){
    $("#buttonNextCommentPhone").each(function(){
        $(this).on('click', function(){
            console.log("asdasd")
            const currentCommentId = $("#commentIdPhone").val()
            const url = `/get-comment/?id=${currentCommentId}&direction=next`
            $.ajax({
                url: url,
                type: "get",
                success: function(data){
                    if (data.is_error){
                        const newCommentValue = 0
                        $.ajax({
                            url: `/get-comment/?id=${newCommentValue}&direction=next`,
                            type: "get",
                            success: function(data){
                                $("#commentIdPhone").val(Number(newCommentValue) + 1)
                                $("#opinionReviewPhone").text(data.comment)
                                $("#commentAuthorPhone").text(data.comment_author)
                                $("#commentAuthorCityPhone").text(data.comment_author_city)
                            }
                        })
                    }
                    $("#commentIdPhone").val(Number(currentCommentId) + 1)
                    $("#opinionReviewPhone").text(data.comment)
                    $("#commentAuthorPhone").text(data.comment_author)
                    $("#commentAuthorCityPhone").text(data.comment_author_city)
                }
            })
        })
    })


    $("#buttonPrevCommentPhone").on('click', function(){
        let currentPrevCommentId = $("#commentIdPhone").val()
        if (currentPrevCommentId == 1){
            $("#commentIdPhone").val(7)
            currentPrevCommentId = $("#commentIdPhone").val()
        }
        const url = `/get-comment/?id=${currentPrevCommentId}&direction=prev`
        $.ajax({
            url: url,
            type: "get",
            success: function(data){
                currentPrevCommentId = Number(currentPrevCommentId) - 1
                $("#commentIdPhone").val(currentPrevCommentId)
                $("#opinionReviewPhone").text(data.comment)
                $("#commentAuthorPhone").text(data.comment_author)
                $("#commentAuthorCityPhone").text(data.comment_author_city)
            }
        })
    })
})