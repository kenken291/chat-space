$(function(){ 
  var buildHTML = function(data) {
    if (data.content && data.image) {
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
          <img src=${data.image} class="lower-message__image">
        </div>
      </div>`
    } else if (data.content) {
      var html = 
       ` <div class="message" data-message-id = ${data.id}>
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
    } else if (data.image) {
      var html = 
       ` <div class="message" data-message-id=${data.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${data.user_name}
          </div>
          <div class="upper-message__date">
            ${data.date}  
          </div>
        </div>
        <div class="lower-message">
          <img src=${data.image} class="lower-message__image">
        </div>
      </div>`
    };
      return html;
  };

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
  

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-body').append(insertHTML);
        $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
      });
    }

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  };
});


