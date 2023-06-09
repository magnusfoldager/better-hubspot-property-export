// Globals
var currentSelected = ''

// Tailwind Helpers
const twShow = (sel) => {
	$(sel).removeClass('hidden')
}
const twHide = (sel) => {
	$(sel).addClass('hidden')
}
const twToggle = (sel) => {
	$(sel).hasClass('hidden') ? twShow(sel) : twHide(sel)
}
const twShowParent = (sel) => {
	console.log('Showing parent of', sel)
	$(sel).parent().removeClass('hidden')
}
const twHideParent = (sel) => {
	console.log('Hiding parent of', sel)
	$(sel).parent().addClass('hidden')
}
const twToggleParent = (sel) => {
	$(sel).parent().hasClass('hidden') ? twShowParent(sel) : twHideParent(sel)
}

// Main Functions
const beginExport = (accessToken, object, archived) => {
	const url = `https://api.hubapi.com/crm/v3/properties/${object}`
	const authorization = `Bearer ${accessToken}`

	console.log(url,authorization,archived)

	$.ajax({
		url,
		crossDomain: true,
		headers: {
		  authorization,
		  'Access-Control-Allow-Origin': '*',
		},
		data: {
		  archived
		}
	  }).done(function(response) {
		console.log(response);
	  });
}

// On Document Ready
$(document).ready(function () {
	$('#object')
		.on('change', function () {
			$('select option:selected').each(function () {
				let selected = $(this).val()
				console.log(selected)
				currentSelected = selected
				selected === 'custom' ? twShowParent('#custom-object') : twHideParent('#custom-object')
			})
		})
		.trigger('change')

	$('#beginExport').click(function () {
		const accessToken = $('#access-token').val()
		const object = currentSelected === 'custom' ? $('#custom-object').val() : currentSelected
		const archived = $('#include-archived').is(":checked")

		beginExport(accessToken, object, archived)
	})
})
