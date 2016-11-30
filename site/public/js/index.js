$(function() {
	$.ajax({
		type: 'get',
		url: 'user',
		success: function(data) {
			data.forEach(function(v) {
				$('<tr><td>' + v.name + '</td><td>' + v.phone + '</td></tr>').appendTo('tbody');
			})
		}
	})
});