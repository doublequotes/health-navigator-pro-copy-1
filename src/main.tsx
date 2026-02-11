import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force dark theme across the site
if (typeof document !== 'undefined') {
	document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
