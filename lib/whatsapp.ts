import { business, faultTypes, urgencies, type FaultId, type UrgencyId } from "./business"

export type JobDetails = {
  name: string
  phone: string
  postcode: string
  faults: FaultId[]
  urgency: UrgencyId | ""
  notes: string
  photoCount: number
}

/**
 * The message Diamond receives. Written as a job sheet rather than prose so
 * he can triage it from the notification preview on a ladder.
 */
export function buildMessage(job: JobDetails, photosTravel = true): string {
  const faultLabels = job.faults
    .map((id) => faultTypes.find((f) => f.id === id)?.brief)
    .filter(Boolean)

  const urgency = urgencies.find((u) => u.id === job.urgency)?.brief

  const lines = [
    `New job from the ${business.shortName} website`,
    "",
    `Name: ${job.name.trim() || "—"}`,
    `Phone: ${job.phone.trim() || "—"}`,
    `Where: ${job.postcode.trim().toUpperCase() || "—"}`,
  ]

  if (faultLabels.length) lines.push(`Problem: ${faultLabels.join(", ")}`)
  if (urgency) lines.push(`When: ${urgency}`)

  if (job.notes.trim()) {
    lines.push("", "Details:", job.notes.trim())
  }

  if (job.photoCount > 0) {
    const count = `${job.photoCount} photo${job.photoCount === 1 ? "" : "s"}`
    // On the fallback route the images stay behind, so don't promise them.
    lines.push("", photosTravel ? `${count} attached.` : `${count} to follow.`)
  }

  return lines.join("\n")
}

/** Plain chat link, no message attached. Used by the always-visible buttons. */
export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${business.phoneE164}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export type SendOutcome =
  | { status: "shared"; withPhotos: boolean }
  | { status: "handoff" } // opened WhatsApp with text only
  | { status: "cancelled" }
  | { status: "error"; message: string }

/**
 * Hand the job over to WhatsApp.
 *
 * There is no way to attach a photo through a wa.me link — the link API only
 * carries text. The only route from a web page to a WhatsApp message with
 * images is the OS share sheet, so that is the primary path: on iOS the
 * customer taps WhatsApp in the sheet and the photos travel with the message.
 *
 * Anywhere the share sheet cannot take files (most desktop browsers) it falls
 * back to a normal wa.me link with the text, and the caller tells the customer
 * their photos did not come along.
 *
 * MUST be called synchronously from a click handler — no awaits before
 * `navigator.share`, or iOS revokes the gesture.
 */
export async function sendToWhatsApp(
  job: JobDetails,
  files: File[]
): Promise<SendOutcome> {
  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    files.length > 0 &&
    navigator.canShare({ files })

  if (canShareFiles) {
    const text = buildMessage(job, true)
    // Belt and braces: some WhatsApp builds drop the caption when several
    // images are shared at once, so the details sit on the clipboard too.
    void navigator.clipboard?.writeText(text).catch(() => {})
    try {
      await navigator.share({ text, files })
      return { status: "shared", withPhotos: true }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { status: "cancelled" }
      }
      // Share refused the payload — fall through to the text-only route
      // rather than leaving the customer with nothing.
    }
  }

  try {
    window.open(whatsappLink(buildMessage(job, false)), "_blank", "noopener,noreferrer")
    return { status: "handoff" }
  } catch {
    return {
      status: "error",
      message: "WhatsApp would not open. Call instead and we'll pick up.",
    }
  }
}
