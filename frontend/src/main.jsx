import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.jsx'
import {Toaster} from 'react-hot-toast'
import { SearchContextProvider } from './contexts/SearchContext.jsx'
const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
     <AppContextProvider>
       <SearchContextProvider>
       <App />
       </SearchContextProvider>       
       <Toaster />
     </AppContextProvider>    
    </QueryClientProvider>    
  </StrictMode>,
)
