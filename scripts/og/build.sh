#!/bin/sh
# Genera public/og-image.png desde scripts/og/og.html con Chromium headless.
# Requiere Chromium e ImageMagick. Uso (desde la raíz, con node_modules instalado):  sh scripts/og/build.sh
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHROME="${CHROME:-$(command -v chromium || command -v chromium-browser || command -v google-chrome)}"
OUT="$ROOT/public/og-image.png"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=3000 \
  --window-size=1200,900 --screenshot="$OUT" "file://$ROOT/scripts/og/og.html" 2>/dev/null

# Chromium headless resta la barra de la ventana al viewport: se captura más alto y se recorta.
magick "$OUT" -crop 1200x630+0+0 +repage -strip -define png:compression-level=9 "$OUT"
echo "listo: $OUT"
