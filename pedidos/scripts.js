const customHeaders = new Headers();
customHeaders.append("User-Agent", "PostmanRuntime/7.33.0");
customHeaders.append("Accept", "*/*");
customHeaders.append("Accept-Encoding", "gzip, deflate, br");
customHeaders.append("Connection", "keep-alive");

document.addEventListener("DOMContentLoaded", function (event) {
  obtenerPedidos();
});

function obtenerPedidos() {
  const elementosTable = document //tabla en la que se colocan los envios que se obtienen
    .getElementById("elementosTable")
    .querySelector("tbody");

  urlConFiltro = `http://localhost:8080/pedidos`;

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
                      <td>${elemento.id}</td>
                      <td>${
                        elemento.productos
                          ? elemento.productos
                              .map(
                                (producto) => `
                          ${producto.nombre}
                      `
                              )
                              .join(" ")
                          : `No hay productos disponibles`
                      }</td>
                      <td>${elemento.ciudad_destino}</td>
                      <td>${elemento.estado}</td>
                      <td>${elemento.fecha_de_pedido}</td>
                      <td class="acciones"> <a href="form.html?id=${
                        elemento.id
                      }&tipo=ACEPTAR">Aceptar Pedido</a> | <a href="form.html?id=${
            elemento.id
          }&tipo=CANCELAR">Cancelar Pedido</a></td>
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
