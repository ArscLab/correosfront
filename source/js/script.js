$( document ).ready(function() {
    loadClients();
  });

const loadClients = () =>{

    $.ajax({
        url: "http://142.93.115.100:4080//customer",
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

            $('#tbClients > tbody:last').append(`<td>Mau</td>
            <td>Pzs</td>
            <td>ced</td>
            <td>Tel</td>
            <td>date</td>
            <td><a class="btn"><i class="fa-solid fa-pen-to-square"></i></a>

              <a class="btn" ><i class="fa-solid fa-trash-can"></i></a>

            </td>`); 

            
        },
        error: function(data) {
            $.LoadingOverlay("hide");
        }
    });

}