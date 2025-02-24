//* ========== Validación de formulario de contacto ===========*//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const btnSubmit = document.getElementById("btnSubmit");
  const modal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModal");

  const formInputs = {
      name: {
          element: document.getElementById("name"),
          rules: { required: true, minLength: 2, maxLength: 50, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/ },
          errorMessages: { required: "El nombre es requerido", minLength: "Debe tener al menos 2 caracteres", maxLength: "No puede exceder 50 caracteres", pattern: "Solo letras y espacios" }
      },
      email: {
          element: document.getElementById("email"),
          rules: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
          errorMessages: { required: "El correo es requerido", pattern: "Ingrese un correo válido" }
      },
      subject: {
          element: document.getElementById("subject"),
          rules: { required: true, minLength: 4, maxLength: 60 },
          errorMessages: { required: "El asunto es requerido", minLength: "Debe tener al menos 4 caracteres", maxLength: "No puede exceder 60 caracteres" }
      },
      message: {
          element: document.getElementById("message"),
          rules: { required: true, minLength: 10, maxLength: 500 },
          errorMessages: { required: "El mensaje es requerido", minLength: "Debe tener al menos 10 caracteres", maxLength: "No puede exceder 500 caracteres" }
      }
  };

  function displayError(element, message) {
      let errorDiv = element.nextElementSibling;
      if (!errorDiv || !errorDiv.classList.contains("error-message")) {
          errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.style.cssText = "color: red; font-size: 12px; margin-top: 5px;";
          element.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
      element.style.borderColor = "red";
  }

  function clearError(element) {
      let errorDiv = element.nextElementSibling;
      if (errorDiv && errorDiv.classList.contains("error-message")) {
          errorDiv.remove();
      }
      element.style.borderColor = "";
  }

  function validateForm() {
      let isValid = true;
      Object.values(formInputs).forEach(({ element, rules, errorMessages }) => {
          const value = element.value.trim();
          clearError(element);

          if (rules.required && !value) {
              isValid = false;
              displayError(element, errorMessages.required);
          } else {
              if (rules.minLength && value.length < rules.minLength) {
                  isValid = false;
                  displayError(element, errorMessages.minLength);
              }
              if (rules.maxLength && value.length > rules.maxLength) {
                  isValid = false;
                  displayError(element, errorMessages.maxLength);
              }
              if (rules.pattern && !rules.pattern.test(value)) {
                  isValid = false;
                  displayError(element, errorMessages.pattern);
              }
          }
      });
      return isValid;
  }

  Object.values(formInputs).forEach(({ element }) => element.addEventListener("input", () => clearError(element)));

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateForm()) return;

      btnSubmit.disabled = true;
      btnSubmit.textContent = "Enviando...";

      fetch(form.action, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } })
      .then(response => {
          if (response.ok) {
              form.reset();
              modal.style.display = "flex";
          } else {
              return response.json().then(data => { throw new Error(data.error || "Error al enviar el mensaje."); });
          }
      })
      .catch(error => alert("Error: " + error.message))
      .finally(() => {
          btnSubmit.disabled = false;
          btnSubmit.textContent = "Enviar";
      });
  });

  closeModalBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (event) => { if (event.target === modal) modal.style.display = "none"; });
});

// ========== Termina Validación de formulario de contacto ===========*//


//* ========== Funcionalidad para proyectos ===========*//

function verProyecto(idProyecto) {
    const proyectos = document.querySelectorAll('pestaña');
    proyectos.forEach(proyecto => proyecto.style.display = "none");

    const proyectoAMostrar = document.getElementById(idProyecto);
  if (proyectoAMostrar) {
    proyectoAMostrar.style.display = 'block';
  }
}

function ocultarProyecto(idProyecto) {
    const proyecto = document.getElementById(idProyecto);
    if (proyecto) {
      proyecto.style.display = 'none';
    }
  }

// ========== Termina Funcionalidad para proyectos ===========*//



//* ==========  Funcionalidad para carousel ===========*//
const slide = document.querySelector('.carousel-slide');
const img = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let imgActual = 0;
const totalImg = img.length;
let direccion = 1;

function carouselPosition() {
      const desplazamiento = -imgActual * 100; 
    slide.style.transform = `translateX(${desplazamiento}%)`;
}

function siguienteImg() {
    if(imgActual === totalImg-1){
      direccion = -1;
    }else if(imgActual === 0){
direccion = 1;
    }
    imgActual= (imgActual+ direccion+totalImg)% totalImg;
    carouselPosition();
}
nextBtn.addEventListener('click', () => {
    siguienteImg(); 
    reiniciarCarousel();
});

prevBtn.addEventListener('click', () => {
  direccion = -1;
  siguienteImg(); 
  reiniciarCarousel();
});

let autoSlide = setInterval(siguienteImg, 3000);

const reiniciarCarousel = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(siguienteImg, 3000);
}
;

// ==========  Termina Funcionalidad para carousel ===========*//





function abrirModal(idProyecto) {
  const modal = document.getElementById('modal');
  const proyectoAMostrar = document.getElementById(idProyecto);
  
  if (proyectoAMostrar) {
      modal.style.display = 'block';
  }
}

// Cerrar el modal
function cerrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Cerrar el modal al hacer clic fuera del contenido o presionar Escape
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
      cerrarModal();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
      cerrarModal();
  }
});



