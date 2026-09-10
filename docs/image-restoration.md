# Gallery restoration

Two photographs received conservative corrections: `parents-graduation` and `thesis-xpostem-2025`, in both `public/gallery/optimized/` and `public/gallery/thumbnails/`.

The built-in image-generation tool produced restoration references. Direct outputs reconstructed facial detail and poster lettering, so they are **not** the images displayed on the website. Instead, their lighting and color statistics guided bounded RGB corrections on the original photographs, followed by subtle sharpening and WebP encoding. Faces, poster content, objects and framing come from the original pixels. The stock photographs in Selected Work were not changed.

## Prompts used

**Family graduation:** Conservative photographic restoration: improve exposure and neutral white balance, gently lift facial shadows, reduce JPEG noise and recover modest edge clarity. Preserve identities, expressions, skin texture, age, glasses, all three people, clothing, the framed portrait and PUCP lettering. No beauty retouching, face reconstruction, invented detail, changed objects or people. Preserve landscape framing and warm string lights. Keep uncertain details soft; natural color.

**Thesis at XPOSTEM:** Conservative photographic restoration: improve exposure, open dark shadows, neutralize the dull indoor cast and improve modest local contrast. Preserve face, hair, glasses, facial hair, pose, clothing and body. Retain objects, monitor contents, poster text and diagrams without rewriting or reconstructing blurry details. Preserve the vertical composition. No added objects, smoothing or invented text; natural documentary color.

## Applied correction

Using Sharp, the final images retain their original dimensions. RGB gain is constrained to 0.95–1.12; offset is constrained to −10–16 and blended at 55% toward the reference statistics. Sharpening uses sigma 0.5, m1 0.3 and m2 0.7. Full images use WebP quality 88; thumbnails use quality 82 and fit within 800 × 800 without enlargement.

The original files and the repository state before cleanup were saved in a local backup outside the repository. Keep originals in a separate photo archive, not in the deployed `public` directory.
