// GitHub-style alerts ("> [!WARNING]" etc.) for the Sätteri Markdown processor,
// rendered like the blog's admonitions (blog.icysamon.com): an icon and a label
// on top, then the body. Colors live in global.css under `.alert`.
import { defineHastPlugin } from "satteri";

const LABELS = {
  note: { ja: "ノート", en: "Note" },
  tip: { ja: "ヒント", en: "Tip" },
  important: { ja: "重要", en: "Important" },
  warning: { ja: "警告", en: "Warning" },
  caution: { ja: "注意", en: "Caution" },
};

// Font Awesome icons, the same ones the blog (Blowfish) uses per type
const ICONS = {
  note: {
    viewBox: "0 0 512 512",
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z",
  },
  tip: {
    viewBox: "0 0 384 512",
    d: "M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z",
  },
  important: {
    viewBox: "0 0 576 512",
    d: "M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z",
  },
  warning: {
    viewBox: "0 0 512 512",
    d: "M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z",
  },
  caution: {
    viewBox: "0 0 448 512",
    d: "M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-2.8-5.6-5.6-11.2-9.8-16.8l-50.6 58.8s-81.4-103.6-87.1-110.6C133.1 243.8 112 273.2 112 306.8C112 375.4 162.6 416 225.7 416z",
  },
};

const MARKER = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\r?\n?/i;

const isElement = (node, tagName) =>
  node?.type === "element" && (!tagName || node.tagName === tagName);

export const alerts = defineHastPlugin({
  name: "github-alerts",
  element: {
    filter: ["blockquote"],
    visit(node, ctx) {
      const children = node.children.filter(
        (c) => !(c.type === "text" && !c.value.trim()),
      );
      const first = children[0];
      if (!isElement(first, "p")) return;
      const head = first.children[0];
      if (head?.type !== "text") return;
      const match = head.value.match(MARKER);
      if (!match) return;

      const type = match[1].toLowerCase();
      const lang = ctx.fileURL?.pathname.includes("/pages/en/") ? "en" : "ja";

      // Drop the marker (and the soft break after it) from the first paragraph
      const rest = head.value.slice(match[0].length);
      const firstChildren = [
        ...(rest ? [{ type: "text", value: rest }] : []),
        ...first.children.slice(1),
      ];
      const body = [
        ...(firstChildren.length
          ? [{ ...first, children: firstChildren }]
          : []),
        ...children.slice(1),
      ];

      ctx.replaceNode(node, {
        type: "element",
        tagName: "div",
        properties: { className: ["alert", `alert-${type}`], role: "note" },
        children: [
          {
            type: "element",
            tagName: "p",
            properties: { className: ["alert-title"] },
            children: [
              {
                type: "element",
                tagName: "svg",
                properties: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: ICONS[type].viewBox,
                  ariaHidden: "true",
                },
                children: [
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fill: "currentColor",
                      d: ICONS[type].d,
                    },
                    children: [],
                  },
                ],
              },
              { type: "text", value: LABELS[type][lang] },
            ],
          },
          {
            type: "element",
            tagName: "div",
            properties: { className: ["alert-content"] },
            children: body,
          },
        ],
      });
    },
  },
});
