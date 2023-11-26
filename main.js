// Variables

const btnAgregar = document.getElementById("btnAgregar");
const btnConsultas = document.getElementById("btnConsultas");
const btnPagoCuota = document.getElementById("btnPagoCuota");
const btnListado = document.getElementById("btnListado");

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




// Funciones

const obtenerSocios = async () => {
	try {
	    const response = await fetch("./data.json");
	    const data = await response.json();
	    return data;
	  } 
	  catch (error) {
	    console.log(error);
	    return null;
	  }
};



let socios = obtenerSocios();




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
	    abono: {
	    	tipo: abono,
	    	vigencia: now.plus({ days: 30 }).toLocaleString(),
	   },
	};

	socio = new Socio(info);
    localStorage.setItem("socioStorage", JSON.stringify(socio));

    confirmarSocio();
};



function confirmarSocio() {
	Swal.fire({
	 	title: 'Está a punto de agregar a un nuevo socio.',
	 	text: `Nombre: ${socio.nombre}. Teléfono: ${socio.telefono}. DNI: ${socio.dni}. Abono: ${socio.abono.tipo}`,
	 	icon: 'warning',
	 	confirmButtonText: "Sí, seguro",
	 	showCancelButton: true,
    cancelButtonText: "No, eliminar socio",
	}).then((result) => {

	    if (result.isConfirmed) {

	    	socios.push(JSON.parse(localStorage.getItem("socioStorage")));

	    	// Ver a donde envia los socios creados

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
	// hacer async y que traiga los datos del json

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



const mostrarListado = async () => {
	try {
		const data = await obtenerSocios();

		data ? 
	    data.forEach((item) => {
	      let div = document.createElement("div");
	      div.innerHTML = `
	        <div class="card-body">
					 	<h5 class="card-header">${item.nombre}</h5>
					  <p class="card-text">Teléfono: ${item.telefono}</p>
					  <p class="card-text">DNI: ${item.dni}</p>
					  <p class="card-text">Abono: ${item.abono.tipo}</p>
					  <p class="card-text">Cuota vigente hasta: ${item.abono.vigencia}</p>
					</div>
	      `;
	      div.classList.add("card");
	      div.style = "width: 18rem;";
	    	mainContainer.append(div);
	    })
	  : console.log("Error al cargar los datos"); // notificacion
	  } 
	  catch (error) {
	  	console.log("Ha surgido un error inesperado");
	  	// poner una notificación
	    console.log(error);
	  }

	// min 31 after asincronismo
};


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


function eliminarSocio(dni) {
	// hacer async y que traiga los datos del json
	// let filtrados = socios.filter((socio) => socio.dni != dni)
	// min 30 after storage
}


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

btnListado.addEventListener("click", mostrarListado);

