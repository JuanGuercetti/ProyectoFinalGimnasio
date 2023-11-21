// Variables

const btnAgregar = document.getElementById("btnAgregar");
const btnConsultas = document.getElementById("btnConsultas");
const btnPagoCuota = document.getElementById("btnPagoCuota");

const mainContainer = document.getElementById("mainContainer");

const DateTime = luxon.DateTime;
const now = DateTime.now();


class Socio {
	constructor(info) {
		this.nombre = info.nombre;
		this.telefono = info.telefono;
		this.dni = info.dni;
		this.abono = info.abono;
	}
};

const socios = [
	{nombre: "Jose Perez", telefono: "3415558971", dni: "33897651", abono:{ tipo: "Libre", vigencia: "2023-11-3" }},
	{nombre: "Maria Ramirez", telefono: "3456080701", dni: "40501703", abono:{ tipo: "8 clases", vigencia: "2023-12-11" }},
	{nombre: "Agustina Fernandez", telefono: "3433675651", dni: "36789123", abono:{ tipo: "8 clases", vigencia: "2023-12-10" }},
	{nombre: "Juan Garcia", telefono: "3478980123", dni: "39617385", abono:{ tipo: "Libre", vigencia: "2023-11-30" }},
	{nombre: "Heber Casas", telefono: "3437581012", dni: "42000789", abono:{ tipo: "12 clases", vigencia: "2023-10-15" }},
];





// Funciones


function agregarNuevoSocio() {
	// Borrar forms previos
	mainContainer.innerHTML = "";

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `
		<div class="mb-3 row justify-content-center">
		  <label class="form-label">Nombre y Apellido</label>
		  <input type="text" class="form-control">
		</div>
		<div class="mb-3 row justify-content-center">
		  <label class="form-label">Número de teléfono</label>
		  <input type="text" class="form-control">
		</div>
	    <div class="mb-3 row justify-content-center">
		  <label class="form-label">DNI</label>
		  <input type="text" class="form-control">
		</div>
		<div class="mb-3 row justify-content-center">
			<label class="form-label">Abono</label>
		  	<select class="form-select form-control">
			  <option value="8 clases">8 clases</option>
			  <option value="12 clases">12 clases</option>
			  <option value="Libre">Libre</option>
			</select>
		</div>   
      	<input type="submit" value="Agregar nuevo socio" id="confirmSocio" class="btn btn-lg btn-outline-danger text-light row justify-content-center">
	`;
	form.id = "form-agregar";
	form.classList.add("formulario","form-control-lg","bg-dark","text-light");
	mainContainer.append(form);

	// Obtener los datos del form
	let formAgregar = document.getElementById("form-agregar");
	formAgregar.addEventListener("submit", nuevoSocio);
};


const nuevoSocio = (e) => {
	e.preventDefault();

	let inputs = e.target.elements;
	let nombre = inputs[0].value;
	let telefono = inputs[1].value;
	let dni = inputs[2].value;
	let abono = inputs[3].value;
	
	let info = {
	    nombre: nombre,
	    telefono: telefono,
	    dni: dni,
	    abono: abono
	};

	socio = new Socio(info);
    localStorage.setItem("socioStorage", JSON.stringify(socio));

    confirmarSocio();
};



function confirmarSocio() {
	Swal.fire({
	 	title: 'Está a punto de agregar a un nuevo socio.',
	 	text: `Nombre: ${socio.nombre}. Teléfono: ${socio.telefono}. DNI: ${socio.dni}. Abono: ${socio.abono}`,
	 	icon: 'warning',
	 	confirmButtonText: "Sí, seguro",
	 	showCancelButton: true,
    cancelButtonText: "No, eliminar socio",
	}).then((result) => {

	    if (result.isConfirmed) {

	    	socios.push(JSON.parse(localStorage.getItem("socioStorage")));
	    	localStorage.clear();

	      Swal.fire({
		      title: "Agregado!",
		      icon: "success",
		      text: "El socio ha sido añadido con éxito!",
	      });
	    }
	    else {

	    	localStorage.clear();

	      Swal.fire({
		      title: "Borrado",
		      icon: "error",
		      text: "El socio no fue agregado",
	     	});
	    }
   });
};


function crearConsulta() {
	// Borrar forms previos
	mainContainer.innerHTML = "";

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `<h3>Ingrese el número de DNI del socio a consultar</h3>
					 <input type="text">
					 <input type="submit" value="Consultar" class="btnForm">`;
	form.id = "form-consultas";
	form.classList.add("formulario");
	mainContainer.append(form);

	// Obtener información del form
	let formConsultas = document.getElementById("form-consultas");
	formConsultas.addEventListener("submit", consultaSocio);
};

/*
const consultaSocio = (e,funcion) => {
	e.preventDefault();

	let dni = e.target.elements[0].value;
	let consulta = socios.find(socio => socio.dni === dni);

	funcion;
};	*/




const consultaSocio = (e) => {
	e.preventDefault();

	let dni = e.target.elements[0].value;
	let consulta = socios.find(socio => socio.dni === dni);

	if (consulta) {
		Swal.fire({
		  title: "Socio encontrado",
		  icon: "success",
		  text: `
			  Nombre: ${consulta.nombre}.
				Teléfono: ${consulta.telefono}.
				DNI: ${consulta.dni}.
				Abono: ${consulta.abono.tipo} ${consulta.abono.vigencia}.`,
	  });
	}
	else {
		Swal.fire({
		  title: "No encontrado",
		  icon: "error",
		  text: `No se ha encontrado el socio con DNI: "${dni}"`,
	  });
	}
};	


function mostrarListado() {
	// socios.forEach(Hacer una card, código HTML)
}


function crearFormularioCuota() {
	// Borrar forms previos
	mainContainer.innerHTML = "";

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `<h3>Ingrese el número de DNI del socio</h3>
					 <input type="text">
					 <input type="submit" value="Pagar" class="btnForm">`;
	form.id = "form-cuota";
	form.classList.add("formulario");
	mainContainer.append(form);

	// Obtener información del form
	let formCuota = document.getElementById("form-cuota");

	formCuota.addEventListener("submit", (e) => {
		e.preventDefault();
		let dni = e.target.elements[0].value;
		let consulta = socios.find(socio => socio.dni === dni);
		
		if (consulta) {
			pagoCuota(consulta);
		}
		else {
			console.log("Socio no trovato");
		}
	});
};


function pagoCuota(socio) {
	const vigenciaLuxon = DateTime.fromISO(socio.abono.vigencia);

	if (now.startOf("day") < vigenciaLuxon.startOf("day")) {
		console.log("La cuota todavía está vigente")
	}
	else {
		console.log("La cuota ha sido renovada con éxito");
		socio.abono.vigencia = now.plus({ days: 30 }).toLocaleString();
	}
};


// Eventos

// Este bloque es por si queda un socio en Storage sin confirmar
let socioStorage = localStorage.getItem("socioStorage");
if (socioStorage) {
	Toastify({
	    text: "Hay un socio sin confirmar!",
	    duration: 3000,
	    gravity: 'bottom',
	    style: {
	    background: "linear-gradient(to left, rgb(200, 20, 20), rgb(30, 30, 30)",
	    },
	    onClick: () => {
	    	socio = JSON.parse(socioStorage);
	    	confirmarSocio();	       
        }
	}).showToast();
};

btnAgregar.addEventListener("click", agregarNuevoSocio);

btnConsultas.addEventListener("click", crearConsulta);

btnPagoCuota.addEventListener("click", crearFormularioCuota);

