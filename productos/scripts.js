const customHeaders = new Headers();
customHeaders.append("User-Agent", "PostmanRuntime/7.33.0");
customHeaders.append("Accept", "*/*");
customHeaders.append("Accept-Encoding", "gzip, deflate, br");
customHeaders.append("Connection", "keep-alive");

document.addEventListener("DOMContentLoaded", function (event) {
  obtenerProductos();
});

function obtenerProductos() {
  const elementosTable = document //tabla en la que se colocan los envios que se obtienen
    .getElementById("elementosTable")
    .querySelector("tbody");

  urlConFiltro = `http://localhost:8080/productos`;

  fetch(urlConFiltro, {
    method: "GET",
    headers: customHeaders,
  }) // Realizar la solicitud de búsqueda (fetch) al servidor
    .then((response) => {
      if (!response.ok) {
        alert("Error en la solicitud al servidor.");
        console.log(response.json());
        throw new Error("Error en la solicitud al servidor.");
      }
      return response.json();
    })
    .then((data) => {
      // Llenar la tabla con los datos obtenidos
      if (data != null) {
        data.forEach((elemento) => {
          const row = document.createElement("tr"); //crear una fila

          row.innerHTML = ` 
                        <td>${elemento.codigo_producto}</td>
                        <td>${elemento.nombre}</td>
                        <td>${elemento.tipo_producto}</td>
                        <td>${elemento.precio_unitario}</td>
                        <td>${elemento.peso_unitario}</td>
                        <td>${elemento.stock_minimo}</td>
                        <td>${elemento.stock_actual}</td>
                        <td class="eliminar"> <a href="form.html?id=${elemento.id}&tipo=ELIMINAR">Eliminar</a></td>
                        `;

          elementosTable.appendChild(row);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error);
    });
}
