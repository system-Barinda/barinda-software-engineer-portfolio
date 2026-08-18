import { createRoot } from "react-dom/client";
// @ts-expect-error -- CSS imports are handled by the bundler at build time
import "../src/styles.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
