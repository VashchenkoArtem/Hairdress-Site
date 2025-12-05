$(document).ready(function(){
    $("#buttonNextComment").each(function(){
        $(this).on('click', function(){
            console.log("asdasd")
            const currentCommentId = $("#commentId").val()
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


    $("#buttonPrevComment").on('click', function(){
        let currentPrevCommentId = $("#commentId").val()
        if (currentPrevCommentId == 1){
            $("#commentId").val(7)
            currentPrevCommentId = $("#commentId").val()
        }
        const url = `/get-comment/?id=${currentPrevCommentId}&direction=prev`
        console.log(currentPrevCommentId)
        $.ajax({
            url: url,
            type: "get",
            success: function(data){
                currentPrevCommentId = Number(currentPrevCommentId) - 1
                $("#commentId").val(currentPrevCommentId)
                $("#opinionReview").text(data.comment)
                $("#commentAuthor").text(data.comment_author)
                $("#commentAuthorCity").text(data.comment_author_city)
            }
        })
    })
})