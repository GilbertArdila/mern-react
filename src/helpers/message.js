import Swal from "sweetalert2";

export function messages(icon,title,confirm,timer){
    return Swal.fire({
        icon:icon,
        title:title,
        showConfirmButton:confirm,
        timer:timer,
    })
}