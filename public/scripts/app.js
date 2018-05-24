$(function() {

  $("#compose").on("click", function () {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  })

  function renderTweets(tweets) {
    $("#fixed-tweet").empty();
    tweets.reverse();
    for (var tweet = 0; tweet < tweets.length; tweet++) {
      var content = createTweetElement(tweets[tweet]);
      $('#fixed-tweet').append(content);
    }
  }

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');

    // Building the header
    let $avatar = $('<img>').attr({"src": `${tweet.user.avatars.small}`});
    let $h2 = $("<h2>").text(`${tweet.user.name}`);
    let $handle = $("<div>").text(`${tweet.user.handle}`);
    let $header = $("<header>").append($avatar, $h2, $handle);

    // Building the section
    let $p = $("<p>").text(`${tweet.content.text}`);
    let $section = $("<section>").append($p);

    // Building the footer
    let $img1 = $("<img>").attr({"src": 'images/likebutton.png'});
    let $img2 = $("<img>").attr({"src": 'images/whiteflag.png'});
    let $img3 = $("<img>").attr({"src": 'images/cycle.png'});
    let $date = $("<p>").text(`${tweet.created_at}`);
    let $footer = $("<footer>").append($date, $img1, $img2, $img3);

    $tweet.append($header, $section, $footer);

    return $tweet;
  }

  function loadTweets() {
    $.get('/tweets/', function (array) {
      renderTweets(array);
    });
  }

  $("form").on("submit", function(event) {
    event.preventDefault();
    var text = event.target.elements.text.value;
    var empty_error = `<div class="error">You must enter something</div>`;
    var overload_error = `<div class="error">It must be within 140 characters!!!</div>`;
    if (text.length === 0) {
      if (!$('.error').length) {
        $(".new-tweet form").append(empty_error);
      }
    } else if (text.length > 140) {
      if (!$(".error").length) {
        $(".new-tweet form").append(overload_error);
      }
    } else {
      var data = $(this).serialize();
      $.ajax({url: "/tweets/", method: "POST", data: data}).done(function (data) {
        loadTweets();
        $("textarea").val("");
      })
    }
  })
});