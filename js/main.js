import { crearFormSocio, socioPendiente } from './agregarModule.js';
import { crearConsulta } from './consultaModule.js';
import { crearFormularioEliminar, sociosFiltrados } from './eliminarModule.js';
import { mostrarListado } from './listadoModule.js';
import { crearFormularioCuota } from './pagoModule.js';



//		-----		Variables

const btnAgregar = document.getElementById("btnAgregar");
const btnConsultas = document.getElementById("btnConsultas");
const btnPagoCuota = document.getElementById("btnPagoCuota");
const btnListado = document.getElementById("btnListado");
const btnEliminar = document.getElementById("btnEliminar");

export const mainContainer = document.getElementById("mainContainer");

export const DateTime = luxon.DateTime;
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



// 	-----		Eventos

// Traigo los datos del json al abrir la página
document.addEventListener("DOMContentLoaded", () => {
	obtenerSocios();
});

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