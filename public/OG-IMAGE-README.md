# Open Graph Image

## What's Needed

Create a PNG image at `public/og-image.png` with dimensions **1200 x 630 pixels**.

This image appears when the site is shared on:
- LinkedIn
- Twitter/X  
- Facebook
- Slack
- etc.

## Quick Option: Convert the SVG

The file `og-image.svg` contains the design. Convert it to PNG:

**Option A - Online converter:**
1. Go to https://svgtopng.com/
2. Upload `og-image.svg`
3. Set width to 1200px
4. Download and rename to `og-image.png`

**Option B - Canva:**
1. Create new design 1200x630
2. Recreate the design (or screenshot the SVG)
3. Export as PNG

## Design Elements

- **Background:** Off-white (#F8F9FA)
- **Left accent:** Deep teal bar (#0D6E6E)
- **Logo:** Teal square with white "R"
- **Headline:** "Free RCM Training for Engineers"
- **Subline:** "SAE JA1011 compliant • Interactive slides • Quizzes"
- **Tagline:** "Reliability Made Practical"
- **Accent:** Industrial amber decorative elements (#E67E22)

## After Creating

Place the file at:
```
public/og-image.png
```

Then redeploy:
```bash
vercel --prod
```
