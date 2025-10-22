![useTarget](https://github.com/user-attachments/assets/fcdef414-d99f-49ae-8370-3b288d8b6fad)

<div align="center">

[![License](https://img.shields.io/github/license/GianfrancoD/useTargetHandler?style=for-the-badge&labelColor=000000&color=4A90E2)](https://github.com/GianfrancoD/useTargetHandler/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/usetargethandler?style=for-the-badge&logo=npm&labelColor=000000&color=CB3837)](https://www.npmjs.com/package/usetargethandler)
[![npm downloads](https://img.shields.io/npm/dt/usetargethandler?style=for-the-badge&logo=npm&labelColor=000000&color=7CB342)](https://www.npmjs.com/package/usetargethandler)
[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-10B981?style=for-the-badge&labelColor=000000)](https://github.com/GianfrancoD/useTargetHandler)
[![GitHub release](https://img.shields.io/github/release/GianfrancoD/useTargetHandler?style=for-the-badge&labelColor=000000&color=F59E0B)](https://github.com/GianfrancoD/useTargetHandler/releases)
[![Commits](https://img.shields.io/github/commits-since/GianfrancoD/useTargetHandler/1.2.4?style=for-the-badge&labelColor=000000&color=8B5CF6)](https://github.com/GianfrancoD/useTargetHandler/commits)

</div>

## Actualizaciones & Funcionalidad

Ver los cambios realizados en el Hook [CHANGELOG](./CHANGELOG.md)

- Conoce las mejoras y cambios en la funcionalidad del Hook [FUNCTIONALITY](FUNCTIONALITY.md)

---

# <div align="center"> UseTargetHandler </div>

<div align="center">

### 🚀 Tecnologías Soportadas

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React_16.8+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Zod](https://img.shields.io/badge/Zod_Included-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

</div>

<p align="center">
  <em>Hook de React para gestión avanzada de formularios con validación, seguridad y TypeScript</em>
</p>

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Inicio Rápido](#-inicio-rápido)
- [Características](#-características)
- [Modos de Uso](#️-modos-de-uso)
- [Ejemplos](#-ejemplos)
- [Validación con Zod](#-validación-con-zod)
- [API Reference](#-api-reference)
- [Seguridad](#-seguridad)
- [Mejores Prácticas](#-mejores-prácticas)

---

## 🚀 Instalación

```bash
npm install usetargethandler
```

### Actualizar versión

```bash
npm update usetargethandler
```

---

## ⚡ Inicio Rápido

### Importación

#### JavaScript

```javascript
import { useTargetHandler } from "usetargethandler";
```

#### TypeScript

```typescript
import {
  useTargetHandler,
  ValidationRules,
  FormValues,
} from "usetargethandler";
```

#### TypeScript con Zod

```typescript
import { useTargetHandler, z } from "usetargethandler";
```

### Ejemplo Básico

```typescript
import { useTargetHandler } from "usetargethandler";

function LoginForm() {
  const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    { email: "", password: "" },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Email inválido",
      },
      password: {
        required: true,
        minLength: 6,
        minLengthMessage: "Mínimo 6 caracteres",
      },
    }
  );

  const onSubmit = (data) => {
    console.log("Formulario válido:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        value={target.email}
        onChange={handleTarget}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <input
        type="password"
        name="password"
        value={target.password}
        onChange={handleTarget}
        placeholder="Password"
      />
      {errors.password && (
        <span className="error">{errors.password.message}</span>
      )}

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

---

## ✨ Características

### 🎉 TypeScript y Validación

- **Soporte TypeScript completo (v1.4.0+)** - Tipos completos, funciona sin configuración adicional
- **Zod integrado (v1.4.0+)** - Validación avanzada sin instalación adicional
- **Validaciones personalizadas** - Sistema de reglas flexible y extensible
- **Detección automática** - El hook detecta si usas Zod o ValidationRules nativas

### 🔒 Seguridad

- **Protección XSS** - Sanitización automática con DOMPurify
- **Protección CSRF** - Token automático en solicitudes HTTP
- **Rate Limiting** - Prevención de spam y ataques
- **Validación de entrada** - Filtrado de datos maliciosos

### 🚀 Rendimiento y UX

- **Gestión de estado en tiempo real** - Actualización instantánea de campos
- **Persistencia de datos** - LocalStorage o SessionStorage configurable
- **Estados de carga** - Indicadores `isLoading` integrados
- **Reinicialización automática** - Limpieza del formulario tras envío

### 🔗 Integración HTTP

- **useHttpRequest integrado** - Llamadas API simplificadas
- **Sentry opcional** - Monitoreo de errores y eventos
- **Variables de entorno** - Configuración flexible de API URL
- **Respuestas tipadas** - Manejo de respuestas con TypeScript

---

## ⚙️ Modos de Uso

### 1️⃣ Modo Básico (Solo Validación)

Perfecto para formularios simples sin llamadas API.

```typescript
import { useTargetHandler } from "usetargethandler";

const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
  { email: "", password: "" },
  {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 },
  },
  { storageType: "session", storageKey: "loginForm" },
  { enableCSRF: false, rateLimit: 1000 }
);
```

### 2️⃣ Modo HTTP (Con useHttpRequest)

Para formularios que necesitan comunicarse con APIs.

```typescript
import { useTargetHandler } from "usetargethandler";
import { useHttpRequest } from "usehttprequest";

const [target, handleTarget, handleSubmit, errors, httpRequest] =
  useTargetHandler(
    { email: "", password: "" },
    {
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: { required: true, minLength: 6 },
    },
    { storageType: "session", storageKey: "loginForm" },
    { enableCSRF: true, rateLimit: 3000 },
    useHttpRequest // ← Habilita funcionalidades HTTP
  );

// Acceso a funcionalidades HTTP
const {
  apiCall, // Llamadas a la API
  apiResponse, // Respuesta de la última llamada
  isLoading, // Estado de carga
  error, // Errores HTTP
  SentryError, // Logging de errores
  SentryInfo, // Logging de información
} = httpRequest;
```

### Variables de Entorno (Modo HTTP)

```bash
# Vite
VITE_API_URL=https://api.ejemplo.com

# Create React App
REACT_APP_API_URL=https://api.ejemplo.com
```

> ⚠️ **Importante:** Reinicia el servidor de desarrollo después de modificar `.env`

---

## 📖 Ejemplos

### Ejemplo 1: Formulario de Login con HTTP

```typescript
import React from "react";
import { useTargetHandler } from "usetargethandler";
import { useHttpRequest } from "usehttprequest";

export function LoginForm() {
  const [target, handleTarget, handleSubmit, errors, httpRequest] =
    useTargetHandler(
      { email: "", password: "" },
      {
        email: {
          required: true,
          requiredMessage: "Email es requerido",
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          patternMessage: "Email inválido",
        },
        password: {
          required: true,
          minLength: 6,
          minLengthMessage: "Mínimo 6 caracteres",
        },
      },
      { storageType: "session", storageKey: "loginForm" },
      { enableCSRF: true, rateLimit: 3000 },
      useHttpRequest
    );

  const { apiCall, isLoading, error, apiResponse, SentryError, SentryInfo } =
    httpRequest;

  const onSubmit = async (data: typeof initialValues) => {
    try {
      SentryInfo("Intentando login", { email: data.email });

      await apiCall("POST", "/auth/login", data);

      if (apiResponse) {
        localStorage.setItem("token", apiResponse.token);
        window.location.href = "/dashboard";
      }

      if (error) {
        SentryError("Error en login", error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={target.email}
          onChange={handleTarget}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={target.password}
          onChange={handleTarget}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>

      {error && <div className="error">Error: {error.message}</div>}
    </form>
  );
}
```

### Ejemplo 2: Formulario Completo de Registro

```typescript
import { useTargetHandler } from "usetargethandler";

export function RegisterForm() {
  const [target, handleTarget, handleSubmit, errors] = useTargetHandler(
    {
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      terms: false,
      ciudad: "",
    },
    {
      nombre: {
        required: true,
        requiredMessage: "El nombre es obligatorio",
        pattern: /^[a-zA-Z\s]+$/,
        patternMessage: "Solo letras permitidas",
        minLength: 2,
        maxLength: 50,
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: "Email inválido",
      },
      password: {
        required: true,
        minLength: 8,
        minLengthMessage: "Mínimo 8 caracteres",
      },
      confirmPassword: {
        required: true,
        matches: "password",
        matchMessage: "Las contraseñas no coinciden",
      },
      age: {
        required: true,
        min: 18,
        max: 99,
        requiredMessage: "Debes ser mayor de 18 años",
      },
      terms: {
        checked: true,
        checkedMessage: "Debes aceptar los términos",
      },
      ciudad: {
        selected: true,
        selectedMessage: "Selecciona una ciudad",
      },
    },
    { storageType: "local", storageKey: "registerForm" },
    { enableCSRF: true, rateLimit: 3000 }
  );

  const onSubmit = (data) => {
    console.log("Registro exitoso:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="nombre"
        value={target.nombre}
        onChange={handleTarget}
        placeholder="Nombre completo"
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <input
        type="email"
        name="email"
        value={target.email}
        onChange={handleTarget}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

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
        placeholder="Confirmar contraseña"
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

      <select name="ciudad" value={target.ciudad} onChange={handleTarget}>
        <option value="">Selecciona una ciudad</option>
        <option value="madrid">Madrid</option>
        <option value="barcelona">Barcelona</option>
        <option value="valencia">Valencia</option>
      </select>
      {errors.ciudad && <span>{errors.ciudad.message}</span>}

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
}
```

### Métodos HTTP - Casos de Uso Reales

#### GET - Obtener Datos

```typescript
// Obtener lista de usuarios con paginación
const fetchUsers = async (page = 1, limit = 10) => {
  await apiCall("GET", `/users?page=${page}&limit=${limit}`);
  if (apiResponse) {
    console.log("Usuarios:", apiResponse.data);
    console.log("Total:", apiResponse.total);
  }
};

// Buscar usuarios con filtros
const searchUsers = async (searchTerm: string) => {
  await apiCall(
    "GET",
    `/users/search?q=${encodeURIComponent(searchTerm)}&status=active`
  );
};

// Obtener detalle de un usuario específico
const getUserById = async (userId: string) => {
  await apiCall("GET", `/users/${userId}`);
};
```

#### POST - Crear Recursos

```typescript
// Crear nuevo usuario con validación
const createUser = async (formData: typeof target) => {
  await apiCall("POST", "/users", {
    name: formData.name,
    email: formData.email,
    role: "user",
    metadata: {
      createdAt: new Date().toISOString(),
      source: "web",
    },
  });

  if (apiResponse) {
    console.log("Usuario creado:", apiResponse.id);
    // Redirigir o mostrar mensaje de éxito
  }
};

// Subir archivo con FormData
const uploadAvatar = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("userId", userId);

  await apiCall("POST", "/upload/avatar", formData);
};

// Login con credenciales
const login = async () => {
  await apiCall("POST", "/auth/login", {
    email: target.email,
    password: target.password,
    rememberMe: true,
  });

  if (apiResponse?.token) {
    localStorage.setItem("authToken", apiResponse.token);
    window.location.href = "/dashboard";
  }
};
```

#### PUT - Actualizar Completamente

```typescript
// Actualizar perfil completo del usuario
const updateUserProfile = async (userId: string) => {
  await apiCall("PUT", `/users/${userId}`, {
    name: target.name,
    email: target.email,
    phone: target.phone,
    address: {
      street: target.street,
      city: target.city,
      country: target.country,
    },
    preferences: {
      language: "es",
      notifications: true,
    },
  });
};
```

#### PATCH - Actualizar Parcialmente

```typescript
// Actualizar solo el email del usuario
const updateEmail = async (userId: string, newEmail: string) => {
  await apiCall("PATCH", `/users/${userId}`, {
    email: newEmail,
  });
};

// Cambiar estado de un pedido
const updateOrderStatus = async (orderId: string, status: string) => {
  await apiCall("PATCH", `/orders/${orderId}`, {
    status,
    updatedAt: new Date().toISOString(),
  });
};

// Activar/desactivar usuario
const toggleUserStatus = async (userId: string, isActive: boolean) => {
  await apiCall("PATCH", `/users/${userId}/status`, {
    isActive,
  });
};
```

#### DELETE - Eliminar Recursos

```typescript
// Eliminar usuario con confirmación
const deleteUser = async (userId: string) => {
  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    await apiCall("DELETE", `/users/${userId}`);

    if (!error) {
      console.log("Usuario eliminado exitosamente");
      // Actualizar lista o redirigir
    }
  }
};

// Eliminar múltiples elementos
const deleteBatch = async (userIds: string[]) => {
  await apiCall("DELETE", "/users/batch", {
    ids: userIds,
  });
};

// Soft delete (marcar como eliminado)
const softDeleteUser = async (userId: string) => {
  await apiCall("PATCH", `/users/${userId}`, {
    deletedAt: new Date().toISOString(),
    isDeleted: true,
  });
};
```

#### Ejemplo Completo: Sistema de Paginación

```typescript
import { useState, useEffect } from "react";
import { useTargetHandler } from "usetargethandler";
import { useHttpRequest } from "usehttprequest";

export function UsersList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [target, handleTarget, handleSubmit, errors, httpRequest] =
    useTargetHandler(
      { search: "" },
      {},
      {},
      { enableCSRF: true, rateLimit: 2000 },
      useHttpRequest
    );

  const { apiCall, isLoading, apiResponse } = httpRequest;

  // Cargar usuarios al montar o cambiar página
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (currentPage: number) => {
    await apiCall(
      "GET",
      `/users?page=${currentPage}&limit=20&sort=createdAt:desc`
    );

    if (apiResponse) {
      setUsers(apiResponse.data);
      setTotalPages(Math.ceil(apiResponse.total / 20));
    }
  };

  // Buscar usuarios con debounce
  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.length > 2) {
      await apiCall("GET", `/users/search?q=${encodeURIComponent(searchTerm)}`);
      if (apiResponse) {
        setUsers(apiResponse.data);
      }
    } else if (searchTerm.length === 0) {
      fetchUsers(page);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={target.search}
        onChange={(e) => {
          handleTarget(e);
          handleSearch(e.target.value);
        }}
        placeholder="Buscar usuarios..."
      />

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || isLoading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
```

---

## 🔷 Validación con Zod

### Ejemplo 3: Formulario con Zod

Zod viene incluido en el paquete, sin instalación adicional.

```typescript
import { useTargetHandler, z } from "usetargethandler";

// Define el schema de validación
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
      .regex(/[A-Z]/, "Debe contener una mayúscula")
      .regex(/[0-9]/, "Debe contener un número"),
    confirmPassword: z.string(),
    age: z.number().min(18, "Mayor de 18 años").max(99),
    terms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// TypeScript infiere tipos automáticamente
type RegistroForm = z.infer<typeof registroSchema>;

export function FormularioZod() {
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

  const onSubmit = async (data: RegistroForm) => {
    console.log("Datos validados:", data);
    // data.email está en minúsculas automáticamente
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        value={target.email}
        onChange={handleTarget}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="text"
        name="username"
        value={target.username}
        onChange={handleTarget}
        placeholder="Usuario"
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
        Acepto los términos
      </label>
      {errors.terms && <span>{errors.terms.message}</span>}

      <button type="submit">Registrarse</button>
    </form>
  );
}
```

### Ventajas de Zod

- ✅ **Sin instalación adicional** - Incluido en el paquete
- ✅ **Detección automática** - El hook reconoce schemas de Zod
- ✅ **Transformaciones** - Convierte datos automáticamente
- ✅ **Validaciones complejas** - `.refine()` para lógica custom
- ✅ **Inferencia de tipos** - TypeScript automático con `z.infer`
- ✅ **Validación cross-field** - Comparar múltiples campos

---

## 📚 API Reference

### Hook Signature

```typescript
useTargetHandler<T>(
  initialValues: T,
  validationRules: ValidationRules<T> | ZodSchema<T>,
  storageOptions?: StorageOptions,
  securityOptions?: SecurityOptions,
  httpHook?: typeof useHttpRequest
): [
  target: T,
  handleTarget: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (callback: (data: T) => void) => (e: FormEvent) => void,
  errors: ValidationErrors<T>,
  httpRequest?: HttpRequestReturn
]
```

### Parámetros

#### `initialValues: T`

Valores iniciales del formulario.

```typescript
{ email: "", password: "", age: 0 }
```

#### `validationRules: ValidationRules<T> | ZodSchema<T>`

Reglas de validación nativas o schema de Zod.

**ValidationRules:**

```typescript
{
  email: {
    required: true,
    requiredMessage: "Email requerido",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Email inválido"
  },
  password: {
    required: true,
    minLength: 8,
    minLengthMessage: "Mínimo 8 caracteres",
    maxLength: 100
  },
  age: {
    min: 18,
    max: 99
  },
  terms: {
    checked: true,
    checkedMessage: "Debes aceptar los términos"
  },
  confirmPassword: {
    matches: "password",
    matchMessage: "Las contraseñas no coinciden"
  }
}
```

**Zod Schema:**

```typescript
z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

#### `storageOptions?: StorageOptions`

```typescript
{
  storageType: "local" | "session" | "none",  // default: "none"
  storageKey: string                          // default: "formData"
}
```

#### `securityOptions?: SecurityOptions`

```typescript
{
  enableCSRF: boolean,   // default: false
  rateLimit: number      // milliseconds, default: 1000
}
```

#### `httpHook?: typeof useHttpRequest`

Hook opcional para funcionalidades HTTP.

### Valores de Retorno

#### `target: T`

Estado actual del formulario.

#### `handleTarget: (e: ChangeEvent) => void`

Manejador de cambios para inputs.

#### `handleSubmit: (callback) => (e: FormEvent) => void`

Manejador de envío del formulario con validación.

#### `errors: ValidationErrors<T>`

Objeto con errores de validación.

```typescript
{
  email?: { message: string },
  password?: { message: string }
}
```

#### `httpRequest?: HttpRequestReturn`

Funcionalidades HTTP (si se pasa `useHttpRequest`).

```typescript
{
  apiCall: (method, endpoint, data?) => Promise<void>,
  apiResponse: any,
  error: Error | null,
  isLoading: boolean,
  userFound: boolean,
  SentryError: (message, context) => void,
  SentryWarning: (message, context) => void,
  SentryInfo: (message, context) => void,
  SentryEvent: (event, context) => void
}
```

---

## 🔒 Seguridad

### Resumen de Protecciones

| Amenaza           | Protección Frontend | Nivel | Requiere Backend |
| ----------------- | ------------------- | ----- | ---------------- |
| **XSS**           | ✅ DOMPurify        | Alto  | ⚠️ Recomendado   |
| **CSRF**          | ⚠️ Header Token     | Medio | ✅ Obligatorio   |
| **SQL Injection** | ❌ No protege       | N/A   | ✅ Obligatorio   |

### Protección XSS

El hook usa **DOMPurify** para sanitizar inputs de tipo `text`, `email`, `tel`, `url`.

**Elimina:**

- Tags `<script>` y contenido malicioso
- Event handlers (`onerror`, `onload`, `onclick`)
- JavaScript protocol (`javascript:`, `data:` URIs)
- Inyecciones SVG/XML

**Campos NO sanitizados:**

- `password`, `number`, `textarea`, `select`

**Mejores Prácticas:**

1. Sanitizar también en el backend
2. Usar Content Security Policy (CSP)
3. Escapar al renderizar HTML

### Protección CSRF

Con `enableCSRF=true`, el hook incluye automáticamente el token CSRF en headers `X-CSRF-Token`.

**Requiere configuración backend:**

```javascript
// Express.js
import csrf from "csurf";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(
  csrf({
    cookie: {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    },
  })
);

app.get("/api/csrf-token", (req, res) => {
  res.cookie("csrfToken", req.csrfToken());
  res.json({ success: true });
});
```

### SQL Injection

⚠️ **El frontend NO previene SQL injection**. Debe implementarse en el backend:

```javascript
// ✅ CORRECTO - Prepared statement
db.query("SELECT * FROM users WHERE email = ?", [email]);

// ❌ VULNERABLE
db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

**Usa:**

- Prepared Statements
- ORMs (Sequelize, Prisma, TypeORM)
- Validación y escape en servidor

### Checklist de Seguridad

**Frontend:**

- [x] Sanitización XSS (DOMPurify)
- [x] Token CSRF en headers
- [x] Rate limiting
- [x] Validación de inputs

**Backend:**

- [ ] Validar tokens CSRF
- [ ] Prepared statements / ORMs
- [ ] Sanitizar inputs
- [ ] HTTPS en producción
- [ ] CORS configurado
- [ ] Rate limiting en servidor

### Recursos

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

---

## 💡 Mejores Prácticas

### Validación

- ✅ Usa Zod para validaciones complejas
- ✅ Combina validación frontend y backend
- ✅ Mensajes de error claros y específicos
- ✅ Valida en tiempo real para mejor UX

### Seguridad

- ✅ Habilita CSRF para formularios mutantes
- ✅ Configura rate limiting apropiado
- ✅ Sanitiza inputs en backend también
- ✅ Usa HTTPS en producción

### Rendimiento

- ✅ Usa `storageType: "session"` para formularios temporales
- ✅ Limpia localStorage periódicamente
- ✅ Debounce validaciones costosas si es necesario

### TypeScript

- ✅ Define interfaces para tus formularios
- ✅ Usa `z.infer` con Zod para inferencia automática
- ✅ Tipifica callbacks de submit

---

## 🔗 Enlaces

- **[CHANGELOG](./CHANGELOG.md)** - Historial de versiones
- **[FUNCTIONALITY](./FUNCTIONALITY.md)** - Documentación detallada de características
- **[TYPESCRIPT MIGRATION](./TYPESCRIPT_MIGRATION.md)** - Guía de migración a TypeScript
- **[NPM Package](https://www.npmjs.com/package/usetargethandler)** - Ver en npm
- **[GitHub Repository](https://github.com/GianfrancoD/useTargetHandler)** - Código fuente

---

## 📝 Licencia

Este proyecto está licenciado bajo los términos especificados en el repositorio.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, consulta el repositorio para más detalles.

---

<div align="center">

**[⬆ Volver arriba](#UseTargetHandler)**

Hecho con ❤️ para la comunidad React

</div>
