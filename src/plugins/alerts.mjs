// GitHub-style alerts ("> [!WARNING]" etc.) for the Sätteri Markdown processor,
// rendered like the blog's admonitions (blog.icysamon.com): an icon and a label
// on top, then the body. Colors live in global.css under `.alert`.
import { defineHastPlugin } from "satteri";

const LABELS = {
  note: { ja: "注記", en: "Note" },
  tip: { ja: "ヒント", en: "Tip" },
  important: { ja: "重要", en: "Important" },
  warning: { ja: "警告", en: "Warning" },
  caution: { ja: "注意", en: "Caution" },
};

// Font Awesome triangle-exclamation, the icon the blog uses for warnings
const WARNING_ICON =
  "M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z";
// Font Awesome circle-info, used for the other types
const INFO_ICON =
  "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z";

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
                  viewBox: "0 0 512 512",
                  ariaHidden: "true",
                },
                children: [
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fill: "currentColor",
                      d: type === "warning" || type === "caution" ? WARNING_ICON : INFO_ICON,
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
