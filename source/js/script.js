$( document ).ready(function() {
    loadClients();
    //$("#OpcClients").hide();
    //$("#OpcStart").hide();
  });

const loadClients = () =>{

    $.ajax({
        url: "http://142.93.115.100:4080/customer",
        method: "GET",
        cache: false,
        contentType: false,
        processData: false,
        crossDomain: true,  
        beforeSend: function() {
            $.LoadingOverlay("show");
        },
        success: function(data) {
            $.LoadingOverlay("hide");
            resp = JSON.parse(JSON.stringify(data));
            //console.log(clientArray);
            resp.forEach(clientArray);
            
        },
        error: function(data) {
            $.LoadingOverlay("hide");
        }
    });

}

function clientArray(element, index, array) {

    $('#tbClients > tbody:last').append(`<tr id='cl-`+element.id+`'><td>`+element.name+`</td>
    <td>`+element.first_name +" "+ element.last_name+`</td>
    <td>`+element.idCard+`</td>
    <td>`+element.phone+`</td>
    <td>`+element.dateCreated+`</td>
    <td><a class="btn" onclick='editClient(`+element.id+`)'><i class="fa-solid fa-pen-to-square"></i></a>

      <a class="btn" onclick='deleteClient(`+element.id+`)'><i class="fa-solid fa-trash-can"></i></a>

    </td></tr>`); 
}

const deleteClient = (id) =>{
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
        beforeSend: function() {
            $.LoadingOverlay("show");
        },
        success: function(data) {
            $.LoadingOverlay("hide");
            $("#cl-"+id).remove();
            
        },
        error: function(data) {
            $.LoadingOverlay("hide");
        }
    });
}

const showMain = () => {
    $("#OpcStart").show();
    $("#OpcClients").hide();
}

const showClient = () => {
    $("#OpcStart").hide();
    $("#OpcClients").show();
}

const editClient = (id) => {
$("#editMd").modal("show");
$("#idC").val(id);
}

const closeMdEdit = () => {
    $("#editMd").modal("hide");
}