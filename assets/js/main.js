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

			//TESTE
			$inputUrlImage.get(0).value    = 'http://carroecarros.com.br/wp-content/uploads/2017/06/Novo-Punto-2018-6.jpg';
			$inputMarcaModelo.get(0).value = 'VW Gol 1.6';
			$inputAno.get(0).value 		   = '2000';
			$inputPlaca.get(0).value	   = 'MPB-2900';
			$inputCor.get(0).value		   = 'Prata';
			//TESTE

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
				image: $inputUrlImage.get(0),
				marca: $inputMarcaModelo.get(0),
				ano:   $inputAno.get(0),
				cor:   $inputCor.get(0),
				placa: $inputPlaca.get(0)
			};
			try {
				validateInputs(dataInputs);
				dataInputs.id = ++lastID;
				insertCarInList(dataInputs);
			} catch (e) {
				for (var input in dataInputs) {
					if (dataInputs[input].validate === false)
						dataInputs[input].classList.add('error-validate');
				}
			}
		}
		function handleClickRemoveCar(evt) {
			this.parentElement.parentElement.remove();
		}
		function validateInputs(data) {
			var messages = '';
			if (! (!!data.image.value.match(/^https?:\/\/\w[\w\W]+\/[\w/-]+\.[jpe?g|png|gif]+$/g)) ) {
				messages = ' - Imagem/URL \n';
				data.image.validate = false;
			}
			if (! (!!data.marca.value.match(/[\s\S]{5}/g)) ) {
				messages += ' - Marca \n';
				data.marca.validate = false;
			}
			if (! (!!data.ano.value.match(/^(1|2)\d\d/g)) ) {
				messages += ' - Ano \n';
				data.ano.validate = false;
			}
			if (! (!!data.cor.value.match(/\w{3}/g)) ) {
				messages += ' - Cor \n';
				data.cor.validate = false;
			}
			if (! (!!data.placa.value.match(/[A-Za-z]{3,}\-[\d]{4,}/g)) ) {
				messages += ' - Placa \n';
				data.placa.validate = false;
			}

			if (messages !== '')
				throw new Error(messages);
		}
		function insertCarInList(data) {
			var $row = $tableList.get(0).insertRow();
			$row.insertCell().innerHTML = data.id;
			$row.insertCell().appendChild(createElementImg(data.image.value, ['img-table']));
			$row.insertCell().innerHTML = data.marca.value;
			$row.insertCell().innerHTML = data.ano.value;
			$row.insertCell().innerHTML = data.cor.value;
			$row.insertCell().innerHTML = data.placa.value;
			var icoRemove = createElementImg('assets/img/ico-remove.png', ['ico', 'ico-clickable'], 'Remover');
			$row.insertCell().appendChild(icoRemove);
			icoRemove.addEventListener('click', handleClickRemoveCar, false);
		}
		function createElementImg(source, cssClasses, title) {
			var img   = doc.createElement('img');
			img.src   = source;
			img.title = title || source;
			cssClasses.forEach(function(className) {
				img.classList.add(className);
			});
			return img
		}

		return {
			init: init
		};
	}
	win.app = app();
	win.app.init();
})(window, document, window.DOM);