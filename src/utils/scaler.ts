type ScalerArgs = {
  file: Blob
  scale: number
}

export async function getBase64Thumbnail ({
  file,
  scale = 0.1
}: ScalerArgs): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const el = document.createElement('canvas')
        const w = (el.width = img.width * scale)
        const h = (el.height = img.height * scale)
        const ctx = el.getContext('2d')
        if (!ctx) {
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(el.toDataURL())
      }
      reader.onerror = (e) => {
        reject((e as any).toString())
      }
      img.src = e?.target?.result as string
    }
  })
}
