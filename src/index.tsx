import { appWindow } from '@tauri-apps/api/window';
import { ReportHandler } from 'web-vitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

import { App } from './App';
import { app } from '@tauri-apps/api';

initializeFileTypeIcons();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

document.addEventListener("keydown", async ev => {
  if (ev.key === "Escape") {
    console.log("Hiding the app");
    await appWindow.hide();
  }
});

document.addEventListener("focusout", async ev => {
  console.log("focusout");
  await appWindow.hide();
});

function reportWebVitals(onPerfEntry?: ReportHandler) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
