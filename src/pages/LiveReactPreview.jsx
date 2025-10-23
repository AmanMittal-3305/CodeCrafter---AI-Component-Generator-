import React from "react";
import sdk from "@stackblitz/sdk";

const LivePreview = ({ code, framework }) => {
  const openSandbox = () => {
    let template = "vanilla-js";
    let files = {};

    switch (framework) {
      case "react-js":
      case "react-tailwind":
      case "react-bootstrap":
        template = "create-react-app";
        files = {
          "package.json": JSON.stringify({
            name: "ai-react",
            dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
          }, null, 2),
          "public/index.html": "<div id='root'></div>",
          "src/index.js": `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
          `,
          "src/App.js": code,
        };
        sdk.openProject({ files, template, title: "AI React Component", description: "Generated via AI", openFile: "src/App.js" }, { newWindow: true });
        break;

      case "html-css":
      case "html-tailwind":
      case "html-bootstrap":
        template = "vanilla-js";
        files = { "index.html": code };
        sdk.openProject({ files, template, title: "AI HTML Component", description: "Generated via AI", openFile: "index.html" }, { newWindow: true });
        break;

      case "next-js":
        // Open pre-made Next.js project and append user code to pages/index.js
        window.open(
          "https://stackblitz.com/fork/nextjs?file=pages/index.js&code=" + encodeURIComponent(code),
          "_blank"
        );
        break;

      case "angular":
        window.open(
          "https://stackblitz.com/fork/angular-cli?file=src/app/app.component.ts&code=" + encodeURIComponent(code),
          "_blank"
        );
        break;

      case "vue":
        window.open(
          "https://stackblitz.com/fork/vue?file=src/App.vue&code=" + encodeURIComponent(code),
          "_blank"
        );
        break;

      default:
        alert("Live preview not available for this framework.");
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-gray-500 mb-2">
        Live preview may not be available locally for {framework.toUpperCase()}.
      </p>
      <button
        onClick={openSandbox}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:opacity-80"
      >
        Open in StackBlitz
      </button>
    </div>
  );
};

export default LivePreview;
