// Funcionalidades para página de proyectos


//funcionalidades para contacto
document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault();
        alert('Formulario enviado');
});


//funcionalidades para proyectos
function verProyecto(idProyecto) {
    var item = document.getElementsByClassName('pestaña');
    for (var i = 0; i < item.length; i++) {
        item[i].style.display = 'none';
    }
    document.getElementById(idProyecto).style.display = 'block';
}




   