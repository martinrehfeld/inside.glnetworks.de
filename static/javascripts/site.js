// support HTML5 elements in older browsers
$.each("header nav article section footer aside time figure figcaption".split(" "), function(i, element) {
  document.createElement(element);
});

// add browser identifier to html tag
$('html').addClass($.browser.webkit ? 'webkit' : $.browser.msie ? 'trident' : $.browser.opera ? 'presto' : $.browser.mozilla ? 'gecko' : null);

// add class="Coderay" to <pre><code> blocks
$(function() {
 $('pre').addClass('CodeRay');
});
