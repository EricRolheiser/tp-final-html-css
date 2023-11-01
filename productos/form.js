const customHeaders = new Headers();
customHeaders.append("User-Agent", "PostmanRuntime/7.33.0");
customHeaders.append("Accept", "*/*");
customHeaders.append("Accept-Encoding", "gzip, deflate, br");
customHeaders.append("Connection", "keep-alive");

document.addEventListener("DOMContentLoaded", function (event) {
  const urlParams = new URLSearchParams(window.location.search);
  const codProducto = urlParams.get("id");
  const operacion = urlParams.get("tipo");

  if (codProducto != "" && codProducto != null && operacion == "ELIMINAR") {
    eliminarProducto(codProducto);
  } else if (
    codProducto != "" &&
    codProducto != null &&
    operacion == "EDITAR"
  ) {
    document
      .getElementById("form")
      .addEventListener("submit", function (event) {
        actualizarProducto(event);
      });
  } else {
    document
      .getElementById("form")
      .addEventListener("submit", function (event) {
        guardarProducto(event);
      });
  }
});

function guardarProducto() {
  //armo la data a enviar
  const data = {
    codigo_producto: document.getElementById("codigo-producto").value,
    fecha_creacion: "2023-10-14T12:00:00Z",
    fecha_ultima_actualizacion: "2023-10-14T12:00:00Z",
    tipo_producto: document.getElementById("tipo").value,
    nombre: document.getElementById("nombre").value,
    peso_unitario: parseFloat(document.getElementById("peso").value),
    precio_unitario: parseFloat(
      document.getElementById("precio").value
    ),
    stock_minimo: parseInt(document.getElementById("stock-minimo").value),
    stock_actual: parseInt(document.getElementById("stock-actual").value),
    id_creador: parseInt(document.getElementById("IdCreador").value),
  };

  makeRequest(
    `${urlConFiltro}`,
    Method.POST,
    data,
    ContentType.JSON,
    CallType.PRIVATE,
    exitoProducto,
    errorProducto
  );
}

function eliminarProducto(codProducto) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    makeRequest(
      `${urlConFiltro}/${codProducto}`,
      Method.DELETE,
      data,
      ContentType.JSON,
      CallType.PRIVATE,
      exitoProducto,
      errorProducto
    );
  } else {
    window.location = "/productos/index_producto.html";
  }
}

function exitoProducto(data) {
  window.location = window.location.origin + "/productos/index_producto.html";
}

function errorProducto(response) {
  alert("Error en la solicitud al servidor.");
  console.log(response.json());
  throw new Error("Error en la solicitud al servidor.");
}

function actualizarProducto() {
  const data = {
    codigo_producto: document.getElementById("codigo-producto").value,
    fecha_creacion: "2023-10-14T12:00:00Z",
    fecha_ultima_actualizacion: "2023-10-14T12:00:00Z",
    tipo_producto: document.getElementById("tipo").value,
    nombre: document.getElementById("nombre").value,
    peso_unitario: parseFloat(document.getElementById("peso").value),
    precio_unitario: parseFloat(
      document.getElementById("precio").value
    ),
    stock_minimo: parseInt(document.getElementById("stock-minimo").value),
    stock_actual: parseInt(document.getElementById("stock-actual").value),
    id_creador: parseInt(document.getElementById("IdCreador").value),
  };

  makeRequest(
    `${urlConFiltro}/${data.codigo_producto}`,
    Method.PUT,
    data,
    ContentType.JSON,
    CallType.PRIVATE,
    exitoProducto,
    errorProducto
  );
}