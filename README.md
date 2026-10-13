# Zeinab Ajami Portfolio

A responsive, 13-section portfolio built with plain HTML, CSS, and JavaScript. It has full-screen panels, animated transitions, keyboard and touch navigation, and a clickable 13-dot section rail. It does not need a build step or a JavaScript framework. The illustrated character crops in `assets/` are taken from the supplied reference screenshots.

## Preview

Open `index.html` in a modern browser. Use the mouse wheel, arrow keys, Page Up/Page Down, Home/End, a phone swipe, or the section dots to navigate. The page stays full-screen while it moves between panels.

## Publish with GitHub Pages

1. Create a GitHub repository for the portfolio.
2. Add `index.html`, `styles.css`, `script.js`, and this README at the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.

The first section uses the root `index.html`, which GitHub Pages serves as the site entry point. The six vertical YouTube Shorts are embedded in the portfolio: the first two appear in Featured Work (section 8), and the next four appear in AI Works (section 10).

## Personal details to review

The page uses the name, education, experience, phone number, and email shown in the supplied reference images. Confirm that the contact details are correct and that the work links are the ones you want public before publishing.

## Video placement

The Shorts are embedded from YouTube, so the video files do not need to be committed to this repository. To replace a Short, update the video ID in the corresponding `youtube-nocookie.com/embed/VIDEO_ID` iframe in `index.html`.
