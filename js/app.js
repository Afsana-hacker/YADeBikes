(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var WA='923006591354',fmt=function(n){return 'PKR '+Number(n).toLocaleString('en-US')};
function wl(m){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(m)}
function toast(m){var t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('on')},2200)}
// cart
function load(){try{return JSON.parse(localStorage.getItem('yadcart')||'[]')}catch(e){return []}}
function save(c){try{localStorage.setItem('yadcart',JSON.stringify(c))}catch(e){}count()}
function count(){var n=load().reduce(function(a,i){return a+i.q},0);$$('[data-cc]').forEach(function(e){e.textContent=n})}
function add(id,q){var c=load(),f=c.filter(function(i){return i.id===id})[0];if(f)f.q+=q;else c.push({id:id,q:q});save(c)}
// menu
var d=$('.drw'),o=$('.ovl');function menu(v){d.classList.toggle('open',v);o.classList.toggle('open',v);document.body.classList.toggle('lock',v)}
$('.bur').onclick=function(){menu(true)};$('.drw .x').onclick=function(){menu(false)};o.onclick=function(){menu(false)};
$$('.drw a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
// reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.12});$$('.rv').forEach(function(e){io.observe(e)});
// product page
$$('[data-add]').forEach(function(b){b.onclick=function(){var q=parseInt(($('#qty')||{}).value||1,10)||1;add(b.dataset.add,q);toast('Added to cart')}});
var qi=$('#qty');if(qi){$('#qm').onclick=function(){qi.value=Math.max(1,(+qi.value||1)-1);wa()};$('#qp').onclick=function(){qi.value=Math.min(20,(+qi.value||1)+1);wa()};qi.oninput=wa}
function wa(){var b=$('#buywa');if(!b)return;var q=+qi.value||1;b.href=wl('Assalam o Alaikum YAD, I want to order '+q+' x '+b.dataset.n+' ('+fmt(b.dataset.p*q)+'). Please confirm availability.')}wa();
var gi=$('#gi');$$('.th img').forEach(function(i){i.onclick=function(){gi.src=i.dataset.s;$$('.th img').forEach(function(x){x.classList.toggle('on',x===i)})}});
var gm=$('.gm');if(gm&&gi){gm.onpointermove=function(e){var r=gm.getBoundingClientRect();gi.style.transform='scale(1.1) translate('+(-(e.clientX-r.left-r.width/2)/r.width*24)+'px,'+(-(e.clientY-r.top-r.height/2)/r.height*24)+'px)'};gm.onpointerleave=function(){gi.style.transform=''}}
// shop filters
var fs=$('#fsearch'),fc=$('#fsort'),cat='All';
function filt(){var q=(fs&&fs.value||'').toLowerCase(),cs=$$('.pc[data-cat]');cs.forEach(function(c){c.style.display=(cat==='All'||c.dataset.cat===cat)&&c.dataset.name.indexOf(q)>-1?'':'none'});
if(fc&&fc.value!=='0'){var g=$('#pgrid');cs.sort(function(a,b){return fc.value==='1'?a.dataset.price-b.dataset.price:b.dataset.price-a.dataset.price}).forEach(function(c){g.appendChild(c)})}}
$$('.chip[data-c]').forEach(function(c){c.onclick=function(){cat=c.dataset.c;$$('.chip[data-c]').forEach(function(x){x.classList.toggle('on',x===c)});filt()}});if(fs)fs.oninput=filt;if(fc)fc.onchange=filt;
// hero slider + tilt
var hs=$('.hslide');if(hs){var im=$$('img',hs),dt=$$('.hd2 i'),k=0;setInterval(function(){im[k].classList.remove('on');dt[k].classList.remove('on');k=(k+1)%im.length;im[k].classList.add('on');dt[k].classList.add('on')},3600);
hs.onpointermove=function(e){var r=hs.getBoundingClientRect();hs.style.transform='perspective(1000px) rotateY('+((e.clientX-r.left)/r.width-.5)*10+'deg) rotateX('+(-((e.clientY-r.top)/r.height-.5)*10)+'deg)'};hs.onpointerleave=function(){hs.style.transform=''}}
// cart page
var cb=$('#cartbox');
function render(){if(!cb||typeof PRODUCTS==='undefined')return;var c=load().filter(function(i){return PRODUCTS[i.id]}),t=0;
if(!c.length){cb.innerHTML='<div class="card"><h3>Your cart is empty</h3><p>Browse our models and add your favourite scooter.</p><a class="btn" href="shop.html">Go to shop</a></div>';$('#checkout').style.display='none';return}
$('#checkout').style.display='';
cb.innerHTML='<div class="card">'+c.map(function(i){var p=PRODUCTS[i.id];t+=p.p*i.q;return '<div class="ci"><img src="'+p.i+'" alt=""><div><h4>'+p.n+'</h4><small>'+fmt(p.p)+' each</small><div class="qty" style="margin:6px 0 0"><button data-m="'+i.id+'">−</button><input value="'+i.q+'" readonly><button data-p="'+i.id+'">+</button></div></div><div style="text-align:right"><b>'+fmt(p.p*i.q)+'</b><br><button class="rm" data-r="'+i.id+'">Remove</button></div></div>'}).join('')+'<div class="tot"><span>Total</span><span>'+fmt(t)+'</span></div></div>';
$$('[data-m]',cb).forEach(function(b){b.onclick=function(){var c=load();c.forEach(function(i){if(i.id===b.dataset.m)i.q=Math.max(1,i.q-1)});save(c);render()}});
$$('[data-p]',cb).forEach(function(b){b.onclick=function(){var c=load();c.forEach(function(i){if(i.id===b.dataset.p)i.q++});save(c);render()}});
$$('[data-r]',cb).forEach(function(b){b.onclick=function(){save(load().filter(function(i){return i.id!==b.dataset.r}));render()}});window._tot=t}render();
function val(f,n){return (f.elements[n]&&f.elements[n].value||'').trim()}
var ck=$('#checkout');if(ck)ck.onsubmit=function(e){e.preventDefault();var c=load().filter(function(i){return PRODUCTS[i.id]}),t=0,m='*New order from YAD website*\n';c.forEach(function(i,n){var p=PRODUCTS[i.id];t+=p.p*i.q;m+=(n+1)+'. '+p.n+' x'+i.q+' - '+fmt(p.p*i.q)+'\n'});
m+='Total: '+fmt(t)+'\n\nName: '+val(ck,'name')+'\nPhone: '+val(ck,'phone')+'\nCity: '+val(ck,'city')+'\nAddress: '+val(ck,'address')+'\nPayment: '+val(ck,'pay')+(val(ck,'notes')?'\nNotes: '+val(ck,'notes'):'');location.href=wl(m)};
var cf=$('#contactForm');if(cf)cf.onsubmit=function(e){e.preventDefault();var m='*Website enquiry*\nName: '+val(cf,'name')+'\nPhone: '+val(cf,'phone')+'\nEmail: '+val(cf,'email')+'\nCity: '+val(cf,'city')+'\nInterested in: '+val(cf,'model')+'\nPurpose: '+val(cf,'purpose')+'\n\nMessage: '+val(cf,'message');location.href=wl(m)};
count();
// intro
var it=$('#intro');if(it){var seen=0;try{seen=sessionStorage.getItem('yi')}catch(e){}
function end(){if(!it)return;try{sessionStorage.setItem('yi','1')}catch(e){}it.classList.add('gone');document.body.classList.remove('lock');setTimeout(function(){it&&it.remove();it=null},1100)}
if(seen){it.remove();it=null}else{document.body.classList.add('lock');var C=6,R=9,f=$('#frame'),ts=[];
for(var r=0;r<R;r++)for(var c=0;c<C;c++){var t=document.createElement('i');t.style.cssText='left:'+c/C*100+'%;top:'+r/R*100+'%;width:'+(100/C+.4)+'%;height:'+(100/R+.4)+'%;background-image:url(images/intro.jpg);background-size:'+C*100+'% '+R*100+'%;background-position:'+c/(C-1)*100+'% '+r/(R-1)*100+'%;opacity:0;transform:translate('+(Math.random()-.5)*innerWidth*1.6+'px,'+(Math.random()-.5)*innerHeight*1.6+'px) rotate('+(Math.random()-.5)*720+'deg) scale('+(.3+Math.random())+')';f.appendChild(t);ts.push(t)}
requestAnimationFrame(function(){requestAnimationFrame(function(){ts.forEach(function(t){var dl=Math.random()*1.2;t.style.transition='transform 1.7s cubic-bezier(.2,.8,.2,1) '+dl+'s,opacity .5s '+dl+'s';t.style.transform='none';t.style.opacity=1})})});
setTimeout(function(){$('#itx').classList.add('on')},3300);setTimeout(end,5400);$('#sk').onclick=end}}
})();
