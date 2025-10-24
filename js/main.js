// main.js - navigation toggle, active link highlight, simple counter animation, year
document.addEventListener('DOMContentLoaded', function () {
  // nav toggle (for all nav toggle buttons)
  function wireToggle(toggleId, navId){
    var toggle = document.getElementById(toggleId);
    var nav;
    if (navId) nav = document.getElementById(navId);
    else nav = document.querySelector('.site-nav');

    if (!toggle || !nav) return;
    toggle.addEventListener('click', function(){
      nav.classList.toggle('open');
    });
  }

  wireToggle('nav-toggle', 'site-nav');
  wireToggle('nav-toggle-2', 'site-nav-2');
  wireToggle('nav-toggle-3', 'site-nav-3');

  // close mobile nav when clicking outside
  document.addEventListener('click', function(e){
    var navs = document.querySelectorAll('.site-nav');
    navs.forEach(function(nav){
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && !e.target.classList.contains('nav-toggle')){
        nav.classList.remove('open');
      }
    });
  });

  // set year in footer
  var y = new Date().getFullYear();
  var yEls = document.querySelectorAll('#year, #year-2, #year-3');
  yEls.forEach(function(el){ if (el) el.textContent = y; });

  // simple count-up animation for elements with .count
  var counters = document.querySelectorAll('.count');
  counters.forEach(function(counter){
    counter.textContent = '0';
    var target = +counter.getAttribute('data-target') || 0;
    var duration = 1200;
    var startTime = null;

    function animate(time){
      if (!startTime) startTime = time;
      var progress = Math.min((time - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(animate);
      else counter.textContent = target;
    }
    requestAnimationFrame(animate);
  });

  // mark nav active based on current path
  var path = location.pathname.split('/').pop();
  if (!path) path = 'index.html';
  var anchors = document.querySelectorAll('.site-nav a');
  anchors.forEach(function(a){
    var href = a.getAttribute('href');
    if (href && href.indexOf(path) !== -1){
      anchors.forEach(function(x){ x.classList.remove('active') });
      a.classList.add('active');
    }
  });
});
