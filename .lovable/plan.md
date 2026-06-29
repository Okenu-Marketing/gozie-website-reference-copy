# One-Page Funnel at `/start`

## Goal
A single-purpose conversion page that turns curious visitors (especially those who currently bail after using the chat widget or AI receptionist demo) into form submissions that auto-populate as contacts in your GoHighLevel CRM.

## Strategy decisions (committed)
- **Route:** `/start`
- **Layout:** No navbar, no footer — pure funnel. Only a small logo top-left and "Call: [phone]" top-right.
- **Scope:** One funnel covering both service tiers (Service Business + Contracting Business). A service-interest selector in the form lets you see which they want.
- **Pricing:** Hidden (matches existing brand memory rule, keeps the call as the close mechanism).
- **Headline direction:** "More booked jobs. Less chasing leads." (final copy is editable later)
- **Video:** None for now. We compensate with the rotating mockup carousel, a results stat strip, and subtle motion in the hero.
- **CTA:** Form-first. Every button on the page scrolls to the form. Submission silently pushes the lead to GHL.

## Page structure (top to bottom)

```text
+----------------------------------------------------+
| [Okenu logo]                       [Call · Email]  |
+----------------------------------------------------+
|                                                    |
|   HERO                                             |
|   H1: More booked jobs. Less chasing leads.        |
|   Sub: A complete growth system — custom website,  |
|   Google ranking, AI receptionist, and review +    |
|   referral automations — built for local service   |
|   and contracting businesses.                      |
|   [ Get My Free Growth Plan  ↓ ]   (scrolls to form)|
|   ★★★★★ "Booked 14 jobs in our first month"        |
|                                                    |
+----------------------------------------------------+
|   PROOF STRIP                                      |
|   Rotating mockup carousel (reuse existing)        |
+----------------------------------------------------+
|   RESULTS BAND  (3 bold stats)                     |
|   e.g. "20+ sites launched · 5★ avg rating ·       |
|   24/7 AI answering missed calls"                  |
+----------------------------------------------------+
|   WHAT YOU GET  (bento or 3-column)                |
|   • Custom Website that converts                   |
|   • Google Business Profile that ranks             |
|   • AI Receptionist that answers 24/7              |
|   • Review + Referral SMS automations              |
|   • Bad-review redirect funnel                     |
|   [ Get My Free Growth Plan ↓ ]                    |
+----------------------------------------------------+
|   HOW IT WORKS  (3 steps)                          |
|   1. Submit the form below                         |
|   2. Quick 15-min strategy call                    |
|   3. We build your system in 7–14 days             |
+----------------------------------------------------+
|   WHO IT'S FOR / NOT FOR  (two-column)             |
|   For: established local service & contracting     |
|   businesses serious about growth                  |
|   Not for: people shopping for the cheapest        |
|   freelancer, DIYers, businesses < 6 months old    |
+----------------------------------------------------+
|   TESTIMONIALS  (2-3 strongest, reused)            |
+----------------------------------------------------+
|   FAQ  (5–6 objection crushers, accordion)         |
|   Timeline · Contracts · What's included · What    |
|   if it doesn't work · Do I need tech skills · etc.|
+----------------------------------------------------+
|   FINAL CTA + INLINE FORM                          |
|   "Ready to grow? Tell us about your business."    |
|   [ Name ] [ Business Name ] [ Phone ] [ Email ]   |
|   [ Service interest: Service / Contracting /      |
|     Not sure ]                                     |
|   [ Biggest challenge right now (optional) ]       |
|   [ Get My Free Growth Plan → ]                    |
|   (Honeypot + rate-limit + 60s cooldown, reusing   |
|   useSpamProtection hook)                          |
+----------------------------------------------------+
|   Tiny footer line: © Okenu Marketing · Privacy    |
+----------------------------------------------------+
```

## Design language
Stays 100% on-brand with your existing Midnight Luxe system — same Obsidian/Champagne/Ivory palette, Playfair display headings, Inter body, JetBrains accents, noise overlay, 2-3rem rounded containers, glowing buttons, staggered Framer Motion entrances. The funnel will *feel* like your site, just stripped of navigation distractions.

## GoHighLevel auto-contact (no manual entry)

Cleanest path that requires zero GHL API code:

1. In GoHighLevel, create a **Workflow** with trigger type **"Inbound Webhook"**.
2. GHL generates a unique webhook URL (looks like `https://services.leadconnectorhq.com/hooks/...`).
3. You paste that URL once into Lovable Cloud as a secret named `GHL_WEBHOOK_URL`.
4. Your existing `send-form-email` edge function gets a small addition: after sending the Resend email, it also POSTs the form data to `GHL_WEBHOOK_URL`.
5. GHL's workflow receives the payload and creates/updates the contact automatically — name, business, phone, email, service interest, source = "Funnel /start". You can then chain GHL actions (tag the contact, add to a pipeline, trigger an SMS, assign to you, etc.) entirely inside GHL with no code.

If the GHL post fails for any reason, the form still succeeds for the user (we won't block submission on the webhook).

## Spam / abuse protection
Reuses the existing `useSpamProtection` hook from the other forms:
- Honeypot hidden input
- 60-second localStorage rate limit
- Submit button disabled for 60s post-submit with countdown

## Technical scope

| File | Change |
|------|--------|
| `src/pages/Start.tsx` | New page — full funnel, no Navbar/Footer imports |
| `src/components/funnel/*` | Small section components (Hero, Results, WhatYouGet, HowItWorks, ForNotFor, FAQ, FunnelForm) for cleanliness |
| `src/App.tsx` | Add `<Route path="/start" element={<Start />} />` |
| `public/sitemap.xml` | Add `/start` |
| `supabase/functions/send-form-email/index.ts` | Add `funnel-lead` formType handler + optional POST to `GHL_WEBHOOK_URL` |
| Secret | Add `GHL_WEBHOOK_URL` (you'll paste it after creating the GHL workflow) |
| Memory | Update `mem://structure/navigation` to note `/start` is the funnel route with no chrome |

## What I will NOT touch
- Existing `/websites`, `/local-seo`, `/ai-receptionist`, `/contact` pages and forms
- Existing edge function behavior for current form types
- Homepage layout, navbar, footer
- Pricing display rule (stays hidden across the site)

## Open follow-ups (not part of this build, just FYI)
- When you record the video, we drop it into the funnel hero and remove the mockup carousel from that section
- We can later A/B `/start` against service-specific variants like `/start/contracting`
- You can chain GHL workflow actions (auto-SMS reply, pipeline placement, calendar link) entirely inside GHL — no code changes needed
