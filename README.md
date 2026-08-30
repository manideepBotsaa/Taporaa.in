# TAPORAA

Premium NFC + QR card website for restaurants, cafés, bars and hotels —
Google Review cards and Smart Table Ordering cards, presented as a dark,
3D, product-launch style experience.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Three Fiber / drei / three.js (3D cards, phone, particles)
- Framer Motion (scroll reveals, transitions)

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to check it
```

The production build is written to `dist/`.

## Editing content

- **Copy & sections** live in `src/components/*.tsx` — each section
  (Hero, Products, HowItWorks, Benefits, UseCases, NoAppSection, Trust,
  Contact, Footer) is a separate, readable component.
- **3D cards** are in `src/components/three/CardMesh.tsx`. Table numbers,
  wording and colors are props — no need to touch the 3D code to change copy.
- **QR codes** are procedurally generated demo patterns
  (`src/lib/qrTexture.ts`) clearly marked as placeholders. Replace with
  real per-business QR codes at integration time.
- **Contact form** (`src/components/Contact.tsx`) currently just confirms
  locally on submit — wire `handleSubmit` to your real backend/email
  service before launch.
- **Contact details** (WhatsApp number, phone, email, Instagram) are
  placeholders in `Contact.tsx` and `Footer.tsx` — replace with the real
  business details.
- **Colors/fonts** are defined once in `src/index.css` under `@theme`.

## Notes

- Respects `prefers-reduced-motion` (disables floating/rotation loops).
- No fake stats, client logos, or testimonials were invented, per the brief.
- 3D scenes are kept lightweight (low particle counts, simple geometry) to
  stay performant; consider further reducing `ParticleField` counts on very
  low-end devices if needed.
