function disable(){

    $("#forgot-pass-button").click(function(e){
        e.preventDefault();
      }) 
  
  $("#resetLink").click(function(e){
      e.preventDefault();
  })

 

} 



disable()

function resetPassword(){

    $("#resetForm").toggleClass("hidden","show");
    $("#forgot-form").toggleClass("hidden","show");
    
}