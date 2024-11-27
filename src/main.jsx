import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'


import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://346db168b4221546899dd57e22173709@o4508370739462144.ingest.us.sentry.io/4508370741624832",
  integrations: ["localhost","onifra-tache.vercel.app"],
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


