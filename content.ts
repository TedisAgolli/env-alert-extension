import { Storage } from '@plasmohq/storage';

const storage = new Storage();

let prodName: string | undefined, devName: string | undefined;
storage.watch({
  prod: (c) => {
    prodName = c.newValue;
  },
  dev: (c) => {
    devName = c.newValue;
  }
});

async function startPolling() {
  prodName = await storage.get('prod');
  devName = await storage.get('dev');

  let oldEl: HTMLElement;
  setInterval(() => {
    const el = document.querySelector<HTMLElement>('.cfc-switcher-button')!;
    if (el) {
      // clear what you set before in case the name is not found
      oldEl = el;
      oldEl.style.border = 'none';

      const elText = el.innerText.trim();

      if (elText === prodName?.trim()) {
        el.style.border = '3px solid red';
      } else if (elText === devName?.trim()) {
        el.style.border = '3px solid green';
      }
    } else {
      // do nothing
    }
  }, 1000);
}

// Start polling initially
startPolling();

export {};
