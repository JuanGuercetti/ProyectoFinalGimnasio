import { limpiarDom, socios, DateTime, now } from './main.js';


export function crearFormularioCuota() {
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