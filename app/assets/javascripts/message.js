$(function(){ 
  function buildHTML(data){
   if ( data.image ) {
     var html = 
      `<div class="wrapper" data-message-id=${data.id}>
         <div class="">
           <div class="upper-message__user-name">
             ${data.user_name}
           </div>
           <div class="upper-message__date">
             ${data.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${data.content}
           </p>
         </div>
         <img src=${data.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${data.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${data.user_name}
           </div>
           <div class="upper-message__date">
             ${data.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${data.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    console.log(data)
    var html = buildHTML(data);
    $('.main-body').append(html);      
    $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
    $('form')[0].reset();
    $('.submit-btn').prop('disabled', false);

  })

  .fail(function() {
    alert("メッセージ送信に失敗しました");
});

})
});
