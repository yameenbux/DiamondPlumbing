/**
 * Where the site is served from.
 *
 * A GitHub Pages *project* site lives under a sub-path — /DiamondPlumbing/ —
 * so every absolute URL the app emits has to carry that prefix or it resolves
 * to the domain root and 404s. The deploy workflow sets this from the repo
 * name; it is empty everywhere else, including local development.
 *
 * On a custom domain (diamondplumbingbolton.co.uk) the site sits at the root,
 * so leave NEXT_PUBLIC_BASE_PATH unset.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Absolute path to a file in public/, with the base path applied. */
export const asset = (path: string) => `${basePath}${path}`
