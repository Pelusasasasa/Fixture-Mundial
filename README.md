# Repositorio del proyecto

https://github.com/Pelusasasasa/Fixture-Mundial

# Explicacion del proyecto

En este proyecto utilizamos una api externa gratuita para poder obtener los datos necesarios de cada una de las pantallas, por eso me veo limitado a que datos mostrar

Vamos a contar con 3 pantallas principales, ### Los partidos
Muestra todos los partidos de cada fecha del mundial, se puede filtrar por fecha

    ### Los Grupos
    Ordenadmos por Abecedario encontramos os grupos con sus selecciones en donde si tocamos una seleccion nos muestra que jugadores integran la seleccion

    ### My Equipo
    Pantalla que nos muestra que equipo favorito elegimos con informacion de su proximo partido y lambien los cards de los partidos

# Como Usar la app

    Puedes navegar por la app libremente entre las pantallas sin problemas e ir viendo la informacion basica

    En el Drawer lo que podemos hacer es cambiar el equipo favorito que elejimos y tambien vamos a ver menu de otras competencias que actualmente no funcionan, solo son a modo informativo.

# Comandos para Desarrollador

# Verificar que no hay errores

1. `npx expo-doctor`
2. `npx expo install --check`

# Subir a produccion Android

1. ejecutar `eas build:configure`
2. ejecutar `eas build --platform android --profile preview`

# Subir Actualizacion

1. Ejecutar `eas update --channel preview --message ""`
