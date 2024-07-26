# Changelog

Todas las novedades de este proyecto se documentan en este archivo.

## [Unreleased]

## [1.0.10] - 2024-07-24
### Agregado
- **Prueba de versión**: Se realizaron pruebas exhaustivas de la nueva funcionalidad y se ajustaron detalles menores en el código.

## [1.0.9] - 2024-07-24
### Agregado
- **Soporte para validación avanzada de formularios**: Implementa un sistema de validación más robusto que permite validar múltiples campos al mismo tiempo, mostrar mensajes de error personalizados y manejar validaciones asíncronas.

### Mejorado
- **Mejoras en el manejo de errores**: Implementa un mejor manejo de errores en el hook, permitiendo a los usuarios manejar errores de forma personalizada y proporcionar mensajes de error más significativos.
- **Rendimiento optimizado**: Realiza optimizaciones en la lógica del hook para mejorar el rendimiento, especialmente en formularios grandes o con múltiples campos.
- **Documentación actualizada**: Actualiza la documentación del hook para incluir información sobre las nuevas características, ejemplos de uso y casos de uso avanzados.

### Corregido
- **Corrección de errores en la gestión de formularios anidados**: Soluciona cualquier problema que pueda surgir al usar el hook en formularios anidados o en componentes reutilizables.
- **Mejora en la gestión de eventos de formulario**: Ajusta la lógica del hook para manejar de manera más robusta los eventos de formulario, como el envío del formulario y el restablecimiento del estado.

## [1.0.8] - 2024-07-20
### Corregido
- Solución de errores en la gestión de eventos en el hook `useTargetHandler`.
- Mejora en la validación de los campos del formulario.

## [1.0.7] - 2024-07-15
### Agregado
- Implementación de soporte para manejar formularios más complejos.
- Mejora en la documentación sobre el uso de `handleSubmit`.

### Corregido
- Ajustes en la lógica de manejo de cambios en los inputs.

## [1.0.6] - 2024-07-10
### Corregido
- Corrección de errores en la lógica de reinicio del estado en `handleSubmit`.
- Mejora en la gestión de tipos de datos en el estado.

## [1.0.5] - 2024-07-05
### Agregado
- Implementación de un sistema de validación básica para los inputs del formulario.
- Mejora en la función `handleTarget` para permitir la gestión de múltiples inputs.

## [1.0.4] - 2024-06-30
### Corregido
- Corrección de errores menores en la gestión de eventos de entrada.
- Ajustes en la lógica de actualización del estado.

## [1.0.3] - 2024-06-25
### Agregado
- Mejora en la documentación del código y ejemplos de uso.
- Implementación de pruebas unitarias para garantizar la funcionalidad.

## [1.0.2] - 2024-06-20
### Agregado
- Soporte para manejar múltiples campos en el estado del formulario.
- Mejora en la función `handleSubmit` para incluir validaciones adicionales.

## [1.0.1] - 2024-06-15
### Agregado
- Primera versión del hook `useTargetHandler`.
- Funcionalidad básica para manejar el estado de formularios en componentes de React.
- Implementación de funciones para manejar cambios en los inputs y enviar datos.

## [1.0.0] - 2024-06-10
### Agregado
- Creación inicial del hook `useTargetHandler`.
- Soporte para la gestión de estado en formularios.
- Configuración básica y pruebas iniciales.
