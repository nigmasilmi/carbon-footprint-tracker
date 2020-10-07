# forEach CO2Tracking

forEach CO2 Tracking es una aplicación web para facilitar el cálculo y seguimiento de la huella de carbono que producen los desplazamientos relacionados con las operaciones del banco forEach.

## Editorial del README

Esta documentación consta de 3 partes: Presentación del ideal MVP , Indicaciones para revisar la funcionalidad de la aplicación en el estado de entrega inicial, Journal de la desarrolladora.

En la primera parte se presenta el objetivo final del producto, su uso y accesibilidad. En la segunda, los pasos a seguir para verificar el estado en el que fue entregada la aplicación, y en la tercera se explica el approach, insight, y notas que explican el enfoque para desarrollar la aplicación, así como las dificultades y desafíos encontrados, se muestra en lenguaje un tanto informal (libertad tecno-literaria si se quiere :-)).

## Primera parte: Presentación del MVP ideal

### Accesibilidad

Con la finalidad de hacer disponible el sistema de tracking para todas las filiales asociadas, la aplicación se encontrará alojada en la plataforma Heroku y puede accederse a ella a través de su url.

### Uso

Puede hacer uso de la aplicación como usuario regular, colaborador, asociado o puede acceder a ella con el perfil de administrador.
En el primero de los casos, tendrá la opción de registrar sus viajes, con los detalles que permiten calcular automáticamente la huella de carbono que será generada. Puede tener acceso al historial de sus viajes, ya que son almacenados en una base de datos para su posterior consulta.
En el caso de acceder como administrador, puede revisar todos los viajes generados por cliente o persona y tener a disposición todos los detalles de los mismos, incluyendo la huella de carbono generada.

Para acceder como usuario regular, solo debe registrarse como nuevo usuario con su nombre, email y contraseña, sólo necesita registrarse una vez y puede volver a ingresar con sus datos.

Para acceder como administrador, en una primera instancia les serán otorgadas las credenciales especiales (usuario y contraseña -que luego puede modificar-), para convertirse en administrador debe hacer una solicitud directa a RRHH del Banco forEach, una vez aprobada recibirá las instrucciones via email, junto con un manual de uso cuyo contenido será de ayuda mientras se familiariza con la aplicación.

Registrar la huella de carbono de las actividades que se ejecutan en su organización es una manera de abordar la optimización de sus procesos, y al mismo tiempo la solidificación de su imagen de marca al convertirse en una institución amigable con el medio ambiente.

## Segunda parte: Indicaciones para verificar el estado actual de la aplicación

La aplicación consta de un frontend desarrollado en React y un backend desarrollado con Node.
El root del proyecto es el backend y el frontend se encuentra en la carpeta "client".

Para probar la aplicación es necesario hacer fork de este repositorio, o bien puede clonar o descargar su contenido como un archivo .zip
A continuación debe instalar sus dependencias desde la ubicación root del proyecto: folder/path forEachCO2Tracking

### Backend

El backend de esta aplicación comprende una API desarrollada para la el registro de viajes, con su data asociada y el cálculo automático de la huella de carbono generada.
Está desarrollado en Node, con mongoDB Atlas como su base de datos. El manejo de los uri de recursos es ejecutada con la ayuda de express y mongoose. La validación de la data con express-validator. Existen recursos protegidos que requieren el registro de usuario.

Para iniciar el backend haga uso del script node server.js desde la carpeta forEachCO2Tracking o bien si prefiere puede hacerlo con nodemon server.js lo que le permitirá mantener el servidor activo mientras ejecuta las acciones en él.

Dado que aún front/back no se encuentran acoplados funcionalmente, para probar los endpoints o recursos se recomienda hacer uso de http client como Postman, Insomnia o algún otro que sea su preferido.

1. Comience por iniciar el servidor

2. Observe en mensaje en la consola que le indica en qué puerto está corriendo el servidor, si no tiene un puerto definido en sus variables de ambiente, este tomará el puerto 5000, también le mostrará un mensaje de conexión a mongoDB Atlas, el cluster está configurado para permitir peticiones desde cualquier IP.

3. Acceda a cada endpoint desde su localhost:su puerto + ruta del recurso que quiere acceder

4. Comience por crear un usuario. Haga un request POST al endpoint localhost:su puerto/api/users, indique el body del request como application/json y envíe como contenido de este un JSON con "nombre", "email" y "password" como keys obligatorias. Si la petición es exitosa, recibirá como respuesta un JSON conteniendo un token de autenticación. Este tiene vigencia de 60 minutos, con el que puede consultar los demás recursos privados.
   ![Creación de usuario exitosa](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1602079864/forEachTest/api_users_post_aidods.png)

5. Para comprobar la persistencia de datos, puede hacer uso del recurso api/auth con una petición tipo GET, configure el header de la petición con la llave
   x-auth-token y el valor del token recibido en el paso 4. Si la petición es exitosa, recibirá como respuesta el usuario rescatado de la base de datos.
   ![Autenticación exitosa](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1602080304/forEachTest/api_auth_get_ss0ht2.png)

6. Como usuario puede registrar un viaje en la base de datos, este viaje estará asociado a su usuario y puede consultar posteriormente los viajes que ha registrado. Para ello, haga uso del recurso api/viajes con método POST. Aségurese de conservar el x-auth-token en la cabecera de la petición, y añada un cuerpo del tipo JSON con los valores que guste. Puede escoger entre los medios disponibles y es necesario que el string correspondiente sea uno de los siguientes:

- metro_subway
- auto_gasolina
- camioneta_diesel
- motocicleta_gasolina
- bus_transantiago
- bus_privado
- avion_chile
- avion_internacional
- caminando

A continuación un ejemplo:

```
{
"origen":"Providencia 123",
"destino":"La Reina 345",
"medio":"metro_subway",
"kms":20,
"numero_viajeros":2,
"ida_y_vuelta":true,
"fecha_viaje":"2020-10-06T23:05:42.506+00:00"
}
```

Si la petición es exitosa, recibirá como respuesta un JSON representativo del documento en la colección viajes.
![Registro de viaje exitoso](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1602081116/forEachTest/api_viajes_post_ox2g67.png)

7. También tiene a su disposición la consulta de sus viajes haciendo una petición GET api/viajes, o bien si su token se ha vencido (lo cual recibirá como respuesta en una petición al momento dado), puede generar uno nuevo accediendo a POST api/auth con su email y contraseña como parte del body en la petición. Requerde desactivar el x-auth-token en el header para esta operación.

### Frontend

El frontend en este momento está mostrando data estática contenida en el estado de Viajes y un formulario preliminar para el registro de los mismos.
Aún la funcionalidad del backend no se encuentra integrada a la interfaz de usuario.
Para probar las vistas disponibles en el frontend:

1. Aségurese de instalar las dependencias relativas al cliente. Para ello desde su terminal, ubíquese en la carpeta "client" y luego npm i
2. Inicie el frontend con
   `npm start --prefix client`
   o bien puede iniciar ambos servidores front y back con con la ayuda de concurrently, a través del script:
   `npm run dev`
   El levantamiento exitoso le mostrará la interfaz en http://localhost:3000
   En su terminal puede ver varias advertencias relativas a variables no utilizadas, corresponden a constantes no implementadas o variables indicadas preliminarmente para la integración de la funcionalidad backend. Sin embargo puede continuar con la visualización de la interfaz.
   ![Interfaz en el estado de entrega](https://res.cloudinary.com/dz3gm9c3w/image/upload/v1602081978/forEachTest/frontend_edom1f.png)

## Tercera parte: Journal de la desarrolladora

### Prioridad

Lo más importante que considero en cualquier proyecto es primero entenderlo y sobre todo entender su finalidad, qué problema resuelve o qué necesidad atiende. Por ello lo primero fue comprender el "alma" del proyecto y su objetivo.

Luego de ello, es importante saber con qué se cuenta y qué se sabe al punto de inicio del proyecto, así, analicé los requerimientos y al mismo tiempo me planteaba la estructura y diseño de la data, lo cual me lleva al siguiente apartado.

### El funcionamiento es ciudadano de primera clase

Estudiar y aprender a programar me ha hecho fan de la funcionalidad. Considero que lo más importante es que el producto que se quiere crear funcione como se espera, una vez consolidado, se puede dedicar tiempo a aquello que requiere mayor investigación y dedicación de tiempo, la experiencia de usuario y la interfaz que en conjunto con la funcionalidad permiten esa experiencia.
Lo dicho en el párrafo anterior es aplicable desde mi perspectiva y en proyectos individuales. Sin embargo de nada sirve la funcionalidad si ejecuta algo que el usuario no necesita, no quiere o no espera. Por ello los motores de experiencia de usuario, interfaz de usuario y funcionalidad fullstack deben iniciarse simultáneamente, en acuerdo conjunto y revisión, ajustes y afinamiento iterativo.

En el caso de esta aplicación decidí que era prioridad poder 1) hacer el registro de los viajes persistente 2) que el cálculo de la huella de carbono fuese automático 3) que los viajes no estén duplicados. El 3) aún no está implementado, pero existe la base del identificador único y un usuario asociado quien se encarga de registrar el viaje si es de sí mismo o si va acompañado, estableciendo una lógica de negocios y un procedimiento adecuado, sólo el responsable del viaje grupal lo registra.

Por 1)2)y3) decidí comenzar con el backend.

### Autodidacta y gente dispuesta a enseñar

El 90% de mis estudios en programación han sido posibles gracias a creadores de contenido interesados en enseñar y plataformas variadas, desde tutoriales gratuitos en Youtube hasta suscripciones mensuales o cursos de precios solidarios con certificación (eso es importante)...y paciencia.

Por ello, para la ejecución de este proyecto tuve dos fuentes importantes de referencia para el conocimiento teórico de Node, Mosh Hamedani con su curso Node RESTful APIs (visto y estudiado hace un mes), y para la ejecución como tal me guié por el Curso "React Front to Back 2019" de Brad Traversy, en su segundo proyecto.

### Áreas de mejora

Conozco React en su base más sencilla, enfrentar una aplicación con create-react representó un desafío. La complejidad que encontré en la comprensión de los estados, reducers, context, requiere que de un paso atrás y que comience desde lo más sencillo de lo más complejo.
Escogí desarrollar el front en React porque era un desafío y tenía el apoyo de los recursos que mencioné en el apartado anterior. Pude haberme sentido más cómoda con Vue y más en control del front, pero sólo he desarrollado una aplicación fullstack en Vue con una API local, de servidor. Dado el tiempo disponible para ejecutar el proyecto, decidí escoger la opción donde tenía más apoyo de recursos externos.

En conclusión programar es como bucear en el Océano. Posibilidades infinitas...que mientras más cómodo se está y más seguro del entorno, más profundo se puede explorar.
