# Deploy Fusion 5 to Vercel

The website is a static HTML/CSS/JavaScript project. No Node packages, build command, backend, or environment variables are needed.

## From this Hologram folder

1. Create a GitHub repository and upload this folder, including the new MP4 files and configuration files. The original folder was not a Git repository when checked.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Use **Other** as the framework preset.
4. Leave the root directory as the repository root (`.`).
5. Leave the Build Command empty. The root `vercel.json` sets the output directory to `hologram-website`.
6. Deploy.

The `stitch_fusion_5_hologram_array` folder contains design references; it is not the website root.

## If only hologram-website is uploaded

Use **Other**, an empty Build Command, and Output Directory `.`. The website's own `vercel.json` already supplies these settings. The downloadable `Hologram-Vercel-Ready.zip` uses this standalone layout: select its extracted `hologram-website` folder as the project root.

For a direct CLI deployment, run `npx vercel` from `hologram-website` and follow Vercel's login/project prompts. This publishes a preview. Run `npx vercel --prod` when ready to publish to production.

The original `.mov` videos remain on disk. `.gitignore` and `.vercelignore` exclude them from new Git commits and CLI uploads; the site uses the compressed `.mp4` copies. Keep the originals out of GitHub uploads performed manually through the browser, which do not honor `.gitignore`.

## Preview locally

From `hologram-website`, run `python3 -m http.server 8765`, then open `http://localhost:8765`. Opening `index.html` directly can prevent the 3D viewer from fetching STL files.

## After deployment

Check that the home page loads at `/`, open Mechanical and switch between models, open Electronics and Software, play all three videos, and open the team gallery. The 3D viewer requires WebGL; fonts load from Google Fonts and have system fallbacks.

This folder is prepared for Vercel. No Vercel deployment was created or verified in this repair session.

Sources: [Vercel static build settings](https://vercel.com/docs/builds/configure-a-build) and [vercel.json settings](https://vercel.com/docs/project-configuration/vercel-json).
