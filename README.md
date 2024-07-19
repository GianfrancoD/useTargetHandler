![useTarget](https://github.com/user-attachments/assets/fcdef414-d99f-49ae-8370-3b288d8b6fad)
![licence](https://img.shields.io/github/license/GianfrancoD/useTargetHandler)
![Badge en Desarollo](https://img.shields.io/badge/Status-En%20Desarrollo-green)
![commit](https://img.shields.io/github/commits-since/GianfrancoD/useTargetHandler/1.0.0)

# Hook useTargetHandler 📝

### Instalaciòn
```
npm i usetargethandler
```

### Caracteristicas

- `Iniciales personalizables`: El hook permite pasar valores iniciales para el formulario, lo que te da flexibilidad para adaptarlo a tus necesidades específicas.
- `Gestión de estado en tiempo real`: useTarget proporciona una función handleTarget que actualiza el estado del formulario en tiempo real según los cambios realizados por el usuario.
- `Envío de formularios seguro`: El hook incluye una función handleSubmit que te permite enviar el formulario de manera segura y realizar acciones personalizadas después de la submitting.
- `Reinicialización del formulario`: Después de enviar el formulario, useTarget reinicializa el estado del formulario a sus valores iniciales.
- `Compatibilidad`: useTarget es compatible con todas las versiones de React a partir de la 16.8.

### Ventajas

- Simplifica la gestión de formularios en React
- Permite personalizar el estado inicial del formulario
- Proporciona una forma fácil de actualizar el estado del formulario en tiempo real
- Incluye una función para enviar el formulario de manera segura
- Reinicializa el formulario después de enviarlo

### Uso

Para utilizar `useTargetHandler`, simplemente importa el hook y llama a la función `useTargetHandler` con los valores iniciales del formulario. Luego, utiliza la variable `target` para acceder al estado actual del formulario, la función `setTarget` para actualizar el estado del formulario de manera explícita, y las funciones `handleTarget` y `handleSubmit` para gestionar el estado del formulario y enviarlo.

- ### Destacado
  - Los valores `target` y `setTarget` lo puedes modificar con el valor que mas se le sea de su agrado cuando se le llama, no es obligatoriamente `target` y `setTarget`.

```
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

### Implementando useTarget con useHttpRequest

```
function App() {
  const [target, setTarget, handleTarget, handleSubmit] = useTargetHandler({
    nombre: "",
  });
  const { apiCall, apiResponse, userFound } = useHttpRequest
();

  useEffect(() => {
    apiCall("registrados", null, null, "get", "application/json");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Usuarios</label>
        <input
          type="text"
          name="nombre"
          value={target.nombre}
          onChange={handleTarget}
        />
        <button type="submit">Enviar</button>
      </form>
      {userFound && (
        <ul>
          {apiResponse.map((item) => (
            <li key={item.id}>{item.nombre}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
```

⚠️`Nuevas versiones y Actualizaciones Proximamente`⚠️
