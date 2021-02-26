const $$=document.querySelector.bind(document);
const $$$=document.querySelectorAll.bind(document);

var count_title=1;


function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
function getScrollbarWidth() {

        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;

    }

/*Nav dropdown*/
function navDropdown() {
	for (let i=0;i<$$$('.nav_dropdown a').length;i++) {
		$$$('.nav_dropdown div')[i].classList.remove('addnavDr');
		$$$('.nav_dropdown div')[i].classList.remove('rmnavDr');
		if ((getOffset($$$('.nav_dropdown')[i]).left+$$$('.nav_dropdown')[i].offsetWidth/2)<window.innerWidth/2) {
			if ($$$('.nav_dropdown div')[i].offsetWidth/2>(getOffset($$$('.nav_dropdown')[i]).left+$$$('.nav_dropdown')[i].offsetWidth/2)) {
				$$$('.nav_dropdown div')[i].style.left = -(getOffset($$$('.nav_dropdown')[i]).left-50)+'px';
			} else {
				$$$('.nav_dropdown div')[i].style.left = -($$$('.nav_dropdown div')[i].offsetWidth/2-$$$('.nav_dropdown')[i].offsetWidth/2-25)+'px';
			}
			
		} else {
			if ($$$('.nav_dropdown div')[i].offsetWidth/2>(window.innerWidth-(getOffset($$$('.nav_dropdown')[i]).left+$$$('.nav_dropdown')[i].offsetWidth/2))) {
				$$$('.nav_dropdown div')[i].style.left = -($$$('.nav_dropdown div')[i].offsetWidth-(window.innerWidth-getOffset($$$('.nav_dropdown')[i]).left)+25)+'px';
			} else {
				$$$('.nav_dropdown div')[i].style.left = -($$$('.nav_dropdown div')[i].offsetWidth/2-$$$('.nav_dropdown')[i].offsetWidth/2-25)+'px';
			}
		}
	}

}


/*Hàm chuyển nav khi resize*/
var title_h;
function navDisplay() {
	if (window.innerWidth<992) {
		$$('.banner-content').style.height= $$('.heading-banner').offsetHeight+'px';
		$$('.banner-content').style.top='0px';
	} else {
		$$('.banner-content').style.height= ($$('.heading-banner').offsetHeight-$$$('header .content')[1].offsetHeight)+'px';
		$$('.banner-content').style.top= $$$('header .content')[1].offsetHeight+'px';
		
	}
	setTimeout(()=>{
		$$('.banner-content').style.opacity='1';
	},10)

	if(count_title===1) {
		title_h = $$('header .title').offsetHeight;
	} else {
		title_h = 0;
	}
	if (document.body.scrollTop > title_h || 
		document.documentElement.scrollTop > title_h)  {
		    $$$('header .content')[1].style.top = '0px';
		   /* $$$('header .content')[1].style.left =(window.innerWidth-$$$('header .content')[1].offsetWidth-getScrollbarWidth())/2+'px';*/
		    $$$('header .content')[1].style.backgroundColor = 'black';
		    $$$('header .content')[1].style.borderBottom = 'none';
		
	} else {
			$$$('header .content')[1].style.top = title_h+'px';
		    $$$('header .content')[1].style.backgroundColor = 'transparent';
			$$$('header .content')[1].style.borderBottom = '0.5px solid silver';
			/*$$$('header .content')[1].style.left='0px';*/
			
	}
}

var count_navMb=0;
window.onload = function () {
	navDisplay();
	navDropdown();
	$$('.nav-mb_content .navbar_wrap').style.left = -$$('.nav-mb_content .navbar_wrap').offsetWidth+'px';
	$$('.nav-mb_content').style.backgroundColor = 'rgba(0,0,0,0)';	
	$$('.nav-mb_content').style.visibility = 'hidden';
	$$('.nav-mb').addEventListener('click',()=>{
		count_navMb = count_navMb===0 ? 1 : 0;
		$$('.nav-mb_content').style.transition = '0.5s';
		$$('.navbar_wrap').style.transition = '0.5s';
		$$('.nav-mb_content').style.visibility = 'visible';
		$$('.nav-mb_content .navbar_wrap').style.left = '0';
		$$('.nav-mb_content').style.backgroundColor = 'rgba(0,0,0,0.5)';	
	})
	
	$$('.close_nav').addEventListener('click',()=>{
		count_navMb = 0;
		$$('.nav-mb_content').style.transition = '0.5s';
		$$('.navbar_wrap').style.transition = '0.5s';
		$$('.nav-mb_content .navbar_wrap').style.left = -$$('.nav-mb_content .navbar_wrap').offsetWidth+'px';
		$$('.nav-mb_content').style.backgroundColor = 'rgba(0,0,0,0)';	
		$$('.nav-mb_content').style.visibility = 'hidden';
	})

	$$('.cart-info').style.right = -$$('.cart-info').offsetWidth+'px';
	$$('.cart-content').style.backgroundColor = 'rgba(0,0,0,0)';
	for (let i=0;i<$$$('.cart').length;i++) {
		$$$('.cart')[i].addEventListener('click',()=>{
			document.body.style.overflowY='hidden';
			$$('.cart-content').style.visibility = 'visible';
			$$('.cart-info').style.right = '0px';
			$$('.cart-content').style.backgroundColor = 'rgba(0,0,0,0.5)';
		})
	}

	for (let i=0;i<$$$('.contact').length;i++) {
		$$$('.contact')[i].addEventListener('click',()=>{
			document.body.style.overflowY='hidden';
			$$('#login').style.visibility='visible';
			$$('#login').style.opacity='1';
			$$('#login').style.overflowY='scroll';
			$$('#login .modal-content').style.transform='scale(1)';

		})
	}
	
	$$('#login .modal-footer span.h5').addEventListener('click',()=>{
		$$('#login').style.visibility='hidden';
		$$('#login').style.opacity='0';
		$$('#login').style.overflowY='hidden';
		$$('#login .modal-content').style.transform='scale(0.5)';
		$$('#register').style.visibility='visible';
		$$('#register').style.opacity='1';
		$$('#register').style.overflowY='scroll';
		$$('#register .modal-content').style.transform='scale(1)';

	})
	$$('#register .modal-footer span.h5').addEventListener('click',()=>{
		$$('#register').style.visibility='hidden';
		$$('#register').style.opacity='0';
		$$('#register').style.overflowY='hidden';
		$$('#register .modal-content').style.transform='scale(0.5)';
		$$('#login').style.visibility='visible';
		$$('#login').style.opacity='1';
		$$('#login').style.overflowY='scroll';
		$$('#login .modal-content').style.transform='scale(1)';

	})


	$$('header > .title .fa-times').addEventListener('click',()=>{
		$$('header .title').remove();
		count_title = 0;
	})


	var count_search=0;
	$$('.content-mb .search-mb .fa-search').addEventListener('click',()=>{
		count_search = count_search===0 ? 1:0;
		if(count_search===1) {
			$$('.content-mb .search-mb_content').style.transform= 'scaleY(1)';
		} else {
			$$('.content-mb .search-mb_content').style.transform= 'scaleY(0)';
		}
	})
	var count_drMb=[];
	for (let i=0;i<$$$('.nav-mb_content .title_icon').length;i++) {
		count_drMb[i]=0;
		$$$('.nav-mb_content .title_icon')[i].addEventListener('click',()=>{
			count_drMb[i] = count_drMb[i]===0 ? 1:0;
			if(count_drMb[i]===1) {
				$$$('.nav-mb_content .dropdown_toggle')[i].style.borderColor = '#e5b72d';
				$$$('.nav-mb_content .dropdown_toggle')[i].style.transform = 'rotate(135deg)';
				$$$('.nav-mb_content .dropdown_menu')[i].style.display='block';
				setTimeout(()=>{
					$$$('.nav-mb_content .dropdown_menu')[i].style.transform='scaleY(1)';
				},10)
			} else {
				$$$('.nav-mb_content .dropdown_toggle')[i].style.borderColor = '#b1b1b1';
				$$$('.nav-mb_content .dropdown_toggle')[i].style.transform = 'rotate(45deg)';
				$$$('.nav-mb_content .dropdown_menu')[i].style.transform='scaleY(0)';
				setTimeout(()=>{
					$$$('.nav-mb_content .dropdown_menu')[i].style.display='none';
				},200)
			}
		})
	}
	for (let i=0;i<$$$('.nav_dropdown a').length;i++) {
		$$$('.nav_dropdown')[i].addEventListener('mouseenter',()=>{
			$$$('.nav_dropdown div')[i].classList.add('addnavDr');
			$$$('.nav_dropdown div')[i].style.animationDuration = '0.5s';
			$$$('.nav_dropdown div')[i].classList.remove('rmnavDr');

		})
		$$$('.nav_dropdown')[i].addEventListener('mouseleave',()=>{
			$$$('.nav_dropdown div')[i].style.animationDuration = '0.2s';
			$$$('.nav_dropdown div')[i].classList.remove('addnavDr');
			$$$('.nav_dropdown div')[i].classList.add('rmnavDr');
		})
	}	


	document.body.addEventListener('click',(event)=>{
		if (event.target.classList.contains('nav-mb_content')) {
			$$('.nav-mb_content').style.transition = '0.5s';
			$$('.navbar_wrap').style.transition = '0.5s';
			$$('.nav-mb_content .navbar_wrap').style.left = -$$('.nav-mb_content .navbar_wrap').offsetWidth+'px';
			$$('.nav-mb_content').style.backgroundColor = 'rgba(0,0,0,0)';	
			$$('.nav-mb_content').style.visibility = 'hidden';
			count_navMb=0;
		}
		if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
			document.body.style.overflowY='scroll';
			for(let i=0;i<$$$('.modal').length;i++) {
				$$$('.modal')[i].style.visibility='hidden';
				$$$('.modal')[i].style.opacity='0';
				$$$('.modal')[i].style.overflowY='hidden';
				$$$('.modal-content')[i].style.transform='scale(0.5)';
			}
		}
		if(event.target.classList.contains('sidebar')) {
			$$('.sidebar').style.left = '-100%';
	 		$$('.mask').style.visibility = 'hidden';
	 		$$('.mask').style.opacity = '0';
	 		$$('body').style.overflowY = 'scroll';
		}
		if(event.target.classList.contains('cart-content') || event.target.classList.contains('fa-times')) {
			$$('header > .cart-content').style.backgroundColor = 'rgba(0,0,0,0)';
			$$('.cart-content').style.visibility = 'hidden';
			$$('header > .cart-content .cart-info').style.right = -$$('header > .cart-content .cart-info').offsetWidth + 'px';
			document.body.style.overflowY='scroll';
		}
	})

}

 


window.onresize = function() {
	navDisplay();
	navDropdown();
	$$('.nav-mb_content').style.transition = '0s';
	$$('.navbar_wrap').style.transition = '0s';
	if(count_navMb===0) {
		$$('.nav-mb_content .navbar_wrap').style.left = -$$('.nav-mb_content .navbar_wrap').offsetWidth+'px';
	}
	/*$$$('header .content')[1].style.left =(window.innerWidth-$$$('header .content')[1].offsetWidth-getScrollbarWidth())/2+'px';*/
	let x=Math.round((($$('.min .content').innerHTML-30)/3420)*$$('.range').offsetWidth)-10;
	$$('.min').style.left = x+'px';
	let y=Math.round((($$('.max .content').innerHTML-30)/3420)*$$('.range').offsetWidth)-10;
	$$('.max').style.left = y+'px';
}
window.onscroll = function() {
	if(count_title===1) {
		title_h = $$('header .title').offsetHeight;
	} else {
		title_h = 0;
	}
	if (document.body.scrollTop > title_h || 
		document.documentElement.scrollTop > title_h)  {
		    $$$('header .content')[1].style.top = '0px';
		   /* $$$('header .content')[1].style.left =(window.innerWidth-$$$('header .content')[1].offsetWidth-getScrollbarWidth())/2+'px';*/
		    $$$('header .content')[1].style.backgroundColor = 'black';
		    $$$('header .content')[1].style.borderBottom = 'none';
		
	} else {
			$$$('header .content')[1].style.top = title_h+'px';
		    $$$('header .content')[1].style.backgroundColor = 'transparent';
			$$$('header .content')[1].style.borderBottom = '0.5px solid silver';
			/*$$$('header .content')[1].style.left='0px';*/
			
	}

	for(let i=1;i<=12;i++) {
		if ((getOffset($$(`.product-item${i}`)).top-document.documentElement.scrollTop+50)<window.innerHeight) {
      		$(`.product-item${i}`).css({'opacity':1,'transform':'translateY(0px)','visibility':'visible'});
      	}
    }
	
}








 /*setInterval(()=>{
 	if (count_title===1) {
 		if (document.documentElement.scrollTop<=48){
 			$$$('header .content')[1].style.left ='0px';
 		}
 	} else {

 	}
 })*/


	function selectMin() {
		$$('body').addEventListener('mouseup',()=>{
			$$('body').removeEventListener('mousemove',selectMin);
		});
	  	if (event.clientX>=getOffset($$('.range')).left && event.clientX<=getOffset($$('.range')).left+$$('.range').offsetWidth) {
	  		$$('.min').style.left=(event.clientX-getOffset($$('.range')).left-10)+'px';
	  	}
	  	let x=Math.round(((getOffset($$('.min')).left+10-getOffset($$('.range')).left)/$$('.range').offsetWidth)*3420)+30;
	  	$$('.min .content').innerHTML = x;

	} 
    $$('.min').addEventListener('mousedown',()=>{
    	event.preventDefault()
  		let x=Math.round(((getOffset($$('.min')).left+10-getOffset($$('.range')).left)/$$('.range').offsetWidth)*3420)+30;
  		$$('.min .content').innerHTML = x;
  		$$('.min .content').style.opacity = 1;
  		$$('body').addEventListener('mousemove',selectMin);
  	})
  
  	
  
	function selectMax() {
		$$('body').addEventListener('mouseup',()=>{
			$$('body').removeEventListener('mousemove',selectMax);
		});
		let x=Math.round(((getOffset($$('.max')).left+10-getOffset($$('.range')).left)/$$('.range').offsetWidth)*3420)+30;
	  	if (event.clientX>=getOffset($$('.range')).left && event.clientX<=getOffset($$('.range')).left+$$('.range').offsetWidth) {
	  		$$('.max').style.left=(event.clientX-getOffset($$('.range')).left-10)+'px';
	  	}
	  	$$('.max .content').innerHTML = x;
	} 

	$$('.max').addEventListener('mousedown',()=>{
		event.preventDefault();
	  	let x=Math.round(((getOffset($$('.min')).left+10-getOffset($$('.range')).left)/$$('.range').offsetWidth)*3420)+30;
	  	$$('.max .content').style.opacity = 1;
	  	$$('body').addEventListener('mousemove',selectMax);
	 })

	var view='col-md-4 col-6';
	var count_heart = [];
	function View(){
		var number=13;
		var text='';
		for(let i=1;i<=12;i++) {
			number-=1;
			text+=`<div class="${view}">
                <div class="product-item product-item${i} d-flex justify-content-center">
                  <div class='product-item_wrap'>
	                  <div class="p-image position-relative">
	                    <a href="#" class="d-block">
	                      <img src="img/product${i}.gif" class="img-fluid mainpr">
	                      <img src="img/product${number}.gif" class="img-fluid detailpr">
	                    </a>
	                    <div class="control position-absolute d-lg-flex d-none">
	                    	<div class='control-item'>
	                    	<i class="fas fa-heart"></i><i class="far fa-heart"></i>
	                    	<span>Add to Wishlist</span>
	                    	</div>
	                    	<div class='control-item mx-2'><i class="fas fa-search"></i></div>
	                    	<div class='control-item'><i class="fas fa-shopping-bag"></i></div>
	                    </div>
	                  </div>
	                  <div class="p-info">
	                    <h3 class="p-title"><a href="#">Women's flyde classic outer</a></h3>
	                    <p class="p-price">$320.00</p>
	                  </div>
                  </div>
                </div>
              </div>`
		}
		$('.product').html(text);
		for(let i=1;i<=12;i++) {
			if ((getOffset($$(`.product-item${i}`)).top-document.documentElement.scrollTop+50)<window.innerHeight) {
	      		$(`.product-item${i}`).css({'opacity':1,'transform':'translateY(0px)','visibility':'visible'});
	      	}
    	}
    	for(let i=0;i<$$$('.product .control .control-item:nth-child(1)').length;i++) {
			$$$('.product .control .control-item:nth-child(1)')[i].addEventListener('click',()=>{
				if(count_heart[i]===0) {
					$$$('.product .far.fa-heart')[i].style.display = 'none';
			 		$$$('.product .fas.fa-heart')[i].style.display = 'block';
			 		$$$('.product .control .control-item:nth-child(1) span')[i].innerHTML = 'Browse Wishlist';
			 		count_heart[i]=1;
				} else {
			 		$$$('.product .far.fa-heart')[i].style.display = 'block';
			 		$$$('.product .fas.fa-heart')[i].style.display = 'none';
			 		$$$('.product .control .control-item:nth-child(1) span')[i].innerHTML = 'Add to Wishlist';
			 		count_heart[i]=0;
			 	}
			})
		}
		for(let i=0;i<$$$('.product .control .control-item:nth-child(1)').length;i++) {
			if(count_heart[i]===1) {
				$$$('.product .far.fa-heart')[i].style.display = 'none';
		 		$$$('.product .fas.fa-heart')[i].style.display = 'block';
		 		$$$('.product .control .control-item:nth-child(1) span')[i].innerHTML = 'Browse Wishlist';
			} else {
		 		$$$('.product .far.fa-heart')[i].style.display = 'block';
		 		$$$('.product .fas.fa-heart')[i].style.display = 'none';
		 		$$$('.product .control .control-item:nth-child(1) span')[i].innerHTML = 'Add to Wishlist';
		 	}
		}
		
	}
	View();
	for(let i=0;i<$$$('.product .control .control-item:nth-child(1)').length;i++) {
		count_heart[i] = 0;
	}




 	$$('.filter-icon').addEventListener('click',()=>{
 		if(window.innerWidth<992) {
 			$$('.sidebar').style.left = 0;
	 		$$('.mask').style.visibility = 'visible';
	 		$$('.mask').style.opacity = '1';
	 		$$('body').style.overflowY = 'hidden';
 		}
 	})

 	$$('.small').addEventListener('click',()=>{
 		view ='col-md-3 col-4';
 		$$('.small').style.fill = '#e5b72d';
 		$$('.medium').style.fill = 'black';
 		$$('.large').style.fill = 'black';
 		View();
 	})
 	$$('.medium').addEventListener('click',()=>{
 		view ='col-md-4 col-6';
 		$$('.medium').style.fill = '#e5b72d';
 		$$('.small').style.fill = 'black';
 		$$('.large').style.fill = 'black';
 		View();
 	})
 	$$('.large').addEventListener('click',()=>{
 		view ='col-md-6 col-12';
 		$$('.large').style.fill = '#e5b72d';
 		$$('.small').style.fill = 'black';
 		$$('.medium').style.fill = 'black';
 		View();
 	})

 	function rmSelected(elmn) {
 		for(let i=0; i<$$$('main .content .title .left .fa-times').length;i++) {
 			if ($$$('main .content .title .left .filter-selected div')[i].innerHTML===elmn.parentNode.innerHTML) {
 				$$$('main .content .title .left .filter-selected')[i].remove();
 			}

	 	}
	 	for(let j=0; j<$$$('main .sidebar .select-list input').length;j++) {
	 		if(elmn.parentNode.classList.contains($$$('main .sidebar .select-list input')[j].value)) {
	 			$$$('main .sidebar .select-list input')[j].checked = false;
	 		}	
		}
		for(let j=0; j<$$$('main .sidebar .price input').length;j++) {
	 		if(elmn.parentNode.classList.contains($$$('main .sidebar .price input')[j].value)) {
	 			$$$('main .sidebar .price input')[j].checked = false;
	 		}	
		}
		for(let j=0; j<$$$('main .sidebar .filter-color input').length;j++) {
	 		if(elmn.parentNode.classList.contains($$$('main .sidebar .filter-color input')[j].value)) {
	 			$$$('main .sidebar .filter-color input')[j].checked = false;
	 		}	
		}
 	}

 	for(let i=0; i<$$$('main .sidebar .select-list input').length;i++) {
		$$$('main .sidebar .select-list input')[i].addEventListener('click',()=>{
			if($$$('main .sidebar .select-list input')[i].checked===true){
				let text = document.createElement('div');
				text.setAttribute('class','filter-selected filter mb-1');
				text.innerHTML= `<div class="d-flex justify-content-center align-items-center ${$$$('main .sidebar .select-list input')[i].value}">
                  	<i class="fas fa-times" onclick="rmSelected(this)"></i>Size ${$$$('main .sidebar .select-list input')[i].value}
                  </div>`;   
                $$$('main .content .title .left')[0].appendChild(text);
			} else {
				for(let j=0; j<$$$('main .content .title .left .fa-times').length;j++) {
		 			if ($$$('main .content .title .left .filter-selected div')[j].classList.contains($$$('main .sidebar .select-list input')[i].value)){
		 				$$$('main .content .title .left .filter-selected')[j].remove();
		 			}
			 	}
			}
		})
 	}

 	for(let i=0; i<$$$('main .sidebar .price input').length;i++) {
		$$$('main .sidebar .price input')[i].addEventListener('click',()=>{
			if($$$('main .sidebar .price input')[i].checked===true){
				let text = document.createElement('div');
				text.setAttribute('class','filter-selected filter mb-1');
				text.innerHTML= `<div class="d-flex justify-content-center align-items-center ${$$$('main .sidebar .price input')[i].value}">
                  	<i class="fas fa-times" onclick="rmSelected(this)"></i>${$$$('main .sidebar .price input')[i].value}
                  </div>`;   
                $$$('main .content .title .left')[0].appendChild(text);
			} else {
				for(let j=0; j<$$$('main .content .title .left .fa-times').length;j++) {
		 			if ($$$('main .content .title .left .filter-selected div')[j].classList.contains($$$('main .sidebar .price input')[i].value)){
		 				$$$('main .content .title .left .filter-selected')[j].remove();
		 			}
			 	}
			}
		})
 	}
 	for(let i=0; i<$$$('main .sidebar .filter-color input').length;i++) {
		$$$('main .sidebar .filter-color input')[i].addEventListener('click',()=>{
			if($$$('main .sidebar .filter-color input')[i].checked===true){
				let text = document.createElement('div');
				text.setAttribute('class','filter-selected filter mb-1');
				text.innerHTML= `<div class="d-flex justify-content-center align-items-center ${$$$('main .sidebar .filter-color input')[i].value}">
                  	<i class="fas fa-times" onclick="rmSelected(this)"></i>${$$$('main .sidebar .filter-color input')[i].value}
                  </div>`;   
                $$$('main .content .title .left')[0].appendChild(text);
			} else {
				for(let j=0; j<$$$('main .content .title .left .fa-times').length;j++) {
		 			if ($$$('main .content .title .left .filter-selected div')[j].classList.contains($$$('main .sidebar .filter-color input')[i].value)){
		 				$$$('main .content .title .left .filter-selected')[j].remove();
		 			}
			 	}
			}
		})
 	}
 














