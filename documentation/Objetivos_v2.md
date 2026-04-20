# Objetivos y Alcance del Proyecto - Versión 2

Este archivo es la actualización de los objetivos originalmente planteados en la versión 1.

## Pregunta Problema Actualizada

¿Cómo puede una agencia o empresa gestionar integralmente sus redes sociales, automatizar respuestas con Inteligencia Artificial, y mantener una trazabilidad (Auditoría / RBAC) eficiente utilizando una misma plataforma?

## Objetivo General

Desarrollar una aplicación SaaS (Software as a Service) orientada a empresas y analistas que automatice y centralice el flujo de publicaciones, respuestas con IA para PQRS y otras interacciones en redes sociales. 

La plataforma utilizará una arquitectura sólida basada en NestJS, Prisma y React, enfocada en la facilidad de integrar cuentas externas (como Facebook/Instagram).

## Objetivos Específicos

1. **Arquitectura Escalable**: Desplegar la plataforma sobre AWS usando principios de "Infrastructure as Code" (IaC) e integrando SQS para colas asíncronas y Dead-Letter Queues.
2. **Dashboard Integral y Dashboard Social**: Diseñar un Frontend amigable en React (Tailwind v4) con flujos definidos para conectar fácilmente recursos como las Cuentas Profesionales de Meta (OAuth Facebook).
3. **Enterprise RBAC**: Implementar Roles y Controles de Acceso desde el día número cero para aislar a los administradores, clientes y agentes / roles específicos de empresas bajo un esquema Lógico Multi-Tenant.
4. **Log y Auditorías**: Garantizar la creación de Registros de Auditoría inmutables ("Append-Only") exigibles por autoridades regulatorias, evitando la manipulación de estados.
5. **AI Orquestación**: Incorporar promps como código, uso de integraciones de LLM tolerantes a fallas (patrones Fail-Open) y desinfección de Información de Identidad Personal (PII).
