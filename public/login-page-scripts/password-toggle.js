function togglePassword (){
    const passwordField = document.querySelector("#password")
    if (passwordField.type === "password"){
        passwordField.type = "text"
    }else{
        passwordField.type = "password"
    }

    const passwordToggle = document.querySelector("#password-toggle")
    if (passwordField.type === "password"){
        passwordToggle.textContent = "Show password"
    }else{
        passwordToggle.textContent = "Hide password"
    }
}