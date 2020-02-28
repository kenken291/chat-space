$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = FormData(this);
    var url = $(this). attr('action');


    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
})