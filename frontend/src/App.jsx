import React from 'react';
import { ComponentContextProvider } from './context/component-context';
import AppLayout from './component/layout/AppLayout';

export default function App() {
  return (
    <ComponentContextProvider>
      <AppLayout />
    </ComponentContextProvider>
)}
