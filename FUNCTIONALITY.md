# Versión 1.2.1: Innovaciones en la Gestión de Formularios y Validaciones

## Innovaciones y Mejoras 🚀

La versión 1.2.1 del hook `useTargetHandler` introduce funcionalidades avanzadas que transforman la forma en que gestionas formularios en tus aplicaciones React.

### 🌟 Declaración de Variables de Entorno en la Nube

Ahora puedes declarar variables de entorno directamente en la nube, lo que permite una configuración más flexible y segura. Esto se logra mediante la función `getEnvVar`, que facilita la obtención de la URL base de la API sin necesidad de modificar el código fuente.

### 🔗 Integración con `useHttpRequest`

Se ha mejorado la integración con el hook `useHttpRequest`, permitiendo realizar llamadas a la API directamente desde el formulario. Esto simplifica el proceso de manejo de datos y mejora la interacción con el backend.

### ✅ Función de Validación Mejorada

La función ha sido optimizada para ofrecer una gestión más robusta de las validaciones, incluyendo:
- Validaciones de longitud mínima y máxima.
- Validaciones de patrones de expresión regular.
- Verificaciones de coincidencias entre campos.
- Mensajes de error personalizados para cada regla.

### 📚 Ejemplo de Uso

```jsx
const { target, handleTarget, handleSubmit, errors, { apiCall, apiResponse, userFound, error }, apiUrl } = useTargetHandler()
  {
    nombre: { required: true, requiredMessage: "El nombre es obligatorio" },
    apellido: { required: true, pattern: /^[a-zA-Z]+$/, patternMessage: "El apellido solo debe contener letras" }
  },
  "local",
  "formData"
);
```

```jsx
const { target, handleTarget, handleSubmit, errors, { apiCall, apiResponse, userFound, error, params }, apiUrl } = useTargetHandler()
apiCall("create", 1, target, "post", "application/json", { page: 1, limit: 10 });
-
'apiCall(endpoint, id, data, method, http, params)'
```



# Versión 1.2.0: Nuevas Validaciones y Mejoras en el Formulario

Nuevas Validaciones y Mejoras 🚀
Se han añadido nuevas funcionalidades al hook useTargetHandler, permitiendo una gestión más robusta de los formularios. Las nuevas propiedades incluyen:

- `minLength`: Verifica que la longitud del valor ingresado sea al menos la mínima especificada.
- `maxLength`: Verifica que la longitud del valor ingresado no exceda la máxima especificada.
- `matches`: Permite validar que el valor de un campo coincida con el valor de otro campo (por ejemplo, para confirmar contraseñas).
- `matchMessage`: Proporciona un mensaje de error personalizado si los valores no coinciden, mejorando la claridad para el usuario.
- `min y max`: Verifican que el valor ingresado esté dentro de un rango específico, asegurando que los datos sean válidos (por ejemplo, para la edad).
- `checked y checkedMessage`: Aseguran que los checkboxes estén marcados y proporcionan mensajes claros si no lo están.
- `Validación para Botones de Radio`: Se ha implementado la propiedad selected, que verifica que al menos un botón de radio en un grupo esté seleccionado, junto con un mensaje de error personalizado.

ANTES ❌
```jsx
 const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      apellido: "",
    },
    {
      nombre: {
        required: true,
        requiredMessage: "El nombre es obligatorio",
        pattern: /^[a-zA-Z]+$/,
        patternMessage: "El nombre no puede contener números.",
      },
      apellido: {
        required: true,
        requiredMessage: "El apellido es obligatorio",
        pattern: /^[a-zA-Z]+$/,
        patternMessage: "El apellido no puede contener números.",
      },
    },
    "local",
    "formData"
  );

```

AHORA ✅
```jsx
const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      apellido: "",
      password: "",
      confirmPassword: "",
      email: "",
      age: "",
      terms: false, // Nuevo
      gender: "", // Nuevo
    },
    {
      nombre: {
        required: true,
        requiredMessage: "el nombre es obligatio !!!",
        patternMessage: "no puede tener o llevar numeros",
        pattern: /^[a-zA-Z]+$/,
        minLength: 1, // Nuevo
        maxLength: 30, // Nuevo
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
        minLength: 6, // Nuevo
        requiredMessage: "La contraseña es obligatoria",
      },
      confirmPassword: {
        required: true,
        matches: "password", // Nuevo
        matchMessage: "Las contraseñas no coinciden", // Nuevo
        requiredMessage: "Debe confirmar su contraseña",
      },
      age: {
        required: true,
        min: 18, // Nuevo
        max: 99, // Nuevo
        requiredMessage: "La edad es obligatoria",
      },
      terms: {
        checked: true, // Nuevo
        checkedMessage: "Debes aceptar los términos y condiciones", // Nuevo
      },
      ciudad: {
        selected: true, // Nuevo
        selectedMessage: "Debes seleccionar ciudad", // Nuevo
      },
    },
     "local",
    "formData"
  );
```

VALIDACION DE CHECKBOX Y RADIO ✅
```jsx
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

        <select name="ciudad" value={target.ciudad} onChange={handleTarget}>
         <option value="">Selecciona una ciudad</option>
         <option value="madrid">Madrid</option>
         <option value="barcelona">Barcelona</option>
         <option value="valencia">Valencia</option>
       </select>

       {errors.ciudad && <span>{errors.ciudad.message}</span>}
```


Versión 1.1.0: Validaciones Personalizadas
=============================================
Validaciones Personalizadas 🔒
Se ha implementado el uso de propiedades como required, pattern, patternMessage y requiredMessage, permitiendo a los desarrolladores establecer restricciones específicas en los campos del formulario. Esto mejora la experiencia del usuario al proporcionar mensajes claros sobre los requisitos de entrada.

ANTES ❌
```jsx
const [target, setTarget, handleSubmit] = useTargetHandler({
    nombre: "",
    apellido: "",
  }, "local", "formData");
```

```jsx
{errors.nombre && <span>{errors.nombre}</span>}
```

AHORA ✅

```jsx
 const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      apellido: "",
    },
    {
      nombre: {
        required: true,
        requiredMessage: "El nombre es obligatorio",
        pattern: /^[a-zA-Z]+$/,
        patternMessage: "El nombre no puede contener números.",
      },
      apellido: {
        required: true,
        requiredMessage: "El apellido es obligatorio",
        pattern: /^[a-zA-Z]+$/,
        patternMessage: "El apellido no puede contener números.",
      },
    },
    "local",
    "formData"
  );

```

```jsx
{errors.nombre && <span>{errors.nombre.message}</span>}

```



Versión 1.0.27: Persistencia del Estado y Almacenamiento Condicional
=============================================
Persistencia del Estado en el formulario 💾
Se implementó la funcionalidad para guardar el estado del formulario en localStorage o sessionStorage, permitiendo a los usuarios retomar formularios incompletos.

ANTES ❌
```jsx
const [target, setTarget, handleSubmit] = useTargetHandler({
    nombre: "",
    apellido: "",
  });
```
```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="text"
    value={target.nombre}
    placeholder="nombre"
    onChange={setTarget}
    name="nombre"
  />

  <input
    type="text"
    value={target.apellido}
    placeholder="apellido"
    onChange={setTarget}
    name="apellido"
  />

  <button>Enviar</button>
</form>

```

AHORA ✅

```jsx
const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      apellido: "",
    },
    "local", // Se especifica el tipo de almacenamiento (localStorage o sessionStorage)
    "formData" // Nombre para el almacenamiento (Si no le asignas un nombre tendra nombre por Defecto)
);
```

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="text"
    value={target.nombre || ""}
    placeholder="nombre"
    onChange={handleTarget}
    name="nombre"
  />
  {errors.nombre && <span>{errors.nombre}</span>}

  <input
    type="text"
    value={target.apellido || ""}
    placeholder="apellido"
    onChange={handleTarget}
    name="apellido"
  />
  {errors.apellido && <span>{errors.apellido}</span>}

  <button>Enviar</button>
</form>
```


# Versión 1.0.26: Mejoras en la validación de formularios
=============================================

### Mejora en la validación de errores ⚠️

Se agregó un nuevo parámetro `errors` para mejorar la validación de formularios.


#### ANTES ❌

```jsx
const [target, setTarget, handleSubmit] = useTargetHandler({
    nombre: "",
    apellido: "",
  });
```

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="text"
    value={target.nombre}
    placeholder="nombre"
    onChange={setTarget}
    name="nombre"
  />

  <input
    type="text"
    value={target.apellido}
    placeholder="apellido"
    onChange={setTarget}
    name="apellido"
  />

  <button>Enviar</button>
</form>
```

### AHORA ✅

```jsx
const [target, setTarget, handleSubmit, errors] = useTargetHandler({
    nombre: "",
    apellido: "",
  });
```


```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input
    type="text"
    value={target.nombre || ""}
    placeholder="nombre"
    onChange={setTarget}
    name="nombre"
  />
  {/* Se agregó la validación de errores para el campo nombre */}
  {errors.nombre && <span>{errors.nombre}</span>}

  <input
    type="text"
    value={target.apellido || ""}
    placeholder="apellido"
    onChange={setTarget}
    name="apellido"
  />
  {/* Se agregó la validación de errores para el campo apellido */}
  {errors.apellido && <span>{errors.apellido}</span>}

  <button>Enviar</button>
</form>
```
