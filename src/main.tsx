import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

try {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
} catch (error) {
    console.error("Failed to render the app:", error);
    document.getElementById('root')!.innerHTML = `<div style="color: white; padding: 20px;">Failed to load application. Check console for details.</div>`;
}
