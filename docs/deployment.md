# Desarrollo y despliegue

Node.js 24 y npm. El proyecto usa Next.js, React, TypeScript y Tailwind CSS.

```sh
npm ci
npm run dev
```

Para comprobar producción: `npm run build`, `npm run check` y `npm start`.
El desarrollo usa `.next-dev`; la compilación de producción usa `.next`.
No se necesita un servidor personalizado ni configurar una carpeta `out`.

## Vercel y johanamador.com

1. Importa el repositorio `johanamador/johanamador` en Vercel. Selecciona **Next.js**, Node.js **24.x**, `npm ci` y `npm run build`. Deja el directorio de salida en su valor predeterminado.
2. Añade `johanamador.com` y `www.johanamador.com` en **Settings → Domains**. La configuración del proyecto redirige `www` al dominio principal.
3. En Cloudflare, conserva los nameservers actuales. Crea o actualiza únicamente los registros web `@` y `www` con los **valores exactos que muestre Vercel** (A/CNAME, según indique). No uses una IP genérica ni modifiques registros de correo MX/TXT.
4. Configura ambos registros como **DNS only** (nube gris). Vercel servirá la web, el certificado HTTPS y la CDN. No hace falta añadir una segunda caché ni reglas «Cache Everything».
5. Si Vercel solicita un TXT de verificación, cópialo tal como aparece. Espera a que ambos dominios indiquen **Valid Configuration** y comprueba HTTPS y la redirección de `www`.

Fuentes: [dominios en Vercel](https://vercel.com/docs/domains/set-up-custom-domain), [Cloudflare delante de Vercel](https://vercel.com/kb/guide/cloudflare-with-vercel), [DNS only en Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).

## Contenido

- `lib/profile.ts`: experiencia, educación, habilidades y galería.
- `lib/projects.ts`: proyectos, logos y enlaces.
- `lib/translations.ts`: textos en español; el contenido base está en inglés.
- `public/gallery/optimized` y `thumbnails`: fotografías y sus miniaturas.
- `public/projects/logos` y `featured`: logos SVG y fondos WebP de proyectos.
- `public/cv-en.tex` y `cv-es.tex`: fuentes de los CV. Compila con Tectonic en una carpeta temporal y reemplaza los PDF del mismo idioma. Revisa que ambos tengan dos páginas.

Los archivos nuevos usan **kebab-case en minúsculas**. `npm run check` detecta rutas inexistentes y diferencias de mayúsculas antes de desplegar en Linux.

Espaciado de secciones: 112 px arriba/abajo en escritorio y 72 px en móvil, definido mediante variables en `app/globals.css`. El hero conserva su composición de portada.

El formulario usa el endpoint existente de Formspree; confirma en su panel que acepta `johanamador.com`. Los datos de GitHub se consultan desde APIs públicas con estados de error; no incluyas tokens en el código del navegador. Las pruebas locales no envían mensajes reales.

## Perfil de GitHub

El README está orientado al perfil personal. Para que aparezca en tu perfil, el repositorio público debe llamarse **johanamador**, igual que tu usuario, y contener `README.md` en la raíz. [Requisitos de GitHub](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme).
