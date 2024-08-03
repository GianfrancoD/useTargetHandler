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
