import { Storage } from '@plasmohq/storage';

const storage = new Storage();

let prodName: string | undefined, devName: string | undefined;
storage.watch({
  'prod': (c) => {
    console.log('prodName', c.newValue);
    prodName = c.newValue;
  },
  'dev': (c) => {
    console.log('devName', c.newValue);
    devName = c.newValue;
  }
});

async function startPolling() {
  prodName = await storage.get('prod');
  devName = await storage.get('dev');

  let oldEl: HTMLElement;
  setInterval(() => {
    console.log('poll', prodName);
    const el = document.querySelector<HTMLElement>('.cfc-switcher-button')!;
    if (el) {
      // clear what you set before in case the name is not found
      oldEl = el;
      oldEl.style.border = 'none';

      if (el.innerText === prodName) {
        el.style.border = '3px solid red';
      } else if (el.innerText === devName) {
        el.style.border = '3px solid green';
      }
    } else {
      console.log('not found');
    }
  }, 1000);
}

// Start polling initially
startPolling();

export {};
