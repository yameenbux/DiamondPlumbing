"use client"

import * as React from "react"
import { Camera, Check, Loader2, X } from "lucide-react"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { WhatsAppGlyph } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  business,
  faultTypes,
  urgencies,
  type FaultId,
  type UrgencyId,
} from "@/lib/business"
import { MAX_PHOTOS, toAttachment, type Attachment } from "@/lib/images"
import { sendToWhatsApp, type SendOutcome } from "@/lib/whatsapp"

/* -------------------------------------------------------------------------- */

const fieldClass =
  "bg-ink-raised border-ink-line text-chrome placeholder:text-slate/70 w-full rounded-xl border px-4 py-3.5 outline-none transition-colors focus:border-flame/70"

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-slate font-mono mb-2 flex items-baseline justify-between text-[11px] tracking-[0.16em] uppercase"
    >
      <span>{children}</span>
      {hint && <span className="text-ink-line normal-case tracking-normal">{hint}</span>}
    </label>
  )
}

function Chip({
  active,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-2 text-sm transition-colors",
        active
          ? "border-flame bg-flame/15 text-flame font-medium"
          : "border-ink-line text-slate hover:border-slate/60 hover:text-chrome"
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/* -------------------------------------------------------------------------- */

export function JobForm() {
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [postcode, setPostcode] = React.useState("")
  const [faults, setFaults] = React.useState<FaultId[]>([])
  const [urgency, setUrgency] = React.useState<UrgencyId | "">("")
  const [notes, setNotes] = React.useState("")
  const [photos, setPhotos] = React.useState<Attachment[]>([])

  const [preparing, setPreparing] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const [outcome, setOutcome] = React.useState<SendOutcome | null>(null)
  const [showErrors, setShowErrors] = React.useState(false)

  const fileInput = React.useRef<HTMLInputElement>(null)

  // Object URLs are held for the life of the page; release them on unmount.
  const photosRef = React.useRef(photos)
  photosRef.current = photos
  React.useEffect(
    () => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl)),
    []
  )

  const errors = {
    name: name.trim().length < 2 ? "Tell me who I'm speaking to." : "",
    phone:
      phone.replace(/\D/g, "").length < 10
        ? "A number I can call you back on."
        : "",
  }
  const valid = !errors.name && !errors.phone

  const toggleFault = (id: FaultId) =>
    setFaults((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    )

  const addPhotos = async (list: FileList | null) => {
    if (!list?.length) return
    const room = MAX_PHOTOS - photos.length
    const chosen = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, room)
    if (!chosen.length) return

    setPreparing(true)
    // Shrunk here rather than at send time — see lib/images.ts.
    const prepared = await Promise.all(chosen.map(toAttachment))
    setPhotos((current) => [...current, ...prepared].slice(0, MAX_PHOTOS))
    setPreparing(false)
    if (fileInput.current) fileInput.current.value = ""
  }

  const removePhoto = (id: string) =>
    setPhotos((current) => {
      const gone = current.find((p) => p.id === id)
      if (gone) URL.revokeObjectURL(gone.previewUrl)
      return current.filter((p) => p.id !== id)
    })

  const send = async () => {
    if (!valid) {
      setShowErrors(true)
      document.getElementById("job-name")?.focus()
      return
    }
    setSending(true)
    // No awaits before this call: iOS only permits navigator.share() while
    // the tap that triggered it is still live.
    const result = await sendToWhatsApp(
      {
        name,
        phone,
        postcode,
        faults,
        urgency,
        notes,
        photoCount: photos.length,
      },
      photos.map((p) => p.file)
    )
    setSending(false)
    if (result.status !== "cancelled") setOutcome(result)
  }

  /* ---------------------------------------------------------------------- */

  if (outcome && outcome.status !== "cancelled") {
    return <Sent outcome={outcome} onBack={() => setOutcome(null)} />
  }

  return (
    <div className="border-ink-line bg-ink-raised/40 rounded-3xl border p-5 sm:p-8">
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="job-name">Your name</Label>
            <input
              id="job-name"
              className={fieldClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Jane Whittaker"
            />
            {showErrors && errors.name && <FieldError>{errors.name}</FieldError>}
          </div>

          <div>
            <Label htmlFor="job-phone">Phone</Label>
            <input
              id="job-phone"
              className={fieldClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="07700 900123"
            />
            {showErrors && errors.phone && <FieldError>{errors.phone}</FieldError>}
          </div>
        </div>

        <div>
          <Label htmlFor="job-postcode" hint="optional">
            Postcode
          </Label>
          <input
            id="job-postcode"
            className={cn(fieldClass, "uppercase")}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            autoComplete="postal-code"
            placeholder="BL1 4AB"
          />
        </div>

        <fieldset>
          <Label>What&rsquo;s wrong</Label>
          <div className="flex flex-wrap gap-2">
            {faultTypes.map((fault) => (
              <Chip
                key={fault.id}
                active={faults.includes(fault.id)}
                onClick={() => toggleFault(fault.id)}
              >
                {fault.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <Label>When do you need someone</Label>
          <div className="flex flex-wrap gap-2">
            {urgencies.map((option) => (
              <Chip
                key={option.id}
                active={urgency === option.id}
                onClick={() =>
                  setUrgency((current) => (current === option.id ? "" : option.id))
                }
              >
                {option.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <div>
          <Label htmlFor="job-notes" hint="optional">
            Anything else
          </Label>
          <textarea
            id="job-notes"
            className={cn(fieldClass, "min-h-28 resize-y leading-relaxed")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Worcester combi, about 8 years old, showing EA on the display. Been off since Tuesday."
          />
        </div>

        {/* Photos ---------------------------------------------------------- */}
        <div>
          <Label hint={`${photos.length} of ${MAX_PHOTOS}`}>Photos</Label>

          <div className="grid grid-cols-4 gap-2.5">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="border-ink-line relative aspect-square overflow-hidden rounded-xl border"
              >
                {/* Local blob preview — next/image adds nothing here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.previewUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  aria-label="Remove photo"
                  className="text-chrome absolute top-1 right-1 grid size-7 place-items-center rounded-full bg-black/75 backdrop-blur-sm"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}

            {photos.length < MAX_PHOTOS && (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={preparing}
                className="border-ink-line text-slate hover:border-flame/60 hover:text-flame grid aspect-square place-items-center gap-1 rounded-xl border border-dashed transition-colors disabled:opacity-60"
              >
                {preparing ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Camera className="size-5" />
                )}
                <span className="font-mono text-[9px] tracking-widest uppercase">
                  {preparing ? "Wait" : "Add"}
                </span>
              </button>
            )}
          </div>

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => void addPhotos(e.target.files)}
          />

          <p className="text-slate mt-2.5 text-xs leading-relaxed">
            A shot of the boiler, its display and the leak saves a visit.
            Photos stay on your phone until you send the message.
          </p>
        </div>

        {/* Send ------------------------------------------------------------ */}
        <div className="hairline mt-1 pt-5">
          <LiquidButton
            onClick={send}
            disabled={sending || preparing}
            size="xxl"
            className="text-chrome w-full rounded-full text-base font-semibold"
          >
            <span className="flex items-center justify-center gap-2.5">
              {sending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <WhatsAppGlyph className="text-flame size-5" />
              )}
              {sending ? "Opening WhatsApp" : "Send on WhatsApp"}
            </span>
          </LiquidButton>

          <p className="text-slate mt-3 text-center text-xs">
            Opens WhatsApp with everything filled in. Nothing sends until you
            press send there.
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="text-destructive mt-2 text-xs">{children}</p>
}

function Sent({
  outcome,
  onBack,
}: {
  outcome: SendOutcome
  onBack: () => void
}) {
  const failed = outcome.status === "error"

  return (
    <div className="border-ink-line bg-ink-raised/40 rounded-3xl border p-8 text-center">
      <div
        className={cn(
          "mx-auto grid size-14 place-items-center rounded-full",
          failed ? "bg-destructive/15 text-destructive" : "bg-flame/15 text-flame"
        )}
      >
        {failed ? <X className="size-6" /> : <Check className="size-6" />}
      </div>

      <h3 className="text-chrome mt-5 text-xl font-semibold">
        {outcome.status === "shared"
          ? "Handed over to WhatsApp"
          : outcome.status === "handoff"
            ? "WhatsApp is open"
            : "That didn't work"}
      </h3>

      <p className="text-slate mx-auto mt-3 max-w-sm text-sm leading-relaxed">
        {outcome.status === "shared" &&
          "Your details and photos are in the message. Press send in WhatsApp and I'll come back to you."}
        {outcome.status === "handoff" &&
          "Your details are in the message box. Photos can't travel through a web link on this browser — add them in the chat with the paperclip, or send this from your phone."}
        {outcome.status === "error" && outcome.message}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={onBack}
          className="border-ink-line text-slate hover:text-chrome rounded-full border px-5 py-2.5 text-sm transition-colors"
        >
          Back to the form
        </button>
        <a
          href={`tel:+${business.phoneE164}`}
          className="bg-flame text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Call {business.phoneDisplay}
        </a>
      </div>
    </div>
  )
}
