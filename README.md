![useTarget](https://github.com/user-attachments/assets/fcdef414-d99f-49ae-8370-3b288d8b6fad)
![licence](https://img.shields.io/github/license/GianfrancoD/useTargetHandler)
![Badge en Desarollo](https://img.shields.io/badge/Status-En%20Desarrollo-green)
[![npm downloads](https://img.shields.io/npm/dt/usetargethandler.svg)](https://www.npmjs.com/package/usetargethandler)
![commit](https://img.shields.io/github/commits-since/GianfrancoD/useTargetHandler/1.0.27)
![npm](https://img.shields.io/npm/v/usetargethandler)
![GitHub release](https://img.shields.io/github/release/GianfrancoD/usetargethandler)

## Actualizaciones & Funcionalidad

Ver los cambios realizados en el Hook [CHANGELOG](./CHANGELOG.md)

- Conoce las mejoras y cambios en la funcionalidad del Hook [FUNCTIONALITY](FUNCTIONALITY.md)

# Hook useTargetHandler 📝

### Instalaciòn
```jsx
   npm i usetargethandler
```

### Importaciòn
```jsx
   import { useTargetHandler } from "usetargethandler";
```

### Actualizar version
```jsx
   npm update usetargethandler
```

### Caracteristicas

- **`Iniciales personalizables`**: El hook permite pasar valores iniciales para el formulario, lo que te da flexibilidad para adaptarlo a tus necesidades específicas.
- **`Gestión de estado en tiempo real`**: `useTargetHandler` proporciona una función `handleTarget` que actualiza el estado del formulario en tiempo real según los cambios realizados por el usuario.
- **`Envío de formularios seguro`**: El hook incluye una función `handleSubmit` que te permite enviar el formulario de manera segura y realizar acciones personalizadas después de la submitting.
- **`Reinicialización del formulario`**: Después de enviar el formulario, `useTargetHandler` reinicializa el estado del formulario a sus valores iniciales.
- **`Compatibilidad`**: `useTargetHandler` es compatible con todas las versiones de React a partir de la 16.8.
- **`Validación de campos`**: El hook permite implementar validaciones personalizadas para cada campo del formulario, asegurando que los datos ingresados por el usuario cumplan con los requisitos establecidos.
- **`Persistencia del Estado y Almacenamiento Condicional`**:
El hook guarda el estado del formulario en localStorage o sessionStorage, permitiendo a los usuarios retomar formularios incompletos.

### Ventajas

- Simplifica la gestión de formularios en React
- Permite personalizar el estado inicial del formulario
- Proporciona una forma fácil de actualizar el estado del formulario en tiempo real
- Incluye una función para enviar el formulario de manera segura
- Reinicializa el formulario después de enviarlo
- Implementa validaciones personalizadas para cada campo.

### Uso 💎

- `target`: Contendrá los valores actuales del formulario, inicializados con `{ nombre: "", apellido: "" }`.
   - Almacena los valores del formulario.
- `handleTarget`: handleTarget se utilizará para manejar los cambios en los campos del formulario. Por ejemplo, puedes asignarla a un evento onChange en los inputs del formulario.
   - Función para manejar cambios en los campos del formulario.
- `handleSubmit`: handleSubmit se llamará cuando se envíe el formulario.
   - Función para manejar el envío del formulario y la validación.
- `errors`: Contendrá los errores de validación del formulario, que se pueden mostrar en la interfaz de usuario si hay errores.
   - Almacena los errores de validación.

- ### Destacado
  - Los valores `target` y `setTarget` lo puedes modificar con el valor que mas se le sea de su agrado cuando se le llama, no es obligatoriamente `target` y `setTarget`.
  - el valor de `value={target.nombre}` debe ser igual a `name="nombre"` y del estado `{nombre: "", apellido: ""}` y asi le pueda funcionar el formularios.

 NUEVO 🆕 - 
[FUNCTIONALITY](FUNCTIONALITY.md) - [CHANGELOG](./CHANGELOG.md) 
```jsx
import React from 'react';
import {useTargetHandler} from 'useTargetHandler';

const Formulario = () => {
  const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      apellido: "",
      password: "",
      confirmPassword: "",
      email: "",
      age: "",
      terms: false,
      gender: "",
    },
    {
      nombre: {
        required: true,
        requiredMessage: "el nombre es obligatio !!!",
        patternMessage: "no puede tener o llevar numeros",
        pattern: /^[a-zA-Z]+$/,
        minLength: 1,
        maxLength: 30,
      },
      apellido: {
        required: true,
        pattern: /^[a-zA-Z]+$/,
        requiredMessage: "el apellido es obligatio !!!",
        patternMessage: "no puede tener o llevar numeros",
      },
      email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        patternMessage: "El correo no es válido",
        requiredMessage: "el email es obligatiorio!!",
      },
      password: {
        required: true,
        minLength: 6,
        requiredMessage: "La contraseña es obligatoria",
      },
      confirmPassword: {
        required: true,
        matches: "password",
        matchMessage: "Las contraseñas no coinciden",
        requiredMessage: "Debe confirmar su contraseña",
      },
      age: {
        required: true,
        min: 18,
        max: 99,
        requiredMessage: "La edad es obligatoria",
      },
      terms: {
        checked: true,
        checkedMessage: "Debes aceptar los términos y condiciones",
      },
    }
  );

  const onSubmit = () => {
    console.log(target);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="nombre"
          value={target.nombre}
          placeholder="nombre"
          onChange={handleTarget}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}

        <input
          type="text"
          name="apellido"
          value={target.apellido}
          placeholder="apellido"
          onChange={handleTarget}
        />
        {errors.apellido && <span>{errors.apellido.message}</span>}

        <input
          type="email"
          name="email"
          value={target.email}
          placeholder="email"
          onChange={handleTarget}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          name="password"
          value={target.password}
          placeholder="password"
          onChange={handleTarget}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="password"
          name="confirmPassword"
          value={target.confirmPassword}
          placeholder="ConfirmPassword"
          onChange={handleTarget}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <input
          type="number"
          name="age"
          value={target.age}
          placeholder="edad"
          onChange={handleTarget}
        />
        {errors.age && <span>{errors.age.message}</span>}

        <input
          type="checkbox"
          name="terms"
          checked={target.terms}
          onChange={handleTarget}
        />
        <label>Acepto los términos y condiciones</label>
        {errors.terms && <span>{errors.terms.message}</span>}

        <input
          type="radio"
          name="gender"
          value="male"
          checked={target.gender === "male"}
          onChange={handleTarget}
        />
        <label>Masculino</label>

        <input
          type="radio"
          name="gender"
          value="female"
          checked={target.gender === "female"}
          onChange={handleTarget}
        />
        <label>Femenino</label>

        {errors.gender && <span>{errors.gender.message}</span>}

        <button>Enviar</button>
      </form>
    </>
  );
};

```

### Implementando useTargetHandler con useHttpRequest 🔥

```jsx
import { useTargetHandler } from "usetargethandler";
import { useHttpRequest } from "usehttprequest";

export const Formulario = () => {
  const [target, setTarget, handleSubmit] = useTargetHandler({
    nombre: "",
    apellido: "",
  });
  const { apiCall, apiResponse, userFound } = useHttpRequest();

  const handleFormSubmit = (target) => {
    apiCall("create", undefined, target, "post", "application/json");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label></label>
        <input
          type="text"
          value={target.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={setTarget}
          name="nombre"
          required
        />
        <label></label>
        <input
          type="text"
          value={target.apellido}
          pattern="[a-zA-Z]+"
          placeholder="apellido"
          onChange={setTarget}
          name="apellido"
          required
        />
        <button>Enviar</button>
      </form>

      {apiResponse ? (
        <p style={{ color: "green" }}>{apiResponse}</p>
      ) : userFound ? (
        <p style={{ color: "red" }}>{userFound}</p>
      ) : (
        <p></p>
      )}
    </>
  );
};
```

🚨 `Nuevas versiones y Actualizaciones Proximamente` 🚨

Màs sobre la Funcionalidad del HOOK 👉🏻 [FUNCTIONALITY](FUNCTIONALITY.md) 👈🏻

No te pierdas las ultimas versiones 👉🏻 [CHANGELOG](./CHANGELOG.md) 👈🏻
