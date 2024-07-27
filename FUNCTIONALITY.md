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

### AHORA 🔥

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
  {errors.apellido && <span>{errors.apellido}</span>}

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
