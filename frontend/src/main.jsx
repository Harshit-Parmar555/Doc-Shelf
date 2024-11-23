import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import {store} from "./Redux Store/store.js"
import {persistedstore} from "./Redux Store/store.js"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistedstore}>
  <StrictMode>
    <App />
  </StrictMode>,
  </PersistGate>
  </Provider>
)
