## Versión 1.2.5 - 2024-08-15

### Nuevas Características ✨

- **Integración Mejorada con Sentry**:
  - Se han añadido nuevos parámetros en el hook `useTargetHandler` para registrar advertencias, errores, información y eventos específicos en Sentry durante el proceso de envío de formularios. Esto mejora el seguimiento de problemas y la depuración de errores en la aplicación.
  - Los parámetros incluyen:
    - `SentryWarning`: Para registrar advertencias.
    - `SentryError`: Para registrar errores.
    - `SentryInfo`: Para registrar información relevante.
    - `SentryEvent`: Para registrar eventos específicos.

#### Mejoras 🔧

- **Manejo de Estado `isLoading`**:
  - Se ha implementado el estado `isLoading` en el hook `useTargetHandler`, lo que permite deshabilitar el botón de envío y mostrar un indicador de carga mientras se procesa la solicitud. Esto mejora la experiencia del usuario al proporcionar retroalimentación visual durante el envío del formulario.

---

### Notas

- **Instrucciones de Actualización**: Para actualizar a la versión 1.2.5, utiliza el siguiente comando:
  ```bash
  npm install usetargethandler@latest
  ```
  ```bash
  npm update usetargethandler
  ```

---

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

## [1.4.0] - 2024-10-21

### 🔷 ZOD INTEGRADO ✨

#### ✨ Nueva Funcionalidad Principal

- **Zod Incluido en el Paquete**: Zod ahora viene integrado, no necesitas instalarlo por separado
  - Importa `z` directamente desde `usetargethandler`
  - Detección automática de schemas de Zod
  - Conversión automática de errores al formato de useTargetHandler
  - Soporte completo para validaciones complejas con `.refine()`
  - Transformaciones de datos con `.transform()`
  - Inferencia de tipos automática con `z.infer<typeof schema>`

#### 📝 Cambios en la API

- **Nueva forma de importar con Zod**:
  ```typescript
  import { useTargetHandler, z } from "usetargethandler";
  ```
- **Detección automática**: El hook detecta si le pasas un schema de Zod o ValidationRules
- **Sin breaking changes**: ValidationRules nativas siguen funcionando igual

### 🔒 MEJORAS DE SEGURIDAD

#### ✨ Nuevas Funcionalidades de Seguridad

- **DOMPurify Integration**: Sanitización XSS robusta reemplazando regex básicos
  - Protección contra `<script>` tags y variantes
  - Eliminación de event handlers maliciosos (`onerror`, `onload`, `onclick`, etc.)
  - Prevención de JavaScript protocol (`javascript:`, `data:` URIs)
  - Bloqueo de inyecciones SVG/XML
  - Configuración estricta: sin tags HTML ni atributos permitidos

#### 🔄 Dependencias

- **Zod**: Ahora incluido como dependencia del paquete
- **DOMPurify**: Requerida para sanitización

#### 🛠️ Mejoras Técnicas

- Función `sanitizeInput` completamente reescrita con DOMPurify
- Código refactorizado con `import` en lugar de `require`
- Eliminación de comentarios innecesarios para código más limpio
- Documentación JSDoc detallada en `sanitizeInput`
- Configuración DOMPurify optimizada para máxima seguridad
- Types actualizados para `usehttprequest` module

#### 📚 Documentación

- **Nueva sección**: "Guía de Seguridad" completa en README
- **Actualizado**: Descripciones de protecciones CSRF, XSS y SQL Injection
- **Agregado**: Tabla comparativa de amenazas y protecciones
- **Agregado**: Ejemplos de configuración backend segura
- **Agregado**: Links a recursos OWASP

#### ⚠️ Clarificaciones Importantes

- README ahora especifica claramente que:
  - XSS: Protección alta en frontend, recomendado también en backend
  - CSRF: Requiere configuración obligatoria en backend
  - SQL Injection: NO se protege en frontend, solo backend

#### 🔧 Dependencies

- **Agregado**: `dompurify@^3.3.0` (sanitización XSS)
- **Actualizado**: `usehttprequest@^1.0.0` (hook real sin mocks)

#### 🔄 Compatibilidad

- **Dual package**: Funciona tanto en proyectos JavaScript como TypeScript
- **Zero-config**: No requiere configuración adicional para ninguno de los dos lenguajes
- **Type definitions**: Incluye archivos `.d.ts` para autocompletado en editores
- **Backward compatible**: Actualización sin breaking changes para usuarios de v1.3.0

---

## [1.3.0] - 2024-10-20

### 🎉 MIGRACIÓN A TYPESCRIPT ✨

#### ✨ Nuevas Funcionalidades

- **Soporte completo para TypeScript**: El paquete ahora está escrito en TypeScript y proporciona definiciones de tipos completas
- **Dual Package Support**: Funciona tanto con JavaScript como TypeScript sin configuración adicional
- **Tipos exportados**: Todas las interfaces y tipos están disponibles para importación
  - `ValidationRule`, `ValidationRules`
  - `StorageConfig`, `SecurityConfig`
  - `FormErrors`, `FormValues`
  - `UseTargetHandlerReturn`, `UseHttpRequestReturn`
- **IntelliSense mejorado**: Autocompletado completo en editores compatibles con TypeScript
- **Type safety**: Validación de tipos en tiempo de desarrollo

#### 🔄 Cambios Breaking

- **Exportación cambiada a named export**: Ahora se debe usar `import { useTargetHandler } from 'usetargethandler'` en lugar de `import useTargetHandler from 'usetargethandler'`
- **useHttpRequest ahora es opcional**: Se utiliza un mock por defecto si no está instalado, evitando errores de dependencias

#### 🛠️ Mejoras Técnicas

- Compilación con TypeScript hacia JavaScript estándar
- Generación automática de archivos `.d.ts` para definiciones de tipos
- Estructura de build optimizada en carpeta `dist/`
- Source maps incluidos para debugging
- Configuración de `tsconfig.json` optimizada para librerías

#### 🐛 Correcciones

- **Corregido**: Import incorrecto en `App.jsx` (`useTargetHandlerTS` → `useTargetHandler`)
- **Corregido**: PropTypes incorrectamente definidos (eliminados en favor de TypeScript)
- **Corregido**: Llamada condicional a React Hooks violando reglas de React
- **Agregado**: Dependencia `usehttprequest` declarada explícitamente

#### 📚 Documentación

- **Nuevo**: `TYPESCRIPT_MIGRATION.md` - Guía completa de uso con TypeScript
- **Nuevo**: `PUBLISH.md` - Documentación para publicación y actualización en npm
- **Actualizado**: `README.md` con ejemplos de TypeScript
- **Actualizado**: `package.json` con configuración dual package

#### 🔧 Configuración

- `.gitignore` actualizado para excluir archivos compilados
- `.npmignore` creado para controlar archivos publicados
- `tsconfig.json` y `tsconfig.build.json` agregados
- Scripts de npm actualizados:
  - `build`: Compila TypeScript
  - `clean`: Limpia archivos compilados
  - `type-check`: Verifica tipos sin compilar
  - `prepublishOnly`: Build automático antes de publicar

#### 📦 Package.json Changes

- `main`, `module`, `types`, `exports` actualizados para dual package
- `peerDependencies` definidas (React >= 16.8.0)
- `files` array agregado para control de publicación
- Dependencias movidas a `devDependencies` correctamente

#### 🚀 Recomendaciones

Se recomienda actualizar a la versión 1.3.0 para obtener:

- Soporte completo de TypeScript
- Mejor experiencia de desarrollo con IntelliSense
- Type safety en tus formularios
- Compatibilidad hacia atrás con JavaScript

#### ⚠️ Notas de Migración

Si vienes de versiones anteriores, cambia la importación:

```javascript
// Antes
import useTargetHandler from "usetargethandler";

// Ahora
import { useTargetHandler } from "usetargethandler";
```

---

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

---

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
