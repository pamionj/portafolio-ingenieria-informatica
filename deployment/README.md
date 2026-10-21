# Publicación y dominio

Preparado para Cloudflare Pages (plan gratuito), con HTML estático generado por Astro. No requiere servidor permanente, base de datos ni claves de IA.

## Proyecto creado

Cloudflare Pages: `pabloamion-portfolio`, modalidad **Direct Upload**. Publicación verificada el 21 de octubre de 2026: **https://pabloamion-portfolio.pages.dev/**. El registro de referencia apunta a ese hostname. El primer control automático de GitHub Actions también terminó correctamente.

## Actualizaciones en Cloudflare Pages

El primer paquete se publica mediante Direct Upload. Para actualizar, compilar, ejecutar las pruebas y subir el contenido de `dist/` al mismo proyecto. No crear otro proyecto para cada versión.

Está preparado `.github/workflows/deploy.yml` para publicar mediante GitHub Actions con Wrangler. Se ejecuta manualmente sobre `main`, después de verificar y compilar. Requiere los secretos `CLOUDFLARE_API_TOKEN` (permiso limitado a Pages) y `CLOUDFLARE_ACCOUNT_ID` configurados por el propietario; no deben incluirse en archivos ni mensajes. La variable de repositorio `SITE_URL` controla la URL canónica y usa Pages como valor inicial. El workflow está preparado, no ejecutado ni autenticado.

Direct Upload admite CI con Wrangler, pero no se convierte en la integración Git nativa del panel. [Guía oficial](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

### Alternativa: integración Git nativa para un proyecto nuevo

1. Crear un repositorio en `pamionj` con este proyecto y su `package-lock.json`.
2. En Cloudflare, crear un proyecto **Pages** mediante integración GitHub. Dar acceso solo al repositorio del portafolio.
3. Rama: `main`. Comando: `npm run build`. Directorio: `dist`. Variable de compilación: `NODE_VERSION=24`.
4. Conservar el hostname real que entregue Cloudflare. No asumir que un nombre específico está disponible.
5. Verificar el sitio público, PDF y enlaces.

Se puede subir `dist` mediante Direct Upload, pero Git es preferible para despliegues automáticos. Son modalidades distintas: no crear Direct Upload esperando convertir después ese mismo proyecto a integración Git.

## pabloamion.is-a.dev

La consulta del 21 de octubre de 2026 no encontró `domains/pabloamion.json` en `is-a-dev/register` (HTTP 404). Eso no reserva el nombre ni garantiza aprobación; comprobarlo nuevamente al solicitarlo.

1. Registro preparado: `deployment/pabloamion.json`, con CNAME `pabloamion-portfolio.pages.dev` y propietario `pamionj`. Para regenerarlo: `node scripts/domain-record.mjs pabloamion-portfolio.pages.dev`.
2. Revisar el archivo y confirmar que el sitio público responde antes de abrir el PR.
3. Hacer un fork de `is-a-dev/register` y añadirlo allí como `domains/pabloamion.json`.
4. Abrir PR usando la plantilla vigente del repositorio, con URL pública y captura del sitio. Respetar la plantilla original.
5. Asociar `pabloamion.is-a.dev` al proyecto Pages. La guía actual advierte que, debido a Public Suffix List, puede ser necesario usar la API de Cloudflare en lugar del panel. Usar la API oficial con acceso limitado a Pages; nunca guardar tokens en el repositorio, capturas ni conversaciones.
6. Esperar revisión del PR, propagación DNS y HTTPS. Comprobar DNS, certificado y HTTP antes de dar el dominio por activo.

El sitio presenta capacidades personales sin tarifas, pagos ni contratación comercial, según la decisión del usuario. La aprobación corresponde a los mantenedores de is-a.dev.

**Solicitud humana requerida:** el [AGENTS.md actual del registro](https://github.com/is-a-dev/register/blob/main/AGENTS.md) y su README indican que no aceptan pull requests generados por IA. No se creó un fork, una rama ni un PR de registro en nombre del propietario. El archivo local es una referencia técnica: el propietario debe comprender los campos, leer los términos y redactar/presentar personalmente su solicitud con la plantilla vigente. No marcar la aceptación de términos en su nombre.

`owner.username` identifica al solicitante en GitHub. `records.CNAME` apunta al hostname público de Cloudflare Pages, sin protocolo ni ruta. El nombre del archivo dentro del registro sería `domains/pabloamion.json`; no contiene `is-a.dev` en el nombre. El sitio debe responder antes de presentar la solicitud.

La plantilla consultada también pide un medio de contacto en `owner`, además del usuario. La referencia incluye el correo público `pamionj@gmail.com`, ya presente en el portafolio. No se ha presentado ninguna solicitud ni aceptado términos de is-a.dev.

### Asociación a Cloudflare por API

El panel se comprobó y pidió transferir DNS. **No iniciar esa transferencia:** el dominio padre is-a.dev no pertenece a esta cuenta. La [guía de is-a.dev](https://docs.is-a.dev/guides/cloudflare-pages/) explica que la pertenencia a Public Suffix List requiere usar la API.

Después de presentar personalmente la solicitud y coordinar su aprobación, asociar el subdominio con la [API oficial de Cloudflare](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create/). La operación es `POST /accounts/{account_id}/pages/projects/pabloamion-portfolio/domains` con cuerpo JSON que contiene `name: pabloamion.is-a.dev`. Requiere un token con permiso Pages Write/Edit para la cuenta correcta.

Ejemplo para una terminal local Bash, con los valores sensibles ya configurados como variables de entorno:

```sh
curl --request POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/pabloamion-portfolio/domains" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header 'Content-Type: application/json' \
  --data '{"name":"pabloamion.is-a.dev"}'
```

No usar la Global API Key ni pegar tokens en conversaciones. Un estado `pending` o `initializing` no significa que HTTPS esté listo: esperar `active` y comprobar la URL final. No se creó ningún token ni se ejecutó esta operación durante la publicación inicial.

## Canonical

Destino predeterminado: `https://pabloamion.is-a.dev`. Si se publica temporalmente en Pages antes de obtener el dominio, configurar `SITE_URL` con esa URL al compilar. Tras activar el dominio, cambiarla al destino final y volver a desplegar. Actualiza canonical, Open Graph, JSON-LD, robots y sitemap juntos.

## Documentación

- [is-a.dev: inicio y condiciones](https://docs.is-a.dev/quickstart/)
- [is-a.dev: Cloudflare Pages](https://docs.is-a.dev/guides/cloudflare-pages/)
- [is-a.dev: estructura del registro](https://docs.is-a.dev/domain-structure/)
- [Cloudflare: límites gratuitos](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare: integración Git](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare: dominios](https://developers.cloudflare.com/pages/configuration/custom-domains/)
