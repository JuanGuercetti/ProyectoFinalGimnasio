import { limpiarDom, now, Socio, socios } from './main.js';

let socio;

export function crearFormSocio() {
	limpiarDom();

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
    <input type="submit" value="Agregar nuevo socio" class="btn btn-lg btn-outline-danger text-light row justify-content-center">
	`;
	form.id = "form-agregar";
	form.classList.add("form-control-lg","bg-dark","text-light");
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
	 			// simula que al agregar un nuevo socio paga la cuota
	   },
	};

    socio = new Socio(info);
    localStorage.setItem("socioStorage", JSON.stringify(socio));
    // lleva el socio al storage en caso de que se cierre la página sin confirmar

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
            socios.push(socio);

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


export function socioPendiente() {
    Toastify({
	    text: "Hay un socio sin confirmar!",
	    duration: 3000,
	    gravity: 'bottom',
	    style: {
	    background: "linear-gradient(to left, rgb(200, 20, 20), rgb(30, 30, 30)",
	    },
	    onClick: () => {
            socio = JSON.parse(localStorage.getItem("socioStorage"));
	    	confirmarSocio();	       
        }
	}).showToast();
}