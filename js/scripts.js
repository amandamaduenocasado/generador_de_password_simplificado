// PARA ESTA FORMA SIMPLIFICADA DEL GENERADOR DE PASSWORD VAMOS A REALIZAR LOS SIGUIENTES PASOS: 

const changePassword = document.getElementById('password');
const cta = document.getElementById('cta');
const lengthRange = document.getElementById('lengthRange');
const lengthDisplay = document.getElementById('lengthDisplay'); 

// 1. UTILIZAR querySelectorAll. DEBEMOS ASEGURARNOS DE QUE EN EL HTML LOS CUATRO CHECKBOX TIENEN LA MISMA CLASE EN ESTE CASO INPUT-CHECKBOX. ASEGURARNOS QUE VA CON EL PUNTO DELANTE

const checkboxElements = document.querySelectorAll('.input-checkbox');


// 2.  UTILIZAR UN OBJETO YA QUE LA LISTA DE CARACTERES ES ALGO RELACIONADOCREAMOS EL OBJETO

const passwordOptions = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '1234567890',
    symbols: '!@#$%^&*()_+-={}[]:;"<>,.?/'
};

// SACAMOS FUERA LA VARIABLE CHARACTERS PARA QUE ESTÉ ACCESIBLE EN TODO EL CÓDIGO

let characters = '';

lengthRange.addEventListener('input', () => {
    lengthDisplay.textContent = lengthRange.value; 
});

cta.addEventListener('click', () => {
    createPassword = ''; 
    const passwordLength = lengthRange.value;

// 3. CREAMOS EL FOR OF EN VEZ DE NUMEROSOS IF. SI EL CHECKBOX ESTA CHECKED, CHARACTERS ES IGUAL A CHARACTERS + EL OBJETO QUE TOQUE EN ESE MOMENTO
    for (const checkbox of checkboxElements) 
    if (checkbox.checked)
    characters = characters + passwordOptions[checkbox.id];

// GENERAR LA CONTRASEÑA
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        createPassword += characters[randomIndex]; 
    }    
    changePassword.textContent = createPassword; 
});


// TENEMOS QUE AÑADIR ESTE BUCLE SI NO NO FUNCIONA. ???

for (let i = 0; i < checkboxElements.length; i++) {
    checkboxElements[i].addEventListener('change', () => {
        // Resetear la variable de caracteres
        characters = '';

        // Recorremos todos los checkboxes y agregamos los caracteres seleccionados
        for (let j = 0; j < checkboxElements.length; j++) {
            if (checkboxElements[j].checked) {
                characters += passwordOptions[checkboxElements[j].id];
            }
        }

        // Verificamos si el botón debe estar habilitado o no
        checkboxActive();
    });
}


/* 4.1 PRIMERA OPCIÓN SIMPLIFICADA. CAMBIAR TODOS LOS CHECKED POR CHARACTERS.LENGTH > 0. VAMOS A EXPLICARLO PASO A PASO: 

1/PROPÓSITO: LA FUNCION CHECKBOXACTIVE TIENE LA FUNCIÓN DE ACTIVAR O DESACTIVAR UN BOTÓN, BASÁNDOSE EN LONGITUD DE UNA LISTA LLAMADA CHARACTERS 

2/LÓGICA CONDICIONAL: 

- LA FUNCIÓN VERIFICA SI LA LONGITUD DE CHARACTERS ES MAYOR A 0
- SI CHARACTERS CONTIENE ELEMENTOS (CHARACTERS.LENGTH > 0 ES TRUE), ESO SIGINIFICA QUE HAY AL MENOS UN ELEMENTO EN LA LISTA, Y SE ACTIVA EL BOTÓN CTA (CTA.DISABLED = FALSE)
- SI CHARACTERS ESTÁ VACÍO (CHARACTERS.LENGTH ES 0), EL BOTÓN SE DESACTIVA (CTA.DISABLED = TRUE)

3/USO DE DISABLED: 

- CTA.DISABLED ES UNA PROPIEDAD QUE CONTROLA SI UN BOTÓN ESTÁ ACTIVO O NO
- CUANDO CTA.DISABLED ES FALSE, EL BOTÓN ES INTERACTIVO Y EL USUARIO PUEDE HACER CLICK EN ÉL 
- CUANDO CTA.DISABLED ES TRUE, EL BOTÓN ESTÁ DESHABILITADO Y EL USUARIO NO PUEDE HACER CLICK EN ÉL */

const checkboxActive = () => {
    if (characters.length > 0) {
        cta.disabled = false; 
    } else {
        cta.disabled = true; 
    }
}

/* 4.2 SEGUNDA OPCIÓN MUY SIMPLIFICADA. 

cta.disabled =!characters.length

O LO QUE ES LO MISMO: 

cta.disabled = characters.length === 0; 

SI CHARACTERS.LENGTH ES IGUAL A 0, TRUE,  SI NO ES IGUAL A 0 FALSE

*/

checkboxUppercase.addEventListener('change', checkboxActive);
checkboxLowercase.addEventListener('change', checkboxActive);
checkboxNumber.addEventListener('change', checkboxActive);
checkboxSymbols.addEventListener('change', checkboxActive);

checkboxActive();

