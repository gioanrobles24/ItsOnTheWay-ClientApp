# ItsOnTheWay-ClientApp
aplicacion de clientes de Its on the way

# Instalación

* Instalar las dependencias usando `yarn` para mantener las versiones establecidas en el `yarn.lock`, usar npm puede conllevar a la instalacion de versiones diferentes entre entornos de trabajo.

```shell
yarn install
```

* duplicar el archivo `src/config.example` y renombrar a `src/config.js` cambiar el contenido del mismo con los datos necesarios
* Cambios ios
```js
export const config = {
  apiUrl: 'http://test.itsontheway.com.ve/api', // Url de la api
  imagesUrl: 'http://test.itsontheway.com.ve', // Url base donde estan las imagenes de los socios, productos, etc.
  pushUrl: 'http://192.168.0.6:7070' // Url del servicio de push notifications
  mapboxKey: 'PONER KEY AQUI', // key de mapbox para visualizar el mapa
  googleMapsKey: 'PONER KEY AQUI', // key del servicio de google maps para el funcionamiento de la barra de busqueda en la pantalla del mapa
};
```