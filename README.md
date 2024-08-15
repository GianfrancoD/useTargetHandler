![useTarget](https://github.com/user-attachments/assets/fcdef414-d99f-49ae-8370-3b288d8b6fad)
![licence](https://img.shields.io/github/license/GianfrancoD/useTargetHandler)
![Badge en Desarollo](https://img.shields.io/badge/Status-En%20Desarrollo-green)
[![npm downloads](https://img.shields.io/npm/dt/usetargethandler.svg)](https://www.npmjs.com/package/usetargethandler)
![commit](https://img.shields.io/github/commits-since/GianfrancoD/useTargetHandler/1.2.4)
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
- **`Declaración de Variables de Entorno en la Nube`**: Declarar variables de entorno directamente en la nube, lo que permite una configuración más segura y flexible de tu aplicación. Esto simplifica la gestión de configuraciones en distintos entornos sin necesidad de modificar el código fuente.
- **`Integración Mejorada con useHttpRequest`**: `useTargetHandler` Ahora se integra de forma más fluida con el hook `useHttpRequest`, permitiendo realizar llamadas a la API directamente desde el formulario y gestionar las respuestas de manera efectiva, como tambien se crearon nuevas funcionalidades que se pueden utilizar para `Sentry` y `isLoading`
- **`Protección CSRF en useTargetHandler`**: Al activar `enableCSRF=true`, el hook useTargetHandler incluye automáticamente un token CSRF en las solicitudes HTTP que modifican datos (POST, PUT, DELETE) a través de `useHttpRequest`, protegiendo así contra ataques maliciosos.
- **`Limitación de Tasa (Rate Limiting)`**: La nueva versión implementa una funcionalidad de limitación de tasa que previene el envío excesivo de solicitudes en un corto período de tiempo. Ahora puedes establecer un intervalo de tiempo mínimo entre envíos de formularios, mejorando la experiencia del usuario y la estabilidad del servidor. Simplemente ajusta el parámetro `rateLimit` al usar el hook.
- **`Sanitización de Entradas`**: Se ha mejorado la función de sanitización de entradas para proteger contra ataques de inyección de código. La función `sanitizeInput` elimina etiquetas HTML y scripts potencialmente dañinos de los valores de entrada, asegurando que solo se almacenen datos limpios y seguros. Esto es crucial para prevenir ataques de Cross-Site Scripting (XSS).
- **`Protección contra Inyecciones SQL`**: Aunque el hook en sí no interactúa directamente con bases de datos, la sanitización de entradas ayuda a prevenir inyecciones SQL al asegurar que los datos que se envían a las API están debidamente filtrados. Esto es especialmente importante cuando se trabaja con APIs que pueden realizar operaciones de base de datos.

### Ventajas de Usar el Hook `useTargetHandler`

- **`Simplificación de la Gestión de Formularios en React`**: `useTargetHandler` proporciona una solución integral para manejar el estado de los campos de un formulario, lo que reduce la complejidad de la gestión de formularios en aplicaciones React.

- **`Valores Iniciales Personalizables`**: Permite pasar valores iniciales para el formulario, lo que te da flexibilidad para adaptarlo a tus necesidades específicas.

- **`Gestión de Estado en Tiempo Real`**: Proporciona una forma fácil de actualizar el estado del formulario en tiempo real según los cambios realizados por el usuario. Esto mejora la experiencia del usuario al interactuar con el formulario.

- **`Envío de Formularios Seguro`**: Incluye una función `handleSubmit` que permite enviar el formulario de manera segura, validando los campos antes de realizar cualquier acción, lo que ayuda a prevenir errores y asegurar la integridad de los datos.

- **`Reinicialización del Formulario`**: Después de enviar el formulario, `useTargetHandler` reinicializa el estado del formulario a sus valores iniciales, lo que facilita la reutilización del formulario sin necesidad de configuraciones adicionales.

- **`Validación de Campos`**: Implementa validaciones personalizadas para cada campo del formulario, asegurando que los datos ingresados por el usuario cumplan con los requisitos establecidos. Esto incluye mensajes de error personalizados para una mejor comunicación con el usuario.

- **`Limitación de Tasa (Rate Limiting)`**: Previene el envío excesivo de solicitudes en un corto período de tiempo, mejorando la estabilidad del servidor y la experiencia del usuario. Puedes establecer un intervalo de tiempo mínimo entre envíos de formularios.

- **`Sanitización de Entradas`**: Protege contra ataques de inyección de código al eliminar etiquetas HTML y scripts potencialmente dañinos de los valores de entrada, asegurando que solo se almacenen datos limpios y seguros.

- **`Protección contra Inyecciones SQL`**: Aunque el hook no interactúa directamente con bases de datos, la sanitización de entradas ayuda a prevenir inyecciones SQL al asegurar que los datos enviados a las API estén debidamente filtrados.

- **`Persistencia del Estado y Almacenamiento Condicional`**: Guarda el estado del formulario en `localStorage` o `sessionStorage`, permitiendo a los usuarios retomar formularios incompletos.

- **`Integración Mejorada con useHttpRequest`**: useTargetHandler ahora se integra de forma más fluida con el hook useHttpRequest, permitiendo realizar llamadas a la API directamente desde el formulario y gestionar las respuestas de manera efectiva.

- **Se han agregado nuevas funcionalidades que se pueden utilizar para mejorar la experiencia del usuario y el seguimiento de eventos**:
   - `isLoading`: Indica el estado de carga durante el envío del formulario, mejorando la experiencia del usuario al mostrar un indicador de progreso o deshabilitar el botón de envío mientras se procesa la solicitud.
   - `SentryWarning, SentryError, SentryInfo y SentryEvent`: Estas funciones permiten registrar advertencias, errores, información y eventos específicos en la plataforma de seguimiento de errores Sentry. Esto facilita el seguimiento de problemas en el formulario, la depuración de errores y el análisis del comportamiento del usuario.

- **`Protección CSRF`**: Al activar `enableCSRF=true`, el hook incluye automáticamente un token CSRF en las solicitudes HTTP que modifican datos (POST, PUT, DELETE), protegiendo así contra ataques maliciosos.

- **`Manejo de Variables de Entorno para la URL de la API`**: El hook utiliza la función `getEnvVar` para obtener la URL de la API a partir de variables de entorno. Esto permite una configuración más flexible y segura de la aplicación, especialmente en plataformas en la nube como Vercel e Infisical entre otros, donde puedes declarar variables de entorno directamente en la nube.

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
  - Los valores `target` y `setTarget` lo puedes modificar con el valor que mas se le sea de su agrado cuando se le llama, no es obligatoriamente `target` y `setTarget`. ( usar `handleTarget` ).
  - el valor de `value={target.nombre}` debe ser igual a `name="nombre"` y del estado `{nombre: "", apellido: ""}` y asi le pueda funcionar el formularios.
  - Cuando configuras un campo en tu formulario y estableces `required: true`, estás indicando que este campo es obligatorio. Esto no solo activa la validación para asegurarte de que el usuario complete el campo, sino que también permite el uso de otras reglas de validación relacionadas, como:
    - `pattern`, `patternMessage`, `requiredMessage`, `minLength`, `minLength`,  `maxLength`, `matches`, `matchMessage`, `min`, `max`, `checked`, `checkedMessage`, `selected`, `selectedMessage`.
  - `useTargetHandler` ya tiene incorporado dotenv y axios por parte de `useHttpRequest`.
  - Se integro nuevas funcionalidades del `useHttpRequest` a `useTargetHandler`:
      - `isLoading`: Indica el estado de carga durante el envío del formulario, mejorando la experiencia del usuario.
      - `SentryWarning`: Permite registrar advertencias en Sentry, facilitando el seguimiento de problemas en el formulario.
      - `SentryError`: Permite registrar errores en Sentry, asegurando un manejo adecuado de excepciones.
      - `SentryInfo`: Registra información relevante en Sentry durante el proceso de envío del formulario.
      - `SentryEvent`: Registra eventos específicos en Sentry, proporcionando un seguimiento más detallado de las acciones del usuario.

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
      ciudad: "",
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
      ciudad: {
         selected: true,
         selectedMessage: "Debes seleccionar ciudad",
      },
    },
      { storageType: "session", storageKey: "forms" },
      { enableCSRF: true, rateLimit: 2000 }
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

      <select name="ciudad" value={target.ciudad} onChange={handleTarget}>
          <option value="">Selecciona una ciudad</option>
          <option value="madrid">Madrid</option>
          <option value="barcelona">Barcelona</option>
          <option value="valencia">Valencia</option>
        </select>
        {errors.ciudad && <span>{errors.ciudad.message}</span>}

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

### Implementando useTargetHandler con useHttpRequest 🔥 - NUEVO 🆕

```jsx
import { useTargetHandler } from "usetargethandler";

export const Formulario = () => {
  const [target, handleTarget handleSubmit, errors, { apiCall, apiResponse, userFound, isLoading, SentryWarning, SentryError, SentryInfo, SentryEvent }, apiUrl] = useTargetHandler({
    nombre: "",
    apellido: "",
  });

  const onSubmit = async (data) => {
    try {
         SentryInfo("Iniciando el envío de datos del formulario", { data });
         // Realiza la llamada a la API
         await apiCall("users", 1, data, "post", "application/json", { page: 1, limit: 10 }); // de ejemplo
      if (userFound) {
         console.log("Usuario creado:", apiResponse);
         // Registra un evento exitoso en Sentry
         SentryEvent("Usuario creado exitosamente", { user: apiResponse });
      } else {
         console.error("Error al crear usuario:", error);
         // Registra un error en Sentry si no se encuentra el usuario
         SentryError("Error al crear usuario", { error });
      }
    } catch (err) {
      console.error("Error en la llamada a la API:", err);
      // Registra el error en Sentry
      SentryError("Error en la llamada a la API", { error: err });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label></label>
        <input
          type="text"
          value={target.nombre}
          pattern="[a-zA-Z]+"
          placeholder="nombre"
          onChange={handleTarget}
          name="nombre"
          required
        />
      {errors.nombre && <span>{errors.nombre.message}</span>}

        <label></label>
        <input
          type="text"
          value={target.apellido}
          pattern="[a-zA-Z]+"
          placeholder="apellido"
          onChange={handleTarget}
          name="apellido"
          required
        />
      {errors.apellido && <span>{errors.apellido.message}</span>}

        <button disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
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
