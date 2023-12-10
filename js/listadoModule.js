import { limpiarDom, socios, mainContainer } from './main.js';


export const mostrarListado = () => {
	limpiarDom();
    mainContainer.innerHTML = "<h2>Cargando..</h2>";

    socios && socios.length > 0
    ?   
    	setTimeout( ()=> {
            limpiarDom();
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
        }, 1500)
    : 
      Swal.fire({
				title: "Error",
				icon: "error",
				text: `Ha surgido un error inesperado al cargar los datos. Por favor contacte a soporte.`,
			});
};