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

# Hook useTargetHandler 📝 `JS`

### Instalaciòn

```jsx
   npm i usetargethandler
```

### Importaciòn

**JavaScript:**

```jsx
import { useTargetHandler } from "usetargethandler";
```

**TypeScript:**

```typescript
import {
  useTargetHandler,
  ValidationRules,
  FormValues,
} from "usetargethandler";
```

**TypeScript con Zod:**

```typescript
import { useTargetHandler, z } from "usetargethandler";
```

### Actualizar version

```jsx
   npm update usetargethandler
```

### Caracteristicas

- **`🎉 Soporte TypeScript (NUEVO v1.4.0)`**: El hook ahora está completamente escrito en TypeScript con definiciones de tipos completas. Funciona perfectamente tanto con JavaScript como TypeScript sin configuración adicional. [Ver guía TypeScript](./TYPESCRIPT_MIGRATION.md)
- **`🔷 Zod Integrado (NUEVO v1.4.0)`**: Zod viene incluido en el paquete. Importa `z` directamente desde `usetargethandler` y pasa tu schema como segundo parámetro. El hook detecta automáticamente si usas Zod o ValidationRules nativas. Perfecto para validaciones complejas con inferencia de tipos automática en TypeScript.
- **`Iniciales personalizables`**: El hook permite pasar valores iniciales para el formulario, lo que te da flexibilidad para adaptarlo a tus necesidades específicas.
- **`Gestión de estado en tiempo real`**: `useTargetHandler` proporciona una función `handleTarget` que actualiza el estado del formulario en tiempo real según los cambios realizados por el usuario.
- **`Envío de formularios seguro`**: El hook incluye una función `handleSubmit` que te permite enviar el formulario de manera segura y realizar acciones personalizadas después de la submitting.
- **`Reinicialización del formulario`**: Después de enviar el formulario, `useTargetHandler` reinicializa el estado del formulario a sus valores iniciales.
- **`Compatibilidad`**: `useTargetHandler` es compatible con todas las versiones de React a partir de la 16.8.
- **`Validación de campos`**: El hook permite implementar validaciones personalizadas para cada campo del formulario, asegurando que los datos ingresados por el usuario cumplan con los requisitos establecidos.
- **`Persistencia del Estado y Almacenamiento Condicional`**:
  El hook guarda el estado del formulario en localStorage o sessionStorage, permitiendo a los usuarios retomar formularios incompletos.

### ⚙️ Configuración Opcional

**Funcionalidades HTTP (Opcional):**

Si necesitas usar las funcionalidades HTTP integradas (Sentry, `isLoading`, llamadas API), debes:

1. **Instalar `usehttprequest` (opcional):**
```bash
npm install usehttprequest
```

2. **Configurar variables de entorno:**
Crea un archivo `.env` en la raíz de tu proyecto:

```bash
# Si usas Vite
VITE_API_URL=https://tu-api.com

# Si usas Create React App
REACT_APP_API_URL=https://tu-api.com

# Para desarrollo local
VITE_API_URL=http://localhost:3000/api
```

**⚠️ Nota:** Si NO instalas `usehttprequest`, el hook funcionará perfectamente para validación de formularios, pero las funcionalidades HTTP no estarán disponibles.

- **`Integración Mejorada con useHttpRequest`**: `useTargetHandler` Ahora se integra de forma más fluida con el hook `useHttpRequest`, permitiendo realizar llamadas a la API directamente desde el formulario y gestionar las respuestas de manera efectiva, como tambien se crearon nuevas funcionalidades que se pueden utilizar para `Sentry` y `isLoading`
- **`Protección CSRF en useTargetHandler`**: Al activar `enableCSRF=true`, el hook useTargetHandler incluye automáticamente un token CSRF en las solicitudes HTTP que modifican datos (POST, PUT, DELETE) a través de `useHttpRequest`, protegiendo así contra ataques maliciosos.
- **`Integración Mejorada con useHttpRequest`**: `useTargetHandler` Ahora se integra de forma más fluida con el hook `useHttpRequest`, permitiendo realizar llamadas a la API directamente desde el formulario y gestionar las respuestas de manera efectiva.
- **`Protección CSRF (Cross-Site Request Forgery)`**: Al activar `enableCSRF=true`, el hook utiliza `useHttpRequest` para leer el token CSRF de las cookies e incluir el header `X-CSRF-Token` en las solicitudes HTTP mutantes (POST, PUT, DELETE). **IMPORTANTE:** Esta protección requiere que tu backend:

  - Genere y envíe el token CSRF al cliente
  - Valide el token en cada petición que modifica datos
  - Configure correctamente las cookies CSRF (recomendado: SameSite=Strict o Lax)

  **Compatibilidad de navegadores:** La detección de velocidad de conexión (2G/3G/4G) solo funciona en Chrome, Edge y Opera (no en Firefox/Safari). En navegadores no compatibles, usará un delay predeterminado de 2000ms.

- **`Limitación de Tasa (Rate Limiting)`**: La nueva versión implementa una funcionalidad de limitación de tasa que previene el envío excesivo de solicitudes en un corto período de tiempo. Ahora puedes establecer un intervalo de tiempo mínimo entre envíos de formularios, mejorando la experiencia del usuario y la estabilidad del servidor. Simplemente ajusta el parámetro `rateLimit` al usar el hook.
- **`Protección XSS (Cross-Site Scripting)`**: El hook utiliza **DOMPurify**, una librería de sanitización de alto nivel, para prevenir ataques XSS. La función `sanitizeInput` elimina:

  - Etiquetas `<script>` y contenido malicioso
  - Event handlers (`onerror`, `onload`, `onclick`, etc.)
  - JavaScript protocol (`javascript:`, `data:` URIs maliciosos)
  - Inyecciones SVG/XML
  - Todas las etiquetas y atributos HTML

  **IMPORTANTE:** La sanitización ocurre en campos de tipo `text`, `email`, `tel`, `url`. Los campos `password`, `number`, `textarea` y `select` NO se sanitizan para preservar su funcionalidad. **Recomendación:** Sanitizar también en el backend antes de almacenar o renderizar datos.

- **`Inyecciones SQL`**: ⚠️ **IMPORTANTE:** El hook **NO protege contra inyecciones SQL**. La prevención de SQL injection **DEBE implementarse únicamente en el backend** mediante:

  - **Prepared Statements** (Consultas parametrizadas) - Método recomendado
  - **ORMs** (Sequelize, Prisma, TypeORM) - Manejan sanitización automáticamente
  - **Validación y escape en el servidor** - Nunca confíes solo en validación frontend

  Ejemplo backend seguro (Node.js):

  ```javascript
  // ✅ CORRECTO - Prepared statement
  db.query("SELECT * FROM users WHERE email = ?", [email]);

  // ❌ INCORRECTO - Vulnerable a SQL injection
  db.query(`SELECT * FROM users WHERE email = '${email}'`);
  ```

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

**🔷 Usando Zod:**

El hook acepta dos formas de validación en el segundo parámetro:

```typescript
// Opción 1: ValidationRules nativas
useTargetHandler(initialValues, { email: { required: true, pattern: /.../ } });

// Opción 2: Schema de Zod (detección automática)
import { z } from "usetargethandler";
const schema = z.object({ email: z.string().email() });
useTargetHandler(initialValues, schema); // ← El hook detecta que es Zod
```

El hook detecta automáticamente si el segundo parámetro es un schema de Zod (tiene métodos `.parse()` y `.safeParse()`) y valida con Zod en lugar de usar ValidationRules. Los errores se convierten automáticamente al formato de `useTargetHandler`.

- ### Destacado

  - Los valores `target` y `setTarget` lo puedes modificar con el valor que mas se le sea de su agrado cuando se le llama, no es obligatoriamente `target` y `setTarget`. ( usar `handleTarget` ).
  - el valor de `value={target.nombre}` debe ser igual a `name="nombre"` y del estado `{nombre: "", apellido: ""}` y asi le pueda funcionar el formularios.
  - Cuando configuras un campo en tu formulario y estableces `required: true`, estás indicando que este campo es obligatorio. Esto no solo activa la validación para asegurarte de que el usuario complete el campo, sino que también permite el uso de otras reglas de validación relacionadas, como:
    - `pattern`, `patternMessage`, `requiredMessage`, `minLength`, `minLength`, `maxLength`, `matches`, `matchMessage`, `min`, `max`, `checked`, `checkedMessage`, `selected`, `selectedMessage`.
  - `useTargetHandler` ya tiene incorporado dotenv y axios por parte de `useHttpRequest`.

  - Se integro nuevas funcionalidades del `useHttpRequest` a `useTargetHandler`:

    - `isLoading`: Indica el estado de carga durante el envío del formulario, mejorando la experiencia del usuario.
    - `SentryWarning`: Permite registrar advertencias en Sentry, facilitando el seguimiento de problemas en el formulario.
    - `SentryError`: Permite registrar errores en Sentry, asegurando un manejo adecuado de excepciones.
    - `SentryInfo`: Registra información relevante en Sentry durante el proceso de envío del formulario.
    - `SentryEvent`: Registra eventos específicos en Sentry, proporcionando un seguimiento más detallado de las acciones del usuario.
    - `useTargetHandler` ahora integra Sentry para el manejo de errores y el seguimiento de eventos. Esto permite registrar advertencias, errores e información relevante durante el proceso de envío de formularios.

  - **🔷 Zod Destacado**:
    - **Todo incluido**: No necesitas `npm install zod` por separado, ya viene con el paquete
    - **Detección automática**: Solo pasa tu schema, el hook reconoce que es Zod sin configuración
    - **Misma API**: No cambias la forma de usar el hook, solo cambias el segundo parámetro
    - **Inferencia de tipos**: TypeScript obtiene los tipos automáticamente desde tu schema con `z.infer<typeof schema>`
    - **Validaciones complejas**: Usa `.refine()` para validaciones como "confirmar contraseña" que no son posibles con ValidationRules
    - **Transformaciones**: Convierte datos automáticamente (ej: string a número, email a minúsculas) con `.transform()`

NUEVO 🆕 -
[FUNCTIONALITY](FUNCTIONALITY.md) - [CHANGELOG](./CHANGELOG.md)

```jsx
import React from "react";
import { useTargetHandler } from "useTargetHandler";

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

---

### Ejemplo 3: Con Zod (Validaciones Avanzadas) 🔷

```typescript
import { useTargetHandler, z } from "usetargethandler"; // ✨ Todo desde el mismo paquete

// Define tu schema con Zod
const registroSchema = z
  .object({
    email: z
      .string()
      .email("Email inválido")
      .transform((val) => val.toLowerCase()),
    username: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(20, "Máximo 20 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guión bajo"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string(),
    age: z
      .number()
      .min(18, "Debes ser mayor de 18 años")
      .max(99, "Edad máxima 99"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // El error aparece en confirmPassword
  });

// TypeScript infiere el tipo automáticamente
type RegistroForm = z.infer<typeof registroSchema>;

export const FormularioZod = () => {
  // Pasa el schema - useTargetHandler detecta automáticamente que es Zod
  const [target, handleTarget, handleSubmit, errors] =
    useTargetHandler<RegistroForm>(
      {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        age: 0,
        terms: false,
      },
      registroSchema // ← Detección automática de Zod
    );

  const onSubmit = handleSubmit(async (data) => {
    // ✅ Los datos ya están validados por Zod
    // ✅ data.email está en minúsculas (transformación automática)
    console.log("Registro exitoso:", data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={target.email}
        onChange={handleTarget}
        placeholder="tu@email.com"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="text"
        name="username"
        value={target.username}
        onChange={handleTarget}
        placeholder="usuario"
      />
      {errors.username && <span>{errors.username.message}</span>}

      <input
        type="password"
        name="password"
        value={target.password}
        onChange={handleTarget}
        placeholder="Contraseña"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        name="confirmPassword"
        value={target.confirmPassword}
        onChange={handleTarget}
        placeholder="Confirmar Contraseña"
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <input
        type="number"
        name="age"
        value={target.age}
        onChange={handleTarget}
        placeholder="Edad"
      />
      {errors.age && <span>{errors.age.message}</span>}

      <label>
        <input
          type="checkbox"
          name="terms"
          checked={target.terms}
          onChange={handleTarget}
        />
        Acepto los términos y condiciones
      </label>
      {errors.terms && <span>{errors.terms.message}</span>}

      <button type="submit">Registrarse</button>
    </form>
  );
};
```

**Ventajas de este ejemplo:**

- ✅ **Validación de confirmar contraseña** con `.refine()`
- ✅ **Transformación automática** del email a minúsculas
- ✅ **Validaciones complejas** (mayúscula, número en password)
- ✅ **Tipos automáticos** con `z.infer<typeof schema>`
- ✅ **Todo en un solo paquete** - no necesitas `npm install zod`

---

## 🔒 Guía de Seguridad

### Resumen de Protecciones

| Amenaza           | Protección Frontend | Nivel | Requiere Backend |
| ----------------- | ------------------- | ----- | ---------------- |
| **XSS**           | ✅ DOMPurify        | Alto  | ⚠️ Recomendado   |
| **CSRF**          | ⚠️ Header Token     | Medio | ✅ Obligatorio   |
| **SQL Injection** | ❌ No protege       | N/A   | ✅ Obligatorio   |

### Protección XSS (Cross-Site Scripting)

**¿Qué hace el hook?**

El hook utiliza **DOMPurify** para sanitizar automáticamente los inputs de tipo `text`, `email`, `tel` y `url`. Esta biblioteca elimina:

- Tags `<script>` y su contenido
- Event handlers maliciosos (`onerror`, `onload`, `onclick`, etc.)
- JavaScript protocol (`javascript:`, `data:` URIs)
- Inyecciones SVG/XML
- Todas las etiquetas y atributos HTML

**Ejemplo:**

```javascript
// Input del usuario
<img src=x onerror="alert('XSS')">

// Después de sanitizeInput con DOMPurify
// (Resultado: cadena vacía o texto sin HTML)
```

**⚠️ Campos NO sanitizados:**

- `password` - Permite caracteres especiales necesarios
- `number` - Solo acepta números
- `textarea` - Para preservar formato
- `select` - Opciones predefinidas

**✅ Mejores Prácticas:**

1. **Sanitizar también en el backend** antes de almacenar
2. **Escapar al renderizar** datos en HTML
3. **Usar Content Security Policy (CSP)** en headers HTTP
4. **Validar tipos de archivo** en uploads

### Protección CSRF (Cross-Site Request Forgery)

**¿Qué hace el hook?**

Cuando activas `enableCSRF=true`, el hook usa `useHttpRequest` para:

1. Leer el token CSRF de las cookies del navegador
2. Incluir el header `X-CSRF-Token` en peticiones mutantes (POST/PUT/DELETE)

**⚠️ Limitaciones:**

- Solo funciona si la cookie CSRF **NO tiene flag HttpOnly**
- El token debe estar en una cookie llamada `csrfToken`
- **Requiere configuración completa en el backend**

**✅ Configuración Backend Requerida:**

```javascript
// Express.js ejemplo
import csrf from "csurf";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(
  csrf({
    cookie: {
      httpOnly: false, // Permitir lectura desde JS
      sameSite: "strict",
      secure: true, // Solo HTTPS en producción
    },
  })
);

// Enviar token al cliente
app.get("/api/csrf-token", (req, res) => {
  res.cookie("csrfToken", req.csrfToken());
  res.json({ success: true });
});

// Validar token en cada petición
app.post("/api/data", (req, res) => {
  // csrf middleware valida automáticamente el header X-CSRF-Token
  // Si falla, retorna 403 Forbidden
  res.json({ success: true });
});
```

**Alternativa Recomendada: Meta Tag**

En lugar de cookies, usa un meta tag (más seguro):

```html
<!-- En tu HTML -->
<meta name="csrf-token" content="<%= csrfToken %>" />
```

```javascript
// Modifica getCsrfToken en useHttpRequest
const metaTag = document.querySelector('meta[name="csrf-token"]');
const csrfToken = metaTag?.getAttribute("content");
```

### SQL Injection - Responsabilidad del Backend

**❌ El frontend NO puede prevenir SQL injection**

Esta amenaza **SOLO puede mitigarse en el backend** usando:

**✅ Prepared Statements (Recomendado):**

```javascript
// Node.js + MySQL
const query = "SELECT * FROM users WHERE email = ?";
db.query(query, [email], (err, results) => {
  // El driver escapa automáticamente los parámetros
});

// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

**✅ ORMs (Sequelize, Prisma, TypeORM):**

```javascript
// Sequelize - Seguro automáticamente
const user = await User.findOne({
  where: { email: email },
});

// Prisma - Seguro automáticamente
const user = await prisma.user.findUnique({
  where: { email: email },
});
```

**✅ Validación de Entrada:**

```javascript
// Validar formato en backend
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: "Email inválido" });
}
```

### Checklist de Seguridad

**Frontend (useTargetHandler):**

- [x] Sanitización XSS con DOMPurify
- [x] Envío de token CSRF en headers
- [x] Rate limiting para prevenir spam
- [x] Validación de formato de inputs
- [ ] Content Security Policy (CSP) - Configura en servidor

**Backend (Tu API):**

- [ ] Generar y validar tokens CSRF
- [ ] Usar prepared statements o ORMs
- [ ] Validar y sanitizar todos los inputs
- [ ] Implementar autenticación y autorización
- [ ] Usar HTTPS en producción
- [ ] Configurar CORS correctamente
- [ ] Implementar rate limiting en servidor
- [ ] Logs y monitoreo de seguridad

### Recursos Adicionales

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)

---

🚨 `Nuevas versiones y Actualizaciones Proximamente` 🚨

Màs sobre la Funcionalidad del HOOK 👉🏻 [FUNCTIONALITY](FUNCTIONALITY.md) 👈🏻

No te pierdas las ultimas versiones 👉🏻 [CHANGELOG](./CHANGELOG.md) 👈🏻
