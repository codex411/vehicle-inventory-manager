;(function(win, doc, $) {
	'use strict';
	function app() {
		var ajaxCompany;
		var ajaxCar;
		var urlApiCompany;
		var urlApiCars;
		var $tableList;
		var $form;
		var $inputUrlImage;
		var $inputMarcaModelo;
		var $inputAno;
		var $inputPlaca;
		var $inputCor;
		var lastID;

		function init() {
			urlApiCompany  = 'company.json';
			urlApiCars 	   = 'http://localhost:3000/car';
			lastID 	   	   = 0;
			$form  		   = $('[data-js="form_register"]');
			$inputUrlImage = $('[data-js="image"]');
			$inputAno 	   = $('[data-js="year"]');
			$inputPlaca    = $('[data-js="plate"]');
			$inputCor      = $('[data-js="color"]');
			$inputMarcaModelo = $('[data-js="brandModel"]');
			$tableList 	      = $('[data-js="tableList"] tbody');

			//TESTE
			$inputUrlImage.value    = 'http://carroecarros.com.br/wp-content/uploads/2017/06/Novo-Punto-2018-6.jpg';
			$inputMarcaModelo.value = 'VW Gol 1.6';
			$inputAno.value 		= '2000';
			$inputPlaca.value	    = 'MPB-2900';
			$inputCor.value		    = 'Prata';
			//TESTE */

			loadDataCompany();
			loadDataCars();
			initEvents();
		}
		function initEvents() {
			$form.addEventListener('submit', handleSubmitForm);
		}
		function loadDataCompany() {
			ajaxCompany = new XMLHttpRequest();
			ajaxCompany.open('GET', urlApiCompany);
			ajaxCompany.send();
			ajaxCompany.addEventListener('readystatechange', handleAjaxGetCompany);
		}
		function fillInfoCompany(data) {
			$('[data-js="AppName"]').innerHTML  = data.name;
			$('[data-js="AppPhone"]').innerHTML = data.phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/g, '($1) $2-$3-$4');
		}
		function loadDataCars() {
			ajaxCar = new XMLHttpRequest();
			ajaxCar.open('GET', urlApiCars);
			ajaxCar.send();
			clearTableList();
			ajaxCar.addEventListener('readystatechange', handleAjaxGetCars);
		}
		function clearTableList() {
			$tableList.querySelectorAll('tr').forEach(function (row) {
				row.remove();
			});
		}
		function isRequestOk(request) {
			return request.readyState === 4 && request.status === 200
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
		function getDataInputs() {
			return {
				image: $inputUrlImage.value,
				brandModel: $inputMarcaModelo.value,
				year:  $inputAno.value,
				color: $inputCor.value,
				plate: $inputPlaca.value
			};
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
				throw Error('Campos inválidos: \n' + messages);
		}
		function addRowInListCars(data) {
			$tableList.appendChild(createNewRowCar(data));
		}
		function createNewRowCar(data) {
			var $fragment = doc.createDocumentFragment();
			var $tr  	  = doc.createElement('tr');
			var $tdId 	  = doc.createElement('td');
			var $tdImage  = doc.createElement('td');
			var $tdBrand  = doc.createElement('td');
			var $tdYear   = doc.createElement('td');
			var $tdPlate  = doc.createElement('td');
			var $tdColor  = doc.createElement('td');
			var $tdOptions= doc.createElement('td');
			$tdId.textContent    = lastID = data.id;
			$tdBrand.textContent = data.brandModel;
			$tdYear.textContent  = data.year;
			$tdColor.textContent = data.color;
			$tdPlate.textContent = data.plate;
			$tdImage.appendChild(createElementImg(data.image, ['img-table']));
			var icoRemove = createElementImg('assets/img/ico-remove.png', ['ico', 'ico-clickable'], 'Remover');
			$tdOptions.appendChild(icoRemove);
			icoRemove.addEventListener('click', handleClickRemoveCar, false);
			$tr.appendChild($tdId);
			$tr.appendChild($tdImage);
			$tr.appendChild($tdBrand);
			$tr.appendChild($tdYear);
			$tr.appendChild($tdColor);
			$tr.appendChild($tdPlate);
			$tr.appendChild($tdOptions);
			return $fragment.appendChild($tr);
		}
		function obj4QueryString(obj) {
			var queryStr = '';
			for (var attr in obj)
				queryStr += attr + '=' + obj[attr] + '&';
			return queryStr;
		}
		function saveNewCar(data) {
			var http = new XMLHttpRequest();
			http.open('POST', urlApiCars);
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.addEventListener('readystatechange', function () {
				if (isRequestOk(http)) loadDataCars();
			});
			http.send(obj4QueryString(data));
		}

		function handleAjaxGetCompany() {
			if (isRequestOk(ajaxCompany))
				fillInfoCompany(JSON.parse(ajaxCompany.responseText));
		}
		function handleAjaxGetCars() {
			if (!isRequestOk(ajaxCar)) return;
			var cars = JSON.parse(ajaxCar.responseText);
			cars.forEach(function (car) {
				addRowInListCars(car);
			});
		}
		function handleSubmitForm(e) {
			e.preventDefault();
			var dataInputs = getDataInputs();
			try {
				validateInputs(dataInputs);
				saveNewCar(dataInputs);
			} catch (e) {
				alert(e.message);
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