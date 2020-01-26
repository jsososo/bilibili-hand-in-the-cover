(function () {
  var BHC = [];
  var oldBHC = [];
  var PAGE_VIDEO_INFO = {};

  if (!document.location.href.match('bilibili')) {
    return;
  }

  $('body').append('<div class="BHC-extensions"></div>');

  var generateBHC = function () {
    getVideoInfo();
    var cards = $('.home-card,' +
      '.spread-module,' +
      '.video.matrix,' +
      '.video-container,' +
      '.fav-video-list .small-item,' +
      '.content .small-item,' +
      '.video-page-card,' +
      '.video-card-common,' +
      '.video-card-reco,' +
      '.video-list .video-item');
    BHC = [];
    if (PAGE_VIDEO_INFO.img) {
      BHC.push(PAGE_VIDEO_INFO);
    }
    $.each(cards, function (i, c) {
      var $c = $(c);
      var src = $c.find('img').attr('src');
      if (src) {
        BHC.push({
          title: $c.find('.title, p.t, .info .headline a').text(),
          href: $c.find('.title, a').attr('href') || '',
          img: src.replace(/@.+/, ''),
        });
      }
    });

    renderCoverList();
  };

  var renderCoverList = function () {
    var html = '<div><ol>';
    if (JSON.stringify(BHC) === JSON.stringify(oldBHC)) {
      return;
    }
    if (!BHC.length) {
      $('.BHC-extensions').html('');
      oldBHC = [];
      return;
    }
    BHC.forEach(function (item, index) {
      html += renderCoverItem(item, index);
    });
    oldBHC = BHC;

    html += '</ol><div class="show-list-btn">交封不杀</div></div>';
    $('.BHC-extensions').html(html);
  };

  var renderCoverItem = function (item) {
    return [
      '<li>',
      '  <a class="video-title" href="' + item.href + '">' + item.title + '</a>',
      '  <img class="list-cover" src="' + item.img + '" />',
      '  <a class="big-cover" href="' + item.img + '" target="_blank">查看大图</a>',
      '</li>'
    ].join('');
  };

  var getVideoInfo = function () {
    var matches = document.location.href.match(/\/video\/av(\d+)(\/|$)/);
    if (!matches) {
      PAGE_VIDEO_INFO = {};
      return;
    }
    PAGE_VIDEO_INFO = {
      title: $('meta[itemprop="name"]').attr('content'),
      img: $('meta[itemprop="image"]').attr('content'),
      href: $('meta[itemprop="url"]').attr('content'),
      playing: true,
    }

  };

  var eventBind = function () {

  };

  generateBHC();

  var timer = setInterval(generateBHC, 1000);

})();