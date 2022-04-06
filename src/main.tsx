import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={client}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );
