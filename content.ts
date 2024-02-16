import { Storage } from "@plasmohq/storage"

const storage = new Storage()

storage.watch({
  "prodName": (c) => {
    console.log('prodName', c.newValue)
  },
  make: (c) => {
    console.log(c.newValue)
  }
})

function startPolling() {
  const interval = setInterval(() => {
    const el = document.querySelector(".cfc-switcher-button") as HTMLElement
    if (el) {
      if (el.innerText === "Security Products Main") {
        el.style.border = "3px solid red"
      } else if (el.innerText === "Security Products Dev Website") {
        el.style.border = "3px solid green"
      }
    } else {
      console.log("not found")
    }
  }, 1000);
}

// Start polling initially
startPolling();


export { }
