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
	$(sel).parent().removeClass('hidden')
}
const twHideParent = (sel) => {
	$(sel).parent().addClass('hidden')
}
const twToggleParent = (sel) => {
	$(sel).parent().hasClass('hidden') ? twShowParent(sel) : twHideParent(sel)
}
const setButtonStatus = (status) => {
	if (status === 'loading') {
		$('#beginExport').attr('disabled', true).text('Loading Properties from HubSpot..')
	} else if (status === 'exporting') {
		$('#beginExport').attr('disabled', true).text('Downloading CSV..')
	} else if (status === 'failed') {
		$('#beginExport').attr('disabled', false).text('Export failed.. try again?')
	} else $('#beginExport').attr('disabled', false).text('Begin Export')
}

const csvSafeString = (input) => {
	const str = JSON.stringify(input)
	return str?.replace(/"/g, '""')
}

// Main Functions
const beginExport = (accessToken, object, archived) => {
	setButtonStatus('loading')

	const url = `https://better-hubspot-property-export.onrender.com/properties?accessToken=${accessToken}&object=${object}&archived=${archived}`
	$.ajax({
		url,
		type: 'GET',
		dataType: 'json',
		success: function (response) {
			exportToCsv(response, object)
			console.log(response)
		},
		error: function (xhr, status, error) {
			setButtonStatus('failed')
			alert('Export failed. You can try again. See console for more information.')
			console.log('Error:', error)
		}
	})
}

const exportToCsv = (results, object) => {
	setButtonStatus('exporting')

	let array = typeof results != 'object' ? JSON.parse(results) : results
	let csv = 'name,label,calculated,description,createdAt,updatedAt,groupName,fieldType,type,displayOrder,externalOptions,formField,hasUniqueValue,hidden,hubspotDefined,modificationMetadata,options'

	array.forEach(function (item, index) {
		let { name, label, calculated, description, createdAt, updatedAt, groupName, fieldType, type, displayOrder, externalOptions, formField, hasUniqueValue, hidden, hubspotDefined, modificationMetadata, options } = item
		csv += `\r\n"${csvSafeString(name)}","${csvSafeString(label)}","${csvSafeString(calculated)}","${csvSafeString(description)}","${csvSafeString(createdAt)}","${csvSafeString(updatedAt)}","${csvSafeString(groupName)}","${csvSafeString(fieldType)}","${csvSafeString(type)}","${csvSafeString(displayOrder)}","${csvSafeString(externalOptions)}","${csvSafeString(formField)}","${csvSafeString(hasUniqueValue)}","${csvSafeString(hidden)}","${csvSafeString(hubspotDefined)}","${csvSafeString(modificationMetadata)}","${csvSafeString(options)}"`
	})

	const filename = `${object}-${(new Date().toJSON().slice(0,16)).replace(':','-').replace('T','-')}.csv`

	const csvHref = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv)
	$('#download').attr({
		download: filename,
		href: csvHref,
		target: '_blank'
	})
	$('#download')[0].click()
	setButtonStatus('')
}

// On Document Ready
$(document).ready(function () {
	$('#object')
		.on('change', function () {
			$('select option:selected').each(function () {
				let selected = $(this).val()
				currentSelected = selected
				selected === 'custom' ? twShowParent('#custom-object') : twHideParent('#custom-object')
			})
		})
		.trigger('change')

	$('form').submit(function (e) {
		e.preventDefault()
	})

	$('#beginExport').click(function () {
		const accessToken = $('#access-token').val()
		const object = currentSelected === 'custom' ? $('#custom-object').val() : currentSelected
		const archived = $('#only-archived').is(':checked')

		beginExport(accessToken, object, archived)
	})
})
