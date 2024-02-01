import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
// import '@/index.css' // import stylesheet in html instead so that loading element will be styled before this is called

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
