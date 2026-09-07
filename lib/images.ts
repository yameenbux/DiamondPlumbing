/**
 * Photos come off a modern iPhone at 3–5 MB each. WhatsApp will re-compress
 * them anyway, and the iOS share sheet gets slow and unreliable past ~10 MB
 * of payload, so every photo is downscaled the moment it is chosen.
 *
 * Compressing at *selection* time, not at send time, is deliberate: iOS only
 * allows `navigator.share()` inside a live user gesture, and awaiting a
 * canvas encode first is enough to lose that gesture and throw NotAllowedError.
 * By the time the send button is tapped, the files are already small.
 */

const MAX_EDGE = 1600
const QUALITY = 0.72

export const MAX_PHOTOS = 4

export type Attachment = {
  id: string
  file: File
  previewUrl: string
}

export async function compressImage(input: File): Promise<File> {
  // HEIC from an iPhone camera roll arrives as image/heic, which canvas
  // cannot decode in some browsers. If anything fails, keep the original.
  try {
    const bitmap = await createImageBitmap(input, { imageOrientation: "from-image" })

    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) return input
    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close?.()

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", QUALITY)
    )
    if (!blob || blob.size >= input.size) return input

    const name = input.name.replace(/\.[^.]+$/, "") || "photo"
    return new File([blob], `${name}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    })
  } catch {
    return input
  }
}

export async function toAttachment(file: File): Promise<Attachment> {
  const compressed = await compressImage(file)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    file: compressed,
    previewUrl: URL.createObjectURL(compressed),
  }
}
