;(function(win, doc, DOM) {
	'use strict';
	function app() {
		var ajax;
		var urlCompanyData;
		var DOMUtils;
		var $tableList;
		var $form;
		var $inputUrlImage;
		var $inputMarcaModelo;
		var $inputAno;
		var $inputPlaca;
		var $inputCor;
		var lastID = 0;

		function init() {
			DOMUtils   	   = new DOM();
			ajax 		   = new XMLHttpRequest();
			urlCompanyData = "company.json";
			$form  		   = new DOM('[data-js="form_register"]');
			$inputUrlImage = new DOM('[data-js="url_image"]');
			$inputAno 	   = new DOM('[data-js="ano"]');
			$inputPlaca    = new DOM('[data-js="placa"]');
			$inputCor      = new DOM('[data-js="cor"]');
			$inputMarcaModelo = new DOM('[data-js="marca_modelo"]');
			$tableList 	   = new DOM('[data-js="tableList"]');
			loadDataCompany();
			initEvents();
		}
		function initEvents() {
			$form.on('submit', handleSubmitForm);
		}
		function loadDataCompany() {
			ajax.open('GET', urlCompanyData);
			ajax.send();
			ajax.addEventListener('readystatechange', handleReadyStateChange, false);
		}
		function handleReadyStateChange() {
			if (isRequestOk())
				fillInfoCompany(JSON.parse(ajax.responseText));
		}
		function isRequestOk() {
			return ajax.readyState === 4 && ajax.status === 200
		}
		function fillInfoCompany(dataJson) {
			new DOM('[data-js="AppName"]').get(0).innerHTML  = dataJson.name;
			new DOM('[data-js="AppPhone"]').get(0).innerHTML = dataJson.phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/g, '($1) $2-$3-$4');
		}

		function handleSubmitForm(evt) {
			evt.preventDefault();
			var dataInputs = {
				id:    ++lastID,
				image: $inputUrlImage.get(0).value,
				marca: $inputMarcaModelo.get(0).value,
				ano:   $inputAno.get(0).value,
				cor:   $inputCor.get(0).value,
				placa: $inputPlaca.get(0).value
			};
			try {
				validateInputs(dataInputs);
				insertCarInList(dataInputs);
			} catch (e) {
				alert('Favor verificar e corrigir os seguintes campos: \n\n' + e.message);
			}
		}
		function validateInputs(data) {
			var messages = '';
			if (! (!!data.image.match(/^https?:\/\/\w[\w\W]+\/[\w/-]+\.[jpe?g|png|gif]+$/g)) )
				messages = ' - Imagem/URL \n';
			if (! (!!data.marca.match(/[\s\S]{5}/g)) )
				messages += ' - Marca \n';
			if (! (!!data.ano.match(/^(1|2)\d\d/g)) )
				messages += ' - Ano \n';
			if (! (!!data.cor.match(/\w{3}/g)) )
				messages += ' - Cor \n';
			if (! (!!data.placa.match(/[A-Za-z]{3,}\-[\d]{4,}/g)) )
				messages += ' - Placa \n';

			if (messages !== '')
				throw new Error(messages);
		}
		function insertCarInList(data) {
			var $row = $tableList.get(0).insertRow();
			$row.insertCell().innerHTML   = data.id;
			$row.insertCell().appendChild(createElementImg(data.image));
			$row.insertCell().innerHTML = data.marca;
			$row.insertCell().innerHTML = data.ano;
			$row.insertCell().innerHTML = data.cor;
			$row.insertCell().innerHTML = data.placa;
		}
		function createElementImg(source) {
			var img   = doc.createElement('img');
			img.src   = source;
			img.width = 50;
			img.title = source;
			return img
		}

		return {
			init: init
		};
	}
	win.app = app();
	win.app.init();
})(window, document, window.DOM);