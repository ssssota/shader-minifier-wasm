import { render } from "preact";
import "mizu.css/light.css";
import { App } from "./app.tsx";
const parent = document.getElementById("app");
if (parent) render(<App />, parent);
