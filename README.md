# 🚀 AEM Edge Delivery Services: Site Migration (Demo)

This repository demonstrates how I migrated my website ([AlexanderPaul.ch](https://alexanderpaul.ch/)) to Adobe Experience Manager Edge Delivery, leveraging Google Docs for document-based content authoring.

## 🔎 See the result (hint: check out page performance)
- Preview: https://main--praesensrege--lxpzurich.aem.page/
- Live: https://main--praesensrege--lxpzurich.aem.live/

## 💬 My opinion
If you’re used to traditional “major CMS” platforms, the initial setup might take a bit more time. This approach represents a paradigm shift in content authoring. Instead of navigating complex interfaces, you author content by filling Google Docs with content blocks—implemented as tables with a header row that designates the block type and subsequent rows for default content. In other words, once you understand a few core AEM conventions, creating structured pages becomes as natural as writing in a familiar document editor.

And on the frontend side of things, the dots connect when you realize that each of those blocks lives in its own child folder, where you keep a dedicated .js and .css file for each block. This organizational method ensures that the styling and behavior of each block are managed separately, making the overall codebase modular and maintainable.

This streamlined process not only simplifies content creation but also significantly increases content velocity for companies. What's remarkable from an SEO standpoint is how these blocks are translated into semantical markup served server-side. When combined with block-level js-decorations, this approach supports the creation of super-high-performance websites in no time, while also providing full control over rendering queue optimizations (see aem-boilerplate).

By the way, I have also created "my own" - very hacky and basic - delivery pipeline (Google Drive / Docs -> GitHub Pages) using a GitHub Actions Workflow. 

- You can check out the approach here: https://github.com/testorius/discernefuturum
- And the result: https://testorius.github.io/discernefuturum/

## ▶ How to start?
If you want to check it out, the best place to start is here: [https://www.aem.live/docs/ and more specifically:](https://www.aem.live/developer/tutorial)
