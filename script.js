// ===== SOZLAMALAR =====
var TG_USER="mitti_somsa_ketadiyu1"; // buyurtma keladigan Telegram username
var DELIVERY_FEE=0, MIN_ORDER=0;     // so’m
var IMG={"d1": "images/d1.jpg", "d2": "images/d2.jpg", "d3": "images/d3.jpg", "d4": "images/d4.jpg", "t1": "images/t1.jpg", "t2": "images/t2.jpg", "t3": "images/t3.jpg", "t4": "images/t4.jpg"};
var G={d:{uz:"Duxovka somsalar",ru:"Самса из духовки"},t:{uz:"Tandir somsalar",ru:"Тандыр самса"}};
var ITEMS=[
 {id:11,g:"d",i:"d1",uz:"Go’shtli somsa",ru:"Самса с мясом",p:6000},
 {id:12,g:"d",i:"d2",uz:"Tovuqli somsa",ru:"Самса с курицей",p:6000},
 {id:13,g:"d",i:"d3",uz:"Kartoshkali somsa",ru:"Самса с картошкой",p:5000},
 {id:14,g:"d",i:"d4",uz:"Qovoqli somsa",ru:"Самса с тыквой",p:5000},
 {id:21,g:"t",i:"t1",uz:"Go’shtli somsa",ru:"Самса с мясом",p:10000},
 {id:22,g:"t",i:"t2",uz:"Tovuqli somsa",ru:"Самса с курицей",p:8000},
 {id:23,g:"t",i:"t3",uz:"Kartoshkali somsa",ru:"Самса с картошкой",p:6000},
 {id:24,g:"t",i:"t4",uz:"Qovoqli somsa",ru:"Самса с тыквой",p:6000}
];
var T={
 uz:{h1:"Mitti Somsa",tag:"Qo’ng’iroq chalindi, tanaffus!",sub:"Tandir va duxovka somsa. Butun Toshkent bo’ylab uyingizgacha yetkazamiz.",hint:"Menyuga kirish uchun bosing ↓",menuT:"Menyu",lead:"Issiq-issiq, buyurtma bersangiz uyingizgacha yetkazamiz.",delT:"Yetkazib berish",delD:"Butun Toshkent shahri bo’ylab",addrT:"Manzil",addrD:"Mo’ljal: Korzinka, Chimboy mahalla",telT:"Buyurtma uchun",cartT:"Penal (savatcha)",close:"Yopish",sum:"Jami",fName:"Ismingiz",fPhone:"Telefon",fAddr:"Manzil (ko’cha, uy, mo’ljal)",fPay:"To’lov",payCash:"Naqd (kuryerga)",payCard:"Karta (kuryerga, Click/Payme)",fNote:"Izoh",tg:"Buyurtmani yuborish",call:"Qo’ng’iroq qilish",add:"Qo’shish",penal:"Penal",order:"Buyurtma berish",pcs:"ta",cur:"so’m",empty:"Penal bo’sh. Menyudan somsa tanlang.",eName:"Ismingizni yozing.",ePhone:"Telefon raqamini yozing.",eAddr:"Manzilni yozing.",eEmpty:"Avval menyudan biror narsa tanlang.",eMin:"Minimal buyurtma: ",ord:"Yangi buyurtma",n:"Ism",ph:"Telefon",ad:"Manzil",py:"To’lov",pc:"Naqd",pk:"Karta",nt:"Izoh",dl:"Yetkazib berish",cp:"Buyurtma matni nusxalandi. Telegramda yopishtiring.",go:"Ketadiyuu: menyuga kirish",sent:"Buyurtmangiz qabul qilindi! Tez orada qo’ng’iroq qilamiz.",fail:"Buyurtmani yuborib bo’lmadi. Iltimos, (77) 451-33-33 raqamiga qo’ng’iroq qiling.",loc:"📍 Joylashuvimni aniqlash",locBusy:"Joylashuv aniqlanmoqda...",locOk:"Joylashuv aniqlandi va buyurtmaga qo’shiladi.",locErr:"Joylashuvni aniqlab bo’lmadi. Ruxsat bering yoki manzilni yozing."},
 ru:{h1:"Митти Самса",tag:"Звонок прозвенел, перемена!",sub:"Тандыр и духовка самса. Доставим по всему Ташкенту до двери.",hint:"Нажмите, чтобы открыть меню ↓",menuT:"Меню",lead:"Горячая самса с доставкой до вашего дома.",delT:"Доставка",delD:"По всему городу Ташкент",addrT:"Адрес",addrD:"Ориентир: Korzinka, махалля Чимбой",telT:"Для заказа",cartT:"Пенал (корзина)",close:"Закрыть",sum:"Итого",fName:"Ваше имя",fPhone:"Телефон",fAddr:"Адрес (улица, дом, ориентир)",fPay:"Оплата",payCash:"Наличными курьеру",payCard:"Картой курьеру (Click/Payme)",fNote:"Комментарий",tg:"Отправить заказ",call:"Позвонить",add:"Добавить",penal:"Пенал",order:"Оформить заказ",pcs:"шт",cur:"сум",empty:"Пенал пуст. Выберите самсу из меню.",eName:"Укажите имя.",ePhone:"Укажите телефон.",eAddr:"Укажите адрес.",eEmpty:"Сначала выберите что-нибудь из меню.",eMin:"Минимальный заказ: ",ord:"Новый заказ",n:"Имя",ph:"Телефон",ad:"Адрес",py:"Оплата",pc:"Наличные",pk:"Карта",nt:"Комментарий",dl:"Доставка",cp:"Текст заказа скопирован. Вставьте его в Telegram.",go:"Кетадийу: открыть меню",sent:"Заказ принят! Скоро мы вам позвоним.",fail:"Не удалось отправить заказ. Позвоните, пожалуйста: (77) 451-33-33.",loc:"📍 Определить моё местоположение",locBusy:"Определяем местоположение...",locOk:"Местоположение определено и добавится к заказу.",locErr:"Не удалось определить местоположение. Разрешите доступ или напишите адрес."}
};
var lang="uz",cat="d",qty={};
function $(i){return document.getElementById(i)}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" "+T[lang].cur}
function total(){var s=0;ITEMS.forEach(function(it){s+=(qty[it.id]||0)*it.p});return s}
function count(){var c=0;for(var k in qty)c+=qty[k];return c}
function nm(it){return it[lang]+" ("+(it.g=="d"?(lang=="uz"?"duxovka":"духовка"):(lang=="uz"?"tandir":"тандыр"))+")"}
function ctl(it){var q=qty[it.id]||0;
 return q?'<button data-m="'+it.id+'" aria-label="−">−</button><b>'+q+'</b><button class="add" data-p="'+it.id+'" aria-label="+">+</button>':'<button class="add" data-p="'+it.id+'">'+T[lang].add+'</button>'}
function renderCatalog(){
 $("tabs").innerHTML=["d","t"].map(function(g){return '<button role="tab" data-c="'+g+'" aria-selected="'+(cat==g)+'">'+G[g][lang]+'</button>'}).join("");
 $("cards").innerHTML=ITEMS.filter(function(it){return it.g==cat}).map(function(it){
  return '<article class="card"><img src="'+IMG[it.i]+'" alt="'+nm(it)+'" loading="lazy"><div class="cb"><h3>'+it[lang]+'</h3><div class="row"><span class="price">'+fmt(it.p)+'</span><div class="qty">'+ctl(it)+'</div></div></div></article>'}).join("");
}
function renderCart(){
 var t=T[lang],h="",c=count();
 ITEMS.forEach(function(it){if(qty[it.id])h+='<div class="line"><span class="n">'+nm(it)+'</span><div class="qty">'+ctl(it)+'</div><span>'+fmt(qty[it.id]*it.p)+'</span></div>'});
 if(c&&DELIVERY_FEE)h+='<div class="line"><span class="n">'+t.dl+'</span><span>'+fmt(DELIVERY_FEE)+'</span></div>';
 $("cart").innerHTML=h||'<p class="empty">'+t.empty+'</p>';
 $("total").textContent=fmt(total()+(c?DELIVERY_FEE:0));
 $("cartBtn").textContent="🎒 "+t.penal+(c?" ("+c+")":"");
 $("barBtn").textContent=t.order+": "+c+" "+t.pcs+", "+fmt(total());
 updBar();
}
function updBar(){$("bar").hidden=!(count()>0&&!$("shop").hidden&&!$("ov").classList.contains("on"))}
function renderAll(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i]").forEach(function(el){var v=T[lang][el.getAttribute("data-i")];if(v)el.textContent=v});
 document.querySelectorAll("[data-l]").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-l")==lang)});
 $("go").setAttribute("aria-label",T[lang].go);
 renderCatalog();renderCart();
}
function route(){var s=location.hash=="#menu";$("home").hidden=s;$("shop").hidden=!s;document.body.style.background=s?"var(--paper)":"var(--orange)";window.scrollTo(0,0);if(!s)$("ov").classList.remove("on");updBar()}
function openCart(){$("ov").classList.add("on");updBar()}
function closeCart(){$("ov").classList.remove("on");updBar()}
// KETADIYUU harflari
$("go").innerHTML="KETADIYUU".split("").map(function(ch,i){return '<span style="animation-delay:'+(i*70)+'ms">'+ch+'</span>'}).join("");
document.addEventListener("click",function(e){
 var a=function(n){return e.target.getAttribute&&e.target.getAttribute(n)},p=a("data-p"),m=a("data-m"),c=a("data-c"),l=a("data-l");
 if(l){lang=l;renderAll();return}
 if(c){cat=c;renderCatalog();return}
 if(p)qty[p]=(qty[p]||0)+1;else if(m){qty[m]=(qty[m]||1)-1;if(!qty[m])delete qty[m]}else return;
 renderCatalog();renderCart();
});
$("cartBtn").onclick=openCart;$("barBtn").onclick=openCart;$("close").onclick=closeCart;
$("ov").addEventListener("click",function(e){if(e.target===$("ov"))closeCart()});
document.addEventListener("keydown",function(e){if(e.key=="Escape")closeCart()});
window.addEventListener("hashchange",route);
var pos=null;
$("loc").onclick=function(){var t=T[lang],s=$("locst");
 if(!navigator.geolocation){s.textContent=t.locErr;return}
 s.textContent=t.locBusy;
 navigator.geolocation.getCurrentPosition(function(r){pos={a:r.coords.latitude.toFixed(6),o:r.coords.longitude.toFixed(6)};s.textContent="✅ "+t.locOk},function(){pos=null;s.textContent=t.locErr},{enableHighAccuracy:true,timeout:15000,maximumAge:60000});
};
$("tg").onclick=function(){
 var t=T[lang],n=$("name").value.trim(),ph=$("phone").value.trim(),ad=$("addr").value.trim(),er="";
 if(!count())er=t.eEmpty;else if(total()<MIN_ORDER)er=t.eMin+fmt(MIN_ORDER);else if(!n)er=t.eName;else if(!ph)er=t.ePhone;else if(!ad&&!pos)er=t.eAddr;
 $("err").style.color="var(--margin)";$("err").textContent=er;if(er)return;
 var L=["🥟 "+t.ord,""];
 ITEMS.forEach(function(it){if(qty[it.id])L.push(nm(it)+" × "+qty[it.id]+" = "+fmt(qty[it.id]*it.p))});
 if(DELIVERY_FEE)L.push(t.dl+": "+fmt(DELIVERY_FEE));
 L.push("",t.sum+": "+fmt(total()+DELIVERY_FEE),"",t.n+": "+n,t.ph+": "+ph,t.ad+": "+(ad||"-"),t.py+": "+($("pay").value=="cash"?t.pc:t.pk));
 if(pos)L.push("📍 Google: https://maps.google.com/?q="+pos.a+","+pos.o,"📍 Yandex: https://yandex.com/maps/?pt="+pos.o+","+pos.a+"&z=17");
 if($("note").value.trim())L.push(t.nt+": "+$("note").value.trim());
 var txt=L.join("\n");
 var payload={items:Object.keys(qty).map(function(k){return {id:+k,q:qty[k]}}),name:n,phone:ph,addr:ad,pay:$("pay").value,note:$("note").value.trim(),pos:pos,hp:$("hp").value};
 $("tg").disabled=true;
 fetch("/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)})
 .then(function(r){if(!r.ok)throw 0;return r.json()})
 .then(function(){qty={};renderCatalog();renderCart();$("err").style.color="var(--ink)";$("err").textContent=t.sent;$("tg").disabled=false})
 .catch(function(){$("tg").disabled=false;$("err").style.color="var(--margin)";$("err").textContent=t.fail});
};
renderAll();route();
