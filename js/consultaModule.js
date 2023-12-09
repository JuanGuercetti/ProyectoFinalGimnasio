import { limpiarDom, socios } from './main.js';


export function crearConsulta() {
	limpiarDom();

	// Crear form
	let form = document.createElement("form");
	form.innerHTML = `
		<div class="mb-3 row justify-content-center">
		  <label class="form-label">Ingrese el número de DNI del socio a consultar</label>
		  <input type="text" class="form-control">
		</div>
		<input type="submit" value="Consultar" class="btn btn-lg btn-outline-danger text-light row justify-content-center">
	`;
	form.id = "form-consultas";
	form.classList.add("form-control-lg","bg-dark","text-light");
	mainContainer.append(form);

	// Obtener información del form
	let formConsultas = document.getElementById("form-consultas");
	formConsultas.addEventListener("submit", consultaSocio);
};



const consultaSocio = (e) => {
	e.preventDefault();

	let dni = e.target.elements[0].value;
	let consulta = socios.find(socio => socio.dni === dni);

	consulta 
		?
			Swal.fire({
			  title: "Socio encontrado",
			  icon: "success",
			  text: `
				  Nombre: ${consulta.nombre}.
					Teléfono: ${consulta.telefono}.
					DNI: ${consulta.dni}.
					Abono: ${consulta.abono.tipo}. 
					Cuota vigente hasta: ${consulta.abono.vigencia}.`,
		  })
		:
			Swal.fire({
			  title: "No encontrado",
			  icon: "error",
			  text: `No se ha encontrado el socio con DNI: "${dni}"`,
		  });
};	