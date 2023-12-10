import { limpiarDom, socios } from './main.js';

let sociosFiltrados;

export function crearFormularioEliminar() {
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
	sociosFiltrados = filtrados;
	Swal.fire({
		title: "Socio eliminado con éxito",
		icon: "success",
		text: `El socio ${consulta.nombre} con DNI: ${consulta.dni} ha sido eliminado del sistema.`,
	});
};

export { sociosFiltrados };