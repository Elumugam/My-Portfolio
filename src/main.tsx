import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log("App starting initialization...");

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("Root element not found!");
} else {
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        console.log("App rendered successfully");
    } catch (error) {
        console.error("Failed to render the app:", error);
        rootElement.innerHTML = `<div style="color: red; padding: 20px;">Failed to load application. Error: ${error}</div>`;
    }
}
