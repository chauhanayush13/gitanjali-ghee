import Swal from "sweetalert2";

export const showAlert = (title, text, icon = "info") => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
    });
};
