//* ========== Validación de formulario de contacto ===========*//

const form = document.querySelector(".contact-form");
const btnSubmit = document.getElementById("btSubmit"); 

// Definición global de formInputs
const formInputs = {
  name: {
    element: document.getElementById("name"),
    rules: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    },
    errorMessages: {
      required: "El nombre es requerido",
      minLength: "El nombre debe tener al menos 2 caracteres",
      maxLength: "El nombre no puede exceder 50 caracteres",
      pattern: "El nombre solo puede contener letras y espacios",
    },
  },
  email: {
    element: document.getElementById("email"),
    rules: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    errorMessages: {
      required: "El correo electrónico es requerido",
      pattern: "Por favor, ingrese un correo electrónico válido",
    },
  },
  subject: {
    element: document.getElementById("subject"),
    rules: {
      required: true,
      minLength: 4,
      maxLength: 60,
    },
    errorMessages: {
      required: "El Asunto es requerido",
      minLength: "El Asunto debe tener al menos 4 caracteres",
      maxLength: "El Asunto no puede exceder 60 caracteres",
    },
  },
  message: {
    element: document.getElementById("message"),
    rules: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    errorMessages: {
      required: "El mensaje es requerido",
      minLength: "El mensaje debe tener al menos 10 caracteres",
      maxLength: "El mensaje no puede exceder 500 caracteres",
    },
  },
};

// Función para mostrar error
function displayError(element, message) {
  const formGroup = element.parentElement;
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.cssText = "color: red; font-size: 12px; margin-top: 5px;";
  errorDiv.textContent = message;

  // Remover error previo si existe
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) {
    formGroup.removeChild(existingError);
  }

  formGroup.appendChild(errorDiv);
  element.style.borderColor = "red"; 
}

// Función para limpiar error
function clearError(element) {
  const formGroup = element.parentElement;
  const errorDiv = formGroup.querySelector(".error-message");
  if (errorDiv) {
    formGroup.removeChild(errorDiv);
  }
  element.style.borderColor = ""; 
}

// Función principal de validación en Submit
function validateFormOnSubmit(event) {
  event.preventDefault();

  let isValid = true;
  const errors = [];

  // Validar cada campo
  Object.keys(formInputs).forEach((inputName) => {
    const input = formInputs[inputName];
    const value = input.element.value.trim();
    clearError(input.element);
    
    if (input.rules.required && !value) {
      isValid = false;
      errors.push({
        element: input.element,
        message: input.errorMessages.required,
      });
    }

    if (value) {
      if (input.rules.minLength && value.length < input.rules.minLength) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.minLength,
        });
      }

      if (input.rules.maxLength && value.length > input.rules.maxLength) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.maxLength,
        });
      }

      if (input.rules.pattern && !input.rules.pattern.test(value)) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.pattern,
        });
      }
    }
  });

  // Mostrar errores si existen
  errors.forEach((error) => {
    displayError(error.element, error.message);
  });

  if (isValid) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

    form.submit(); 
  }

  return isValid; 
}

// Agregar evento submit al formulario
form.addEventListener("submit", validateFormOnSubmit);

// Limpiar errores al escribir en los campos
Object.keys(formInputs).forEach((inputName) => {
  const input = formInputs[inputName].element;
  
  input.addEventListener("input", () => {
    clearError(input);
  });
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



