# Aplicación de Criptomonedas

Una aplicación móvil para visualizar información relevante sobre criptomonedas.

## Características:

1. **Inicio de sesión:** Introduce un nombre de usuario para acceder al listado de criptomonedas.
2. **Listado de criptomonedas:** Muestra un listado de las principales criptomonedas. Permite filtrar por porcentaje de cambio en las últimas 24 horas.
3. **Gráfico en tiempo real:** Muestra el precio en tiempo real de una criptomoneda seleccionada en forma de gráfico de líneas.

## Pantallas:

1. **Pantalla de inicio de sesión:** 
   - Campo para introducir nombre de usuario.
   - Almacenamiento local del nombre de usuario.
   
2. **Pantalla de listado de criptomonedas:** 
   - Muestra las principales 40 criptomonedas.
   - Filtro de criptomonedas basado en el porcentaje de cambio en las últimas 24 horas.
   - Alerta de desconexión cuando no hay conexión a Internet.

3. **Pantalla de gráfico en tiempo real:** 
   - Gráfico de líneas mostrando los precios en tiempo real de una criptomoneda seleccionada.
   - Actualización del gráfico cada 30 segundos.
   - Alerta de desconexión cuando no hay conexión a Internet.

## Tecnologías y Librerías:

- React Native
- React Native SVG Charts
- CoinLore API

## Cómo correr el proyecto:

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Ejecutar `npm run android` o `npm run ios` para correr la aplicación en un emulador o dispositivo.

## Consideraciones:

- La aplicación es escalable y está diseñada para expandirse a un nivel empresarial en el futuro.
- La UI/UX sigue las mejores prácticas estándar de iOS y Android.

Desarrollado por [TuNombre].
