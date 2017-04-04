$(document).ready(function () {
    $('.search-block').css({
        display: 'table',
        width: '100%',
        height: '100%'
    })
    $('.search-bar').css({
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
    })
});
$("#search-input").bind("change paste keyup", function() {
    $('.search-block').css({
        display: 'block',
        width: '100%',
        height: '100%'
    });
    $('.search-bar').css({
        display: 'block',
        textAlign: 'center',
        verticalAlign: 'initial',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '20px 10px 15px 10px',
        height: '50px',
        boxShadow: '0 2px 11px -3px rgba(0,0,0,0.3)',
        background: '#fff',
        zIndex: 2
    });
    youtubeAPICall($(this).val());
});
$("#search-input").focus(function(){
    $(this).css('border-bottom','3px solid #0fdce6');
});

$("#search-input").blur(function(){
    $(this).css('border-bottom','none');
});
function youtubeAPICall(term) {
    $.ajax({
        cache: false,
        data: $.extend({
            key: 'AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss',
            q: term,
            part: 'snippet',
            type: 'video'
        }, {maxResults:20}),
        dataType: 'json',
        type: 'GET',
        timeout: 5000,
        url: 'https://www.googleapis.com/youtube/v3/search'
    })
    .done(function(data) {
        var items = data.items, videoList = "";
        $.each(items, function(index,e) {
            videoList = videoList + '<li class="search-list-item"><div class="video-list media"><div class="details-block"><img class="media-object" src="'+e.snippet.thumbnails.default.url+'" /><div class="media-body"><p class="media-heading">'+e.snippet.title+'</p><p class="media-description">'+e.snippet.title+'</p></div></div><div class="bottom-details-block"><p class="channel-title">Bottom Left</p><p class="video-time">Bottom Right</p><div style="clear:both"></div></div></div></li>'
        });
        $("#search-list").html(videoList);
        $("#total-result").html('Total Results ' + items.length);
    });
}
