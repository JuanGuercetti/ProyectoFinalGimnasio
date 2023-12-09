import { crearFormSocio, socioPendiente } from './agregarModule.js';
import { crearConsulta } from './consultaModule.js';
import { crearFormularioEliminar, sociosFiltrados } from './eliminarModule.js';


//		-----		Variables


const btnAgregar = document.getElementById("btnAgregar");
const btnConsultas = document.getElementById("btnConsultas");
const btnPagoCuota = document.getElementById("btnPagoCuota");
const btnListado = document.getElementById("btnListado");
const btnEliminar = document.getElementById("btnEliminar");

const mainContainer = document.getElementById("mainContainer");

const DateTime = luxon.DateTime;
export const now = DateTime.now();


export class Socio {
	constructor(info) {
		this.nombre = info.nombre;
		this.telefono = info.telefono;
		this.dni = info.dni;
		this.abono = info.abono;
	}
};

export let socios = [];




// 		-----		 Funciones

export function limpiarDom(){
	mainContainer.innerHTML = "";
}

const obtenerSocios = async () => {
	try {
	    let response = await fetch("./db/data.json");
	    let data = await response.json();
	    socios = data;
	    return data;
	  } 
	  catch (error) {
	    console.log(error);
	    return null;
	  }
};


const mostrarListado = () => {
	limpiarDom();

  socios
    ? 
    	socios.forEach((item) => {
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
    : 
      Swal.fire({
				title: "Error",
				icon: "error",
				text: `Ha surgido un error inesperado al cargar los datos. Por favor contacte a soporte.`,
			});
};



function crearFormularioCuota() {
	limpiarDom();

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `
		<div class="mb-3 row justify-content-center">
		  <label class="form-label">Ingrese el número de DNI del socio</label>
		  <input type="text" class="form-control">
		</div>
		<input type="submit" value="Pagar" class="btn btn-lg btn-outline-danger text-light row justify-content-center">
	`;
	form.id = "form-cuota";
	form.classList.add("form-control-lg","bg-dark","text-light");
	mainContainer.append(form);

	// Obtener información del form
	let formCuota = document.getElementById("form-cuota");

	formCuota.addEventListener("submit", (e) => {
		e.preventDefault();
		let dni = e.target.elements[0].value;
		let consulta = socios.find(socio => socio.dni === dni);

		consulta
			?
				pagoCuota(consulta)
			:
				Swal.fire({
				  title: "No encontrado",
				  icon: "error",
				  text: `No se ha encontrado el socio con DNI: "${dni}"`,
			  });
	});
};



function pagoCuota(socio) {
	const vigenciaLuxon = DateTime.fromISO(socio.abono.vigencia);

	if (now.startOf("day") < vigenciaLuxon.startOf("day")) {
		Swal.fire({
			title: "La cuota todavía sigue vigente",
			icon: "error",
			text: `La cuota del socio ${socio.nombre} continua vigente hasta: ${socio.abono.vigencia}.`,
		});
	}
	else {
		socio.abono.vigencia = now.plus({ days: 30 }).toLocaleString();
		Swal.fire({
			title: "Cuota renovada con éxito",
			icon: "success",
			text: `La cuota del socio ${socio.nombre} se renovó hasta: ${socio.abono.vigencia}.`,
		});
	};
};


/*
function crearFormularioEliminar() {
	limpiarDom();

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `
		<div class="mb-3 row justify-content-center">
		  <label class="form-label">Ingrese el número de DNI del socio que desea eliminar</label>
		  <input type="text" class="form-control">
		</div>
		<input type="submit" value="Eliminar" class="btn btn-lg btn-outline-danger text-light row justify-content-center">
	`;
	form.id = "form-eliminar";
	form.classList.add("form-control-lg","bg-dark","text-light");
	mainContainer.append(form);

	// Obtener información del form
	let formEliminar = document.getElementById("form-eliminar");

	formEliminar.addEventListener("submit", (e) => {
		e.preventDefault();
		let dni = e.target.elements[0].value;
		let consulta = socios.find(socio => socio.dni === dni);

		if (consulta) { 
			Swal.fire({
			 	title: 'Está a punto de eliminar permanentemente del sistema a un socio.',
			 	text: `Nombre: ${consulta.nombre}. Teléfono: ${consulta.telefono}. DNI: ${consulta.dni}.`,
			 	icon: 'warning',
			 	confirmButtonText: "Sí, eliminar",
			 	showCancelButton: true,
			  cancelButtonText: "Cancelar",
			}).then((result) => { 
					if (result.isConfirmed) {
			    	eliminarSocio(dni);
			    }
			    else {
			      Swal.fire({
				      title: "Cancelado",
				      icon: "error",
				      text: "Se canceló la eliminación del socio",
			     	});
					}
				})
		}
		else {
			Swal.fire({
			  title: "No encontrado",
			  icon: "error",
			  text: `No se ha encontrado el socio con DNI: "${dni}"`,
			});
		}
	});
};



const eliminarSocio = dni => {
	let consulta = socios.find(socio => socio.dni === dni);
	let filtrados = socios.filter(socio => socio.dni != dni);
	socios = filtrados;
	Swal.fire({
		title: "Socio eliminado con éxito",
		icon: "success",
		text: `El socio ${consulta.nombre} con DNI: ${consulta.dni} ha sido eliminado del sistema.`,
	});
};
*/



// 	-----		Eventos

// Traigo los datos del json al abrir la página
obtenerSocios();

// Este bloque es por si queda un socio en Storage sin confirmar
let socioStorage = localStorage.getItem("socioStorage");
socioStorage && socioPendiente();


btnAgregar.addEventListener("click", crearFormSocio);

btnConsultas.addEventListener("click", crearConsulta);

btnPagoCuota.addEventListener("click", crearFormularioCuota);

btnListado.addEventListener("click", mostrarListado);

btnEliminar.addEventListener("click", ()=> {
	crearFormularioEliminar();
	sociosFiltrados && (socios = sociosFiltrados);
});