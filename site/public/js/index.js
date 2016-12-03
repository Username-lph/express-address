//$(function() {
//	function format(arr) {
//		var r = {};
//		$.each(arr, function(i, v) {
//			var key = v.name.charAt(0)
//				//console.log(key)
//			if(!r[key]) {
//				r[key] = [];
//				r[key].push(v);
//			} else {
//				r[key].push(v);
//			}
//		});
//		return r;
//	}
//	
//	$.ajax({
//		url: "/user",
//		type: 'get',
//		success: function(r) {
//			var data = format(r);
//			var i = 0;
//			for(var letter in data) {
//				i += 1;
//				$('<div>').text(letter).appendTo('.letter');
//				$('<dt>' + letter + '</dt>').appendTo("#contact");
//				$.each(data[letter], function(i, v) {
//					$('<dd>' + v.name + '</dd>').appendTo("#contact");
//				})
////				$('<dt>').prev().css("border", 'none');
//				$('.letter').height(20 * i);
//			}
//		}
//	});
//});

//$(function() {
//	function format(arr) {
//		var r = {};
//		arr.forEach(function(v, i) {
//			var key = v.pinyin.charAt(0).toUpperCase();
//			if(r[key]) {
//				r[key].push(v);
//			} else {
//				r[key] = [];
//				r[key].push(v);
//			}
//		})
//		return r;
//	}
//	
//	var letters = [];
//	
//	function render(arr) {
//		$('#contact,.letter').empty();
//		var obj = format(arr);
//		letters = Object.keys(obj).sort();
//		console.log(obj)
//		$(".letter").height(20 * letters.length);
//		letters.forEach(function(v, i) {
//			$('<div>').text(v).appendTo('.letter');
//			$('<dt>').text(v).appendTo("#contact");
//			obj[v].forEach(function(v, i) {
//				$('<dd>').text(v.name).appendTo("#contact");
//			});
//		});
////		$('<dt>').prev().css('border', 'none');
//		//		return contacts;
//	}
//	
//	var contacts = [];
//	
//	$.ajax({
//		url: '/user',
//		type: 'get',
//		success: function(r) {
//			contacts = r;
//			render(contacts);
//		}
//	});
//
//	//	$('.search').on('keyup', function() {
//	//		var val = $.trim($(this).val());
//	//		var tmp = [];
//	//		contacts.forEach(function() {
//	//			if(v.phone.indexOf(val) != -1) {
//	//				tmp.push(v);
//	//			}
//	//		});
//	//		return(tmp);
//	//	});
//});

$(function() {
	// 所有的联系人集合
	var contacts = [];

	// 所有的字母集合
	var letters = [];

	// 所有dt到页面顶部的距离集合
	var table = [];

	// 根据数据渲染页面
	function render(arr) {
		$('#contact,#c-index').empty();
		var obj = format(arr);
		letters = Object.keys(obj).sort();
		$('#c-index').height(21.59 * letters.length);
		letters.forEach(function(v, i) {
			$('<dt>').text(v).appendTo('#contact');
			$('<div>').text(v).appendTo('#c-index');
			obj[v].forEach(function(v, i) {
				$('<dd><a href="tel:' + v.phone + '"></a>' + v.name + '</dd>').appendTo('#contact');
			});
		});
		$('#tip').text(letters[0]);
		$('dt').prev().css('border', 'none');
		table = [];
		$('dt').each(function(i, v) {
			table.push($(this).offset().top - 78);
		});
	}
	// 把线性数组转换为对象
	function format(arr) {
		var o = {};
		arr.forEach(function(v, i) {
			var key = v.pinyin.charAt(0).toUpperCase();
			if(o[key]) {
				o[key].push(v);
			} else {
				o[key] = [];
				o[key].push(v);
			}
		});
		return o;
	}
	// 根据搜索关键字过滤数组并更新页面
	function filter(key) {
		var tmp = [];
		contacts.forEach(function(v, i) {
			if(v.name.indexOf(key) !== -1 ||
				v.phone.indexOf(key) !== -1 ||
				v.pinyin.indexOf(key) !== -1) {
				tmp.push(v);
			}
		});
		render(tmp);
	}
	// 页面滚动的时候执行的函数 (做页面tip的停留效果)
	function onScroll() {
		var index;
		var top = $(window).scrollTop();
		table.forEach(function(v, i) {
			if(top > v) {
				index = i;
			}
		});
		$('#tip').text(letters[index]);
	}
	// 处理字母的点击 (点哪个字母去哪里)
	function handleClick() {
		var index = $(this).index();
		$(window).scrollTop(table[index] + 30);
	}

	///////////////////////////////////

	$.ajax({
		url: '/user',
		type: 'get',
		success: function(r) {
			contacts = r;
			render(contacts);
		}
	});
	$('.search').on('keyup', function() {
		filter($.trim($(this).val()));
	});
	$(window).on('scroll', onScroll);
	$('#c-index').on('click', 'div', handleClick);
});