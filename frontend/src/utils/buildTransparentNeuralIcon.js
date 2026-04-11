export function buildTransparentNeuralIcon(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          resolve(src);
          return;
        }

        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const isNeutral = max - min < 18;
          const isLightMatte = r > 200 && g > 200 && b > 200;

          if (isLightMatte || (isNeutral && max > 170)) {
            data[i + 3] = 0;
          }
        }

        context.putImageData(imageData, 0, 0);

        let minX = canvas.width;
        let minY = canvas.height;
        let maxX = -1;
        let maxY = -1;

        for (let y = 0; y < canvas.height; y += 1) {
          for (let x = 0; x < canvas.width; x += 1) {
            const alpha = data[(y * canvas.width + x) * 4 + 3];
            if (alpha > 12) {
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (maxX < minX || maxY < minY) {
          resolve(canvas.toDataURL("image/png"));
          return;
        }

        const padding = 8;
        const cropX = Math.max(0, minX - padding);
        const cropY = Math.max(0, minY - padding);
        const cropW = Math.min(canvas.width - cropX, maxX - minX + 1 + padding * 2);
        const cropH = Math.min(canvas.height - cropY, maxY - minY + 1 + padding * 2);

        const trimmedCanvas = document.createElement("canvas");
        trimmedCanvas.width = cropW;
        trimmedCanvas.height = cropH;
        const trimmedContext = trimmedCanvas.getContext("2d");
        if (!trimmedContext) {
          resolve(canvas.toDataURL("image/png"));
          return;
        }

        trimmedContext.drawImage(
          canvas,
          cropX,
          cropY,
          cropW,
          cropH,
          0,
          0,
          cropW,
          cropH
        );

        resolve(trimmedCanvas.toDataURL("image/png"));
      } catch {
        resolve(src);
      }
    };

    image.onerror = () => resolve(src);
  });
}
