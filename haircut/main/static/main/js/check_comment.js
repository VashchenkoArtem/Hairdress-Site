$(document).ready(function(){
    $("#buttonNextComment").on('click', function(){
        const currentCommentId = $("#commentId").val()
        const url = `/get-comment/?id=${currentCommentId}&direction=next`
        $.ajax({
            url: url,
            type: "get",
            success: function(data){
                if (data.is_error){
                    const newCommentValue = 0
                    $.ajax({
                        url: `/get-comment/?id=${currentCommentId}&direction=next`,
                        type: "get",
                        success: function(data){
                            $("#commentId").val(Number(newCommentValue) + 1)
                            $("#opinionReview").text(data.comment)
                            $("#commentAuthor").text(data.comment_author)
                            $("#commentAuthorCity").text(data.comment_author_city)
                        }
                    })
                }
                $("#commentId").val(Number(currentCommentId) + 1)
                $("#opinionReview").text(data.comment)
                $("#commentAuthor").text(data.comment_author)
                $("#commentAuthorCity").text(data.comment_author_city)
            }
        })
    })
})