# Vocab — Mandarin Word of the Day

A deliberately minimalist, server-rendered Word of the Day site. Its first route, `/mandarin`, presents one useful Mandarin word with Hanzi, tone-marked pinyin, and a concise source-provided English meaning.

## Stack

- Next.js App Router, React, TypeScript (strict mode), Tailwind CSS, and ESLint
- Static local JSON data, with Node's built-in test runner via `tsx`

## Local development

```bash
npm install
npm run sync:data
npm run dev
npm run lint
npm run test
npm run build
```

Open [http://localhost:3000/mandarin](http://localhost:3000/mandarin). The root route redirects there.

## Vocabulary data and licensing

`scripts/sync-hsk-data.mjs` downloads `complete.json` from [Complete HSK Vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary), validates the JSON array, and writes `data/mandarin.json`. It retains eligible new-HSK levels 1–3 records with a pinyin form and English meaning, removes excluded name/punctuation categories and duplicates, orders by frequency, and caps output at 1,000 entries. The generated file is committed, so production builds never need network access. See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for the MIT attribution and licence.

## Daily selection

`lib/daily-word.ts` calculates complete UTC calendar days since a fixed epoch and selects `days % vocabulary.length`. UTC makes output stable across server and visitor time zones; the pure function has focused tests, including wrapping and pre-epoch behavior.

## Adding a language

`lib/languages.ts` is the language registry and the dynamic `app/[language]/page.tsx` is intentionally language-agnostic at the routing boundary. Add a slug/configuration, a local data accessor, and a renderer branch to introduce another language without changing route structure.

## MVP limitations

Only Mandarin is available. There is no archive, search, audio, accounts, CMS, analytics, or automatically generated word pages. The initial committed data is a small checked-in snapshot; run `npm run sync:data` in an environment with GitHub access to regenerate the complete eligible dataset.
