;(function(win, doc, DOM) {
	'use strict';
	function app() {
		var ajaxCompany;
		var ajaxCar;
		var urlApiCompany;
		var urlApiCars;
		var DOMUtils;
		var $tableList;
		var $form;
		var $inputUrlImage;
		var $inputMarcaModelo;
		var $inputAno;
		var $inputPlaca;
		var $inputCor;
		var lastID;

		function init() {
			DOMUtils   	   = new DOM();
			ajaxCompany    = new XMLHttpRequest();
			ajaxCar 	   = new XMLHttpRequest();
			urlApiCompany  = 'company.json';
			urlApiCars 	   = 'http://localhost:3000/car';
			lastID 	   	   = 0;
			$form  		   = new DOM('[data-js="form_register"]');
			$inputUrlImage = new DOM('[data-js="image"]');
			$inputAno 	   = new DOM('[data-js="year"]');
			$inputPlaca    = new DOM('[data-js="plate"]');
			$inputCor      = new DOM('[data-js="color"]');
			$inputMarcaModelo = new DOM('[data-js="brandModel"]');
			$tableList 	   = new DOM('[data-js="tableList"]');

			//TESTE
			$inputUrlImage.get(0).value    = 'http://carroecarros.com.br/wp-content/uploads/2017/06/Novo-Punto-2018-6.jpg';
			$inputMarcaModelo.get(0).value = 'VW Gol 1.6';
			$inputAno.get(0).value 		   = '2000';
			$inputPlaca.get(0).value	   = 'MPB-2900';
			$inputCor.get(0).value		   = 'Prata';
			//TESTE */

			loadDataCompany();
			loadDataCars();
			initEvents();
		}
		function initEvents() {
			$form.on('submit', handleSubmitForm);
		}
		function loadDataCompany() {
			ajaxCompany.open('GET', urlApiCompany);
			ajaxCompany.send();
			ajaxCompany.addEventListener('readystatechange', handleAjaxGetCompany);
		}
		function fillInfoCompany(dataJson) {
			new DOM('[data-js="AppName"]').get(0).innerHTML  = dataJson.name;
			new DOM('[data-js="AppPhone"]').get(0).innerHTML = dataJson.phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/g, '($1) $2-$3-$4');
		}
		function loadDataCars() {
			ajaxCar.open('GET', urlApiCars);
			ajaxCar.send();
			ajaxCar.addEventListener('readystatechange', handleAjaxGetCars);
		}
		function isRequestOk(request) {
			return request.readyState === 4 && request.status === 200
		}
		function validateInputs(data) {
			var messages = '';
			if (! (!!data.image.match(/^https?:\/\/\w[\w\W]+\/[\w/-]+\.[jpe?g|png|gif]+$/g)) ) {
				messages = ' - Imagem/URL \n';
			}
			if (! (!!data.brandModel.match(/[\s\S]{5}/g)) ) {
				messages += ' - Marca \n';
			}
			if (! (!!data.year.match(/^(1|2)\d\d/g)) ) {
				messages += ' - Ano \n';
			}
			if (! (!!data.color.match(/\w{3}/g)) ) {
				messages += ' - Cor \n';
			}
			if (! (!!data.plate.match(/[A-Za-z]{3,}\-[\d]{4,}/g)) ) {
				messages += ' - Placa \n';
			}

			if (messages !== '')
				throw new Error(messages);
		}
		function insertCarInList(data) {
			var $row = $tableList.get(0).insertRow();
			$row.insertCell().innerHTML = lastID = data.id;
			$row.insertCell().appendChild(createElementImg(data.image, ['img-table']));
			$row.insertCell().innerHTML = data.brandModel;
			$row.insertCell().innerHTML = data.year;
			$row.insertCell().innerHTML = data.color;
			$row.insertCell().innerHTML = data.plate;
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

		function handleAjaxGetCompany() {
			if (isRequestOk(ajaxCompany))
				fillInfoCompany(JSON.parse(ajaxCompany.responseText));
		}
		function handleAjaxGetCars() {
			if (!isRequestOk(ajaxCar)) return;
			var cars = JSON.parse(ajaxCar.responseText);
			cars.forEach(function (car) {
				insertCarInList(car);
			});
		}
		function handleSubmitForm(e) {
			e.preventDefault();
			var dataInputs = {
				image: $inputUrlImage.get(0).value,
				brandModel: $inputMarcaModelo.get(0).value,
				year:  $inputAno.get(0).value,
				color: $inputCor.get(0).value,
				plate: $inputPlaca.get(0).value
			};
			try {
				validateInputs(dataInputs);
				dataInputs.id = ++lastID;
				insertCarInList(dataInputs);
			} catch (e) {
				alert('Campos inválidos: \n' + e.message);
			}
		}
		function handleClickRemoveCar() {
			this.parentElement.parentElement.remove();
		}

		return {
			init: init
		};
	}
	win.app = app();
	win.app.init();
})(window, document, window.DOM);