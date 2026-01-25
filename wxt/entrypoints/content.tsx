import { createRoot, Root } from "react-dom/client";
import checkURL from "@/lib/checkURL";
import LinkTooltip from "@/components/LinkTooltip";

type TooltipContent = {
  url: string;
  label: string;
  confidence: number;
  loading?: boolean;
};

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "link-tooltip",
      position: "inline",
      anchor: "body",
      append: "last",

      onMount(container) {
        const host = document.createElement("div");
        host.style.position = "fixed";
        host.style.display = "none";
        host.style.zIndex = "999999";
        host.style.pointerEvents = "none";

        const style = document.createElement("style");
        style.textContent = `
          .loader {
            height: 4px;
            width: 130px;
            --c: no-repeat linear-gradient(#6100ee 0 0);
            background: var(--c), var(--c), #d7b8fc;
            background-size: 60% 100%;
            animation: l16 3s infinite;
          }

          @keyframes l16 {
            0%   { background-position: -150% 0, -150% 0 }
            66%  { background-position: 250% 0, -150% 0 }
            100% { background-position: 250% 0, 250% 0 }
          }
        `;
        container.appendChild(style);

        container.appendChild(host);

        const root: Root = createRoot(host);

        let visible = false;
        let currentContent: TooltipContent | null = null;

        //Position ONLY here
        const updatePosition = (e: MouseEvent) => {
          host.style.top = `${e.clientY + 15}px`;
          host.style.left = `${e.clientX + 15}px`;
        };

        const render = () => {
          if (!currentContent) return;
          root.render(<LinkTooltip content={currentContent} />);
        };

        // Events
        const handleMouseEnter = (e: MouseEvent) => {
          const target = e.target as HTMLAnchorElement;
          if (!target?.href) return;

          visible = true;
          host.style.display = "block";
          updatePosition(e);

          const url = target.href;

          // Render immediately
          currentContent = {
            url,
            label: url,
            confidence: 0,
            loading: true,
          };
          render();

          // Start fetch AFTER render
          (async () => {
            try {
              const response = await checkURL(url);
              const result = await response.json();

              if (!visible) return;

              currentContent = {
                url,
                label: result.label,
                confidence: result.confidence,
                loading: false,
              };
              render();
            } catch {
              if (!visible) return;

              currentContent = {
                url,
                label: "Error",
                confidence: 0,
                loading: false,
              };
              render();
            }
          })();
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!visible) return;
          updatePosition(e);
        };

        const handleMouseLeave = () => {
          visible = false;
          host.style.display = "none";
        };

        document.querySelectorAll("a").forEach((link) => {
          link.addEventListener("mouseenter", handleMouseEnter);
          link.addEventListener("mousemove", handleMouseMove);
          link.addEventListener("mouseleave", handleMouseLeave);
        });
      },
    });

    ui.mount();
  },
});
