$(document).ready(function () {
  loadClients();
  $("#OpcClients").hide();
  //$("#OpcStart").hide();
});

const loadClients = () => {
  $.ajax({
    url: "http://142.93.115.100:4080/customer",
    method: "GET",
    cache: false,
    contentType: false,
    processData: false,
    crossDomain: true,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      $.LoadingOverlay("hide");
      resp = JSON.parse(JSON.stringify(data));
      //console.log(clientArray);
      resp.forEach(clientArray);
    },
    error: function (data) {
      $.LoadingOverlay("hide");
    },
  });
};

function clientArray(element, index, array) {
  $("#tbClients > tbody:last").append(
    `<tr id='cl-` +
      element.id +
      `'><td>` +
      element.name +
      `</td>
    <td>` +
      element.first_name +
      " " +
      element.last_name +
      `</td>
    <td>` +
      element.idCard +
      `</td>
    <td>` +
      element.phone +
      `</td>
    <td>` +
      element.dateCreated +
      `</td>
    <td><a class="btn" onclick='editClient(` +
      element.id +
      `)'><i class="fa-solid fa-pen-to-square"></i></a>

      <a class="btn" onclick='deleteClient(` +
      element.id +
      `)'><i class="fa-solid fa-trash-can"></i></a>

    </td></tr>`
  );
}

const deleteClient = (id) => {
  var datos = new FormData();
  datos.append("id", id);
  $.ajax({
    url: "http://142.93.115.100:4080/customer/delete",
    method: "POST",
    cache: false,
    data: datos,
    contentType: false,
    processData: false,
    crossDomain: true,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      $.LoadingOverlay("hide");
      $("#cl-" + id).remove();
    },
    error: function (data) {
      $.LoadingOverlay("hide");
    },
  });
};

const showMain = () => {
  $("#OpcStart").show();
  $("#OpcClients").hide();
};

const showClient = () => {
  $("#OpcStart").hide();
  $("#OpcClients").show();
};

const editClient = (id) => {
  var datos = new FormData();
  datos.append("id", id);
  $.ajax({
    url: "http://142.93.115.100:4080/customer/getCustomer",
    method: "POST",
    cache: false,
    data: datos,
    contentType: false,
    processData: false,
    crossDomain: true,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      $.LoadingOverlay("hide");
      resp = JSON.parse(JSON.stringify(data))[0];

      $("#name").val(resp.name);
      $("#first").val(resp.first_name);
      $("#last").val(resp.last_name);
      $("#phone").val(resp.phone);

      $("#dcreated").val(resp.dateCreated);
      $("#idcard").val(resp.idCard);

      $("#idC").val(id);
      $("#editMd").modal("show");
    },
    error: function (data) {
      $.LoadingOverlay("hide");
    },
  });
};

const closeMdEdit = () => {
  $("#editMd").modal("hide");
};

const openMdAdd = () => {
    $("#createdMd").modal("show");
  };

const closeMdCreated = () => {
    $("#createdtMd").modal("hide");
  };

const saveEdit = () => {
  var datos = new FormData();

  datos.append("name", $("#name").val());
  datos.append("firts", $("#first").val());
  datos.append("last", $("#last").val());
  datos.append("phone", $("#phone").val());
  datos.append("id", $("#idC").val());
  $.ajax({
    url: "http://142.93.115.100:4080/customer/update",
    method: "POST",
    cache: false,
    data: datos,
    contentType: false,
    processData: false,
    crossDomain: true,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      $.LoadingOverlay("hide");

      $("#cl-" + $("#idC").val()).remove();

      $("#tbClients > tbody:last").append(
        `<tr id='cl-` +
        $("#idC").val() +
          `'><td>` +
          $("#name").val() +
          `</td>
        <td>` +
        $("#first").val() +
          " " +
          $("#last").val() +
          `</td>
        <td>` +
        $("#idcard").val() +
          `</td>
        <td>` +
        $("#phone").val() +
          `</td>
        <td>` +
        $("#dcreated").val() +
          `</td>
        <td><a class="btn" onclick='editClient(` +
        $("#idC").val() +
          `)'><i class="fa-solid fa-pen-to-square"></i></a>
    
          <a class="btn" onclick='deleteClient(` +
          $("#idC").val() +
          `)'><i class="fa-solid fa-trash-can"></i></a>
    
        </td></tr>`
      );
      $("#editMd").modal("hide");
    },
    error: function (data) {
      $.LoadingOverlay("hide");
    },
  });
};

const addClient = () => {
    var datos = new FormData();

    datos.append("name", $("#nameI").val());
    datos.append("first", $("#firstI").val());
    datos.append("last", $("#lastI").val());
    datos.append("phone", $("#phoneI").val());
    datos.append("idCard", $("#idCardI").val());
    $.ajax({
      url: "http://142.93.115.100:4080/customer/created",
      method: "POST",
      cache: false,
      data: datos,
      contentType: false,
      processData: false,
      crossDomain: true,
      beforeSend: function () {
        $.LoadingOverlay("show");
      },
      success: function (data) {
        $.LoadingOverlay("hide");
  
        resp = JSON.parse(JSON.stringify(data))[0];

      $("#name").val();
      $("#first").val(resp.first_name);
      $("#last").val(resp.last_name);
      $("#phone").val(resp.phone);

      $("#dcreated").val(resp.dateCreated);
      $("#idcard").val(resp.idCard);

        $("#tbClients > tbody:last").append(
          `<tr id='cl-` +
          resp.id +
            `'><td>` +
            resp.name +
            `</td>
          <td>` +
          resp.first_name +
            " " +
            resp.last_name +
            `</td>
          <td>` +
          resp.idCard +
            `</td>
          <td>` +
          resp.phone +
            `</td>
          <td>` +
          resp.dateCreated +
            `</td>
          <td><a class="btn" onclick='editClient(` +
          resp.id +
            `)'><i class="fa-solid fa-pen-to-square"></i></a>
      
            <a class="btn" onclick='deleteClient(` +
            resp.id +
            `)'><i class="fa-solid fa-trash-can"></i></a>
      
          </td></tr>`
        );
        $("#createdMd").modal("hide");
      },
      error: function (data) {
        $.LoadingOverlay("hide");
      },
    });

}
