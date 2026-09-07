/**
 * Everything Diamond needs to change lives in this one file.
 *
 * ⚠️ Two values are still marked TODO. The placeholders are deliberately
 * wrong so the page cannot state a credential Diamond does not have.
 */
export const business = {
  name: "Diamond Heating & Plumbing",
  shortName: "Diamond",
  tagline: "Heating & Plumbing Engineer",
  town: "Bolton",

  phoneDisplay: "07896 160299",
  // The same number in international form, digits only. UK mobiles drop the
  // leading 0 and gain 44. Used by tel: links and by every wa.me link, so it
  // must be the number WhatsApp is registered to.
  phoneE164: "447896160299",

  // TODO: Gas Safe registration number, printed on his ID card.
  gasSafeNumber: "000000",

  tradingSince: 2000,

  email: "hello@diamondplumbingbolton.co.uk", // TODO

  hours: {
    weekday: "7am – 6pm, Mon to Fri",
    weekend: "8am – 2pm, Sat",
    emergency: "Out of hours for no heat, no hot water and leaks",
  },
} as const

export const yearsTrading = new Date().getFullYear() - business.tradingSince

/** The service list, in the order it is painted on the van doors. */
export const liveryServices = [
  "Boilers",
  "Cookers",
  "Fires",
  "Water heaters",
  "Bathrooms",
  "Under floor heating",
  "Service & repairs",
  "Installation",
  "Landlord certificates",
  "Unvented systems",
] as const

/** Towns and villages inside the normal callout radius. */
export const coverage = [
  "Bolton",
  "Farnworth",
  "Horwich",
  "Westhoughton",
  "Little Lever",
  "Kearsley",
  "Bromley Cross",
  "Astley Bridge",
  "Harwood",
  "Breightmet",
  "Halliwell",
  "Deane",
  "Lostock",
  "Blackrod",
  "Radcliffe",
  "Walkden",
] as const

/**
 * The fault types a customer picks from. `label` is what they tap; `brief`
 * is what gets written into the WhatsApp message so Diamond can triage it
 * without reading a paragraph.
 */
export const faultTypes = [
  { id: "no-heat", label: "No heating", brief: "No heating" },
  { id: "no-hot-water", label: "No hot water", brief: "No hot water" },
  { id: "boiler", label: "Boiler fault", brief: "Boiler fault / error code" },
  { id: "leak", label: "Leak", brief: "Leak" },
  { id: "blockage", label: "Blockage", brief: "Blocked drain / waste" },
  { id: "radiator", label: "Radiators", brief: "Radiator fault" },
  { id: "bathroom", label: "Bathroom", brief: "Bathroom work" },
  { id: "cooker", label: "Cooker or fire", brief: "Gas cooker / fire" },
  { id: "cert", label: "Landlord cert", brief: "Landlord gas safety certificate" },
  { id: "quote", label: "Quote for work", brief: "Quote for planned work" },
] as const

export type FaultId = (typeof faultTypes)[number]["id"]

export const urgencies = [
  { id: "emergency", label: "Today", brief: "Needs someone today" },
  { id: "soon", label: "This week", brief: "This week is fine" },
  { id: "quote", label: "No rush", brief: "No rush — quoting" },
] as const

export type UrgencyId = (typeof urgencies)[number]["id"]
