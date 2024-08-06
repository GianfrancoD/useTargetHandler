# 📝 Changelog

Todas las novedades de este proyecto se documentan en este archivo.

## [Unreleased]

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
