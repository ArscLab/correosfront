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
            console.log(data);
        },
        error: function(data) {
            $.LoadingOverlay("hide");
        }
    });

}