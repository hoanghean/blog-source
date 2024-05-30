// Dark Mode
function darkMode(){var e=qSel("#mainCont");Pu.sLS("webMode","drK"===Pu.gLS("webMode")?"lgT":"drK"),"drK"===Pu.gLS("webMode")?(e.classList.remove("syD","lgT"),addCt(e,"drK")):(e.classList.remove("drK","syD"),addCt(e,"lgT")),themeColor("themeC")};

// Header Scroll
function headScroll(){var e=window.pageYOffset||document.documentElement.scrollTop,d=qSel("#header"),l=qSel("#mobile-menu");20<e?(addCt(d,"stick"),addCt(l,"slide")):(remCt(d,"stick"),remCt(l,"slide"))}
window.addEventListener("scroll",headScroll);

// Private Blog Notif
"true"==isPrivateBlog&&toastNotif('<i class="check"></i>'+blogTitle+" Blog is Private.");

// Images
(function(){var imgU=qSell('img.imgThm, .sImg .im, .cmAv .im, .pIm .im, .admIm .im, .sldC .sldIm');for(var i=0;i<imgU.length;i++){if(imgU[i].getAttribute('data-src')){var uImg=imgU[i].getAttribute('data-src');if((uImg.includes('blogspot')==!0||uImg.includes('googleusercontent')==!0)&&(uImg.includes('-pd')==!0||uImg.includes('-p-k-no-nu')==!0)&&uImg.includes('-rw')==!1){imgU[i].setAttribute('data-src',uImg.replace('-nu','-nu-rw-e30').replace('-pd','-pd-rw-e30'))}}else if(imgU[i].getAttribute('src')){var uImg=imgU[i].getAttribute('src');if((uImg.includes('blogspot')==!0||uImg.includes('googleusercontent')==!0)&&uImg.includes('p-k-no-nu')==!0&&uImg.includes('-rw')==!1){imgU[i].setAttribute('data-src',uImg.replace('-nu','-nu-rw-e30'))}else{imgU[i].setAttribute('data-src',uImg)};addCt(imgU[i],'lazy');imgU[i].setAttribute('src','data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')}else if(imgU[i].getAttribute('data-style')){var uImg=imgU[i].getAttribute('data-style');if((uImg.includes('blogspot')==!0||uImg.includes('googleusercontent')==!0)&&uImg.includes('w60')==!0&&uImg.includes('-rw')==!1){imgU[i].setAttribute('data-style',uImg.replace('w60','w60-rw-e30'))}else if((uImg.includes('blogspot')==!0||uImg.includes('googleusercontent')==!0)&&uImg.includes('p-k-no-nu')==!0&&uImg.includes('-rw')==!1){imgU[i].setAttribute('data-style',uImg.replace('-nu','-nu-rw-e30'))}else if((uImg.includes('=s')==!0||uImg.includes('/s')==!0)&&uImg.includes('-rw')==!1){imgU[i].setAttribute('data-style',uImg.replace(/\/s[0-9]+(\-c)?/,'/s1280-rw-e30').replace(/\=s[0-9]+(\-c)?/,'=s1280-rw-e30'))}}};})();

// Defer Img
Defer.dom('.lazy', 100, 'loaded', null, {rootMargin:'1px'});
'undefined'!=typeof infinite_scroll&&infinite_scroll.on('load',()=>Defer.dom('.lazy', 100, 'loaded', null, {rootMargin:'1px'}));

// Push Ads
pushAds();

// Lazy js
Lazy(function(){
  // lazy category post
  var container=getid("categorised_posts_container");container&&"object"==typeof categorisedPosts&&"function"==typeof ctgryPst&&categorisedPosts.forEach(function(t,e){var i=document.createElement("div");i.id="_categorised_post_"+e,i.innerHTML="<h2 class='title dt'>"+t.title+"</h2><div class='ctgry'><div class='note'>Loading Posts...</div></div>",container.appendChild(i),ctgryPst(t.label,"#"+i.id+" .ctgry",6,600,200,!0)});
});