// diasble function diasble the default click on a tags
function disable(){

    $("#forgot-pass-button").click(function(e){
        e.preventDefault();
      }) 
  
  $("#resetLink").click(function(e){
      e.preventDefault();
  })

 

} 


// disable called here
disable()

// resetPassword to hide or show reset password form 
function resetPassword(){

    $("#resetForm").toggleClass("hidden","show");
    $("#forgot-form").toggleClass("hidden","show");

}


$('.email').bind("cut copy paste",function(e) {
    e.preventDefault();
});

// this function acctually validate password with regx* re
function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
    return re.test(password);
    
}

// this function tunrs field red if regx* false
let ele=document.getElementById("pass");
ele.addEventListener("input",function(){if(!validatePassword(ele.value)){ele.style.boxShadow=" 0 0 4px 2px red";
$("#infoPassIcon").removeClass("hidden");
}
else{
    $("#infoPassIcon").addClass("hidden");
    ele.style.boxShadow="0 0 4px 2px dodgerblue";}})