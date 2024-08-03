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
```
   npm i usetargethandler
```

### Importaciòn
```
   import { useTargetHandler } from "usetargethandler";
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
    

```jsx
const MyForm = () => {
  const [target, setTarget, handleTarget, handleSubmit] = useTargetHandler({
    name: '',
    email: '',
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input type="text" name="name" value={target.name} onChange={handleTarget} />
      <input type="email" name="email" value={target.email} onChange={handleTarget} />
      <button type="submit">Enviar</button>
    </form>
  );
};

```
### Errores ⚠️
```jsx
const [target, setTarget, handleSubmit, errors] = useTargetHandler({
    nombre: "",
    apellido: "",
  });

<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="text"
    value={target.nombre || ""}
    placeholder="nombre"
    onChange={setTarget}
    name="nombre"
  />
  {/* Se agregó la validación de errores para el campo nombre */}
  {errors.nombre && <span>{errors.nombre.message}</span>}

  <input
    type="text"
    value={target.apellido || ""}
    placeholder="apellido"
    onChange={setTarget}
    name="apellido"
  />
  {/* Se agregó la validación de errores para el campo apellido */}
  {errors.apellido && <span>{errors.apellido.message}</span>}

  <button>Enviar</button>
</form>
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
