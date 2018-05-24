$(document).ready(function() {
  $(".new-tweet textarea[name='text']").on("input", function() {
    if ((".error").length) {
      $(".error").remove();
    }
    var leftover = 140 - $(this).val().length;
    var beforecolor = '#244751';
    var aftercolor = '#ff0000';
    if (leftover < 0) {
      $(this).siblings(".counter").css({'color': aftercolor});
    } else {
      $(this).siblings(".counter").css({'color': beforecolor});
    }
    $(this).siblings(".counter").text(leftover);
  });
})