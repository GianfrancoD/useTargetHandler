## [1.2.4] - 2024-08-10

### ✨ Mejoras y Nuevas Funcionalidades 🚀

#### 🌟 Limitación de Tasa (Rate Limiting)
- **Descripción**: Se ha implementado una funcionalidad de limitación de tasa que previene el envío excesivo de solicitudes en un corto período de tiempo.
- **Funcionalidad**: Ahora puedes establecer un intervalo de tiempo mínimo entre envíos de formularios, lo que mejora la experiencia del usuario y la estabilidad del servidor.
- **Uso**: Ajusta el parámetro `rateLimit` al utilizar el hook para definir el tiempo de espera entre envíos, evitando la sobrecarga del servidor y mejorando la gestión de formularios.

#### 🛡️ Sanitización de Entradas
- **Descripción**: La función de sanitización de entradas ha sido mejorada para proteger contra ataques de inyección de código.
- **Funcionalidad**: La función `sanitizeInput` ahora elimina etiquetas HTML y scripts potencialmente dañinos de los valores de entrada, asegurando que solo se almacenen datos limpios y seguros.
- **Impacto**: Esto es crucial para prevenir ataques de Cross-Site Scripting (XSS), garantizando que los datos procesados en el frontend no contengan contenido malicioso.

#### 🚫 Protección contra Inyecciones SQL
- **Descripción**: Se ha implementado una sanitización de entradas que ayuda a prevenir inyecciones SQL.
- **Funcionalidad**: Asegura que los datos enviados a las API estén debidamente filtrados, lo que es especialmente importante al trabajar con APIs que pueden realizar operaciones de base de datos.
- **Impacto**: Mejora la seguridad general de la aplicación al proteger contra posibles vulnerabilidades, asegurando que las entradas de los usuarios no comprometan la integridad de la base de datos.

### 📚 Documentación
- **Documentación Actualizada**: Se han agregado ejemplos claros en la documentación para facilitar la implementación de las nuevas funcionalidades de seguridad y gestión de formularios.

### 🐛 Correcciones
- Se realizaron diversas correcciones menores para mejorar la estabilidad y el rendimiento del hook.

### 🚀 Recomendaciones
Se recomienda a todos los usuarios actualizar a la versión 1.2.4 para aprovechar las mejoras en la seguridad, la gestión de formularios y la protección contra inyecciones SQL.

-----

## [1.2.2] - 2024-08-07
### ✨ Mejorado
- **Validación de Edad**: Se ha mejorado la validación de la edad en el hook `useTargetHandler`. Ahora se verifica que el valor de la edad sea un número y esté dentro del rango especificado.

- **Manejo de Errores en el Envío**: Se ha agregado un mejor manejo de errores en la parte donde se envían los datos en `handleSubmit`. Ahora se capturan y manejan adecuadamente los errores que puedan ocurrir durante el proceso de envío.

- **Optimización de Validaciones**: Se han dividido las validaciones en funciones más pequeñas para cada tipo de validación, mejorando la legibilidad y mantenibilidad del código.

### 📚 Documentación
- **Documentación Actualizada**: Se han agregado ejemplos claros en la documentación para facilitar la implementación de las mejoras en la validación de edad y el manejo de errores en el envío.

### 🐛 Correcciones
- Se realizaron diversas correcciones menores para mejorar la estabilidad y el rendimiento del hook.

### 🚀 Recomendaciones
Se recomienda a todos los usuarios actualizar a la versión 1.2.2 para aprovechar las mejoras en la validación de edad, el manejo de errores en el envío y la optimización de las validaciones.

---

## [1.2.1] - 2024-08-06
### ✨ Mejorado
- **Declaración de Variables de Entorno en la Nube**: Se ha añadido la capacidad de declarar variables de entorno directamente en la nube, permitiendo una configuración más flexible y segura de la aplicación.
  
- **Integración con `useHttpRequest`**: `useTargetHandler` ahora se integra de manera más efectiva con el hook `useHttpRequest`, permitiendo realizar llamadas a la API directamente desde el formulario y gestionar las respuestas adecuadamente.

- **Función de Validación Mejorada**: La función ha sido optimizada para manejar múltiples tipos de validaciones, incluyendo:
  - Validaciones de longitud mínima y máxima.
  - Validaciones de patrones de expresión regular.
  - Coincidencias entre campos.
  - Mensajes de error personalizados para cada regla.

### 📚 Documentación
- **Documentación Actualizada**: Se han agregado ejemplos claros en la documentación para facilitar la implementación de las nuevas características de validación y el uso de variables de entorno.

### 🐛 Correcciones
- Se realizaron diversas correcciones menores para mejorar la estabilidad y el rendimiento del hook.

### 🚀 Recomendaciones
Se recomienda a todos los usuarios actualizar a la versión 1.2.1 para aprovechar las nuevas funcionalidades de validación, la integración con `useHttpRequest` y la capacidad de declarar variables de entorno en la nube.

---

## [1.2.0] - 2024-08-03
### ✨ Mejorado
- **Nuevas Validaciones**: Se han agregado propiedades de validación para los campos del formulario, mejorando la funcionalidad y la experiencia del usuario.

### 📚 Documentación
- **Documentación Actualizada**: Se han agregado ejemplos claros en la documentación para facilitar la implementación de las nuevas características de validación.

### 🐛 Correcciones
- Se realizaron diversas correcciones menores para mejorar la estabilidad y el rendimiento del hook.

### 🚀 Recomendaciones
Se recomienda a todos los usuarios actualizar a la versión 1.2.0 para aprovechar las nuevas funcionalidades de validación.

---

## [1.1.0] - 2024-08-02
### ✨ Mejorado
- **Validaciones Personalizadas**: Se ha implementado la capacidad de definir propiedades de validación para los campos del formulario, mejorando la experiencia del usuario.

### 📚 Documentación
- **Documentación Actualizada**: Se han agregado ejemplos claros en la documentación para facilitar la implementación de las nuevas características de validación.

### 🐛 Correcciones
- Se realizaron diversas correcciones menores para mejorar la estabilidad y el rendimiento del hook.

### 🚀 Recomendaciones
Se recomienda a todos los usuarios actualizar a la versión 1.1.0 para aprovechar las mejoras en la validación.

---

## [1.0.27] - 2024-07-29
### ✨ Mejorado
- **Persistencia del Estado**: Se implementó la capacidad de guardar el estado del formulario en `localStorage` o `sessionStorage`.

### Cambios en la API
- **Cambio en la Firma de `useTargetHandler`**: Se modificó la firma de la función para incluir un nuevo parámetro `storageType`.

---

## [1.0.26] - 2024-07-26
### ✨ Mejorado
- **Manejo de Errores**: Se mejoró el manejo de errores en el hook `useTargetHandler`.

---

## [1.0.10] - 2024-07-24
### ➕ Agregado
- **Prueba de versión**: Se realizaron pruebas exhaustivas de la nueva funcionalidad.

---

## [1.0.9] - 2024-07-24
### ➕ Agregado
- **Soporte para validación avanzada de formularios**: Implementa un sistema de validación más robusto.

### ✨ Mejorado
- **Mejoras en el manejo de errores**: Implementa un mejor manejo de errores en el hook.

---

## [1.0.8] - 2024-07-20
### 🐛 Corregido
- Solución de errores en la gestión de eventos en el hook `useTargetHandler`.

---

## [1.0.7] - 2024-07-15
### ➕ Agregado
- Implementación de soporte para manejar formularios más complejos.

---

## [1.0.6] - 2024-07-10
### 🐛 Corregido
- Corrección de errores en la lógica de reinicio del estado en `handleSubmit`.

---

## [1.0.5] - 2024-07-05
### ➕ Agregado
- Implementación de un sistema de validación básica para los inputs del formulario.

---

## [1.0.4] - 2024-06-30
### 🐛 Corregido
- Corrección de errores menores en la gestión de eventos de entrada.

---

## [1.0.3] - 2024-06-25
### ➕ Agregado
- Mejora en la documentación del código y ejemplos de uso.

---

## [1.0.2] - 2024-06-20
### ➕ Agregado
- Soporte para manejar múltiples campos en el estado del formulario.

---

## [1.0.1] - 2024-06-15
### ➕ Agregado
- Primera versión del hook `useTargetHandler`.

---

## [1.0.0] - 2024-06-10
### ➕ Agregado
- Creación inicial del hook `useTargetHandler`.
