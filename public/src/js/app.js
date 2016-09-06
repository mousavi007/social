var postId = 0;
var postBodyElement= null;
$('.post').find('.interaction').find('.edit').on('click',function (event) {
    event.preventDefault();
    postBodyElement=event.target.parentNode.parentNode.childNodes[1];
    var postBody= postBodyElement.textContent;
    postId = event.target.parentNode.parentNode.dataset['postid'];
    $('#post-body').val(postBody);
    $('#edit-modal').modal();
});
$('#modal-save').on('click', function () {
   $.ajax({
      method: 'post',
       url: urlEdit,
       data: {body: $('#post-body').val(), postId: postId , _token:token}
   })
       .done(function (msg) {
           console.log(JSON.stringify(msg));
           $(postBodyElement).text(msg['new_body']);
           $('#edit-modal').modal('hide')
0       })
});
$('.like').on('click', function(event) {
    event.preventDefault();
    postId = event.target.parentNode.parentNode.dataset['postid'];
    var isLike = event.target.previousElementSibling == null;
    $.ajax({
        method: 'POST',
        url: urlLike,
        data: {isLike: isLike, postId: postId, _token: token}
    })
        .done(function () {
            event.target.innerText = isLike ? event.target.innerText == 'like' ? 'you like this post' : 'like' : event.target.innerText == 'dislike' ? 'you don\'t like this post' : 'dislike';
            if (isLike){
                event.target.nextElementSibling.innerText='dislike';
            }else
            {
                event.target.previousElementSibling.innerText='like';
            }
        });
});