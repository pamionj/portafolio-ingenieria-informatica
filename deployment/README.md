# Publicación en Cloudflare Pages

Preparado para Cloudflare Pages (plan gratuito), con HTML estático generado por Astro. No requiere servidor permanente, base de datos ni claves de IA.

## Proyecto creado

Cloudflare Pages: `pabloamion-portfolio`, modalidad **Direct Upload**. Última publicación verificada el 31 de octubre de 2026: **https://pabloamion-portfolio.pages.dev/**. El primer control automático de GitHub Actions también terminó correctamente.

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

## URL canónica

La URL predeterminada es `https://pabloamion-portfolio.pages.dev`. Para publicar bajo otra URL, configurar `SITE_URL` al compilar y volver a desplegar. Esto actualiza canonical, Open Graph, JSON-LD, robots y sitemap juntos.

## Documentación

- [Cloudflare: Direct Upload e integración continua](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [Cloudflare: límites gratuitos](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare: integración Git](https://developers.cloudflare.com/pages/get-started/git-integration/)
