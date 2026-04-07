# Notas Finales

Calculadora académica que determina la nota necesaria en el examen final para aprobar la carrera.

## Tecnologías

- Angular 17 (standalone components)
- Reactive Forms
- Bootstrap 5.3
- Bootstrap Icons 1.11

## Funcionalidades

- Ingreso de datos del estudiante (nombre y carrera)
- 3 ramos con sus notas:
  - Ramos 1 y 2: 3 notas → calcula promedio
  - Ramo 3: 2 notas → calcula la nota necesaria en el examen final
- Calcula qué nota necesitas en la nota 3 del ramo 3 para que el **promedio general** alcance la nota de aprobación
- Alerta verde si aún es posible aprobar
- Alerta roja si ya no es posible aprobar la carrera

## Instalación

```bash
npm install
```

## Desarrollo

```bash
ng serve
```

Abrir `http://localhost:4200`

## Tests

```bash
ng test
```

Cobertura: 100% (statements, branches, functions, lines)
