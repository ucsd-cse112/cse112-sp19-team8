const helloTemplate = document.createElement('template')
helloTemplate.innerHTML = `
  <style>
    div {
      border: solid 0.5px grey;
      text-align: center;
      width: 50%;
      margin: 20% auto;
      box-shadow: 1px 2px 10px rgba(0,0,0,0.5);
    }
  </style>
  <div class = "core">
    <h1 class = "msg">Hello World</h1>
  </div>
  `
/**
 * Creates a CoreHello custom Web Element, that displays "Hello World".
 * @class
 * @property {bool} rainbow - Whether text changes colors on an interval
 * @property {string} lang - to display HelloWorld text in.
 */
class CoreHello extends HTMLElement {
  /*
  * Returns whether this instance has 'rainbow' attribute.
  * @function
  * @returns {bool}
 */
  get rainbow () {
    return this.hasAttribute('rainbow')
  }

  /*
   * Sets this instance's rainbow attribute.
   * @function
   * @param {bool}  - true for make rainbow, false for static color.
  */
  set rainbow (val) {
    if (val) {
      this.setAttribute('rainbow', '')
    } else {
      this.removeAttribute('rainbow')
    }
  }

  /*
   * Returns this instance's 'lang' attribute.
   * @function
   * @returns {string}  - Shows current Core-Hello language.
  */
  get lang () {
    return this.getAttribute('lang')
  }

  /*
   * Sets this instance's lang attribute.
   * @function
   * @param {string}  - Retrieves the current Core-Hello language.
  */
  set lang (lan) {
    if (lan) {
      this.setAttribute('lang', lan)
    } else {
      this.removeAttribute('lang')
    }
    this.updateLang()
  }
  /**
  * Fires when an instance of the element is created.
  * @constructor
  */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(helloTemplate.content.cloneNode(true))
    this.bgColor = this.shadowRoot.querySelector('.core')
    this.bgColor.red = 100
    this.bgColor.green = 50
    this.bgColor.blue = 150

    this.msg = this.shadowRoot.querySelector('.msg')

    // Await window to load so that innerHTML can be rendered.
    window.onload = () => {
      this.updateLang()
    }
  }

  connectedCallback () {
    // Set language of hello world.
    this.updateLang()

    // Call the draw function initially
    this.draw()

    // Call the draw function every section to update the time
    setInterval(() => {
      this.draw()
    }, 100)
  }

  draw () {
    if (this.rainbow) {
      let rAdjust = Math.floor(Math.random() * 15)
      let gAdjust = Math.floor(Math.random() * 15)
      let bAdjust = Math.floor(Math.random() * 15)
      let plusOrMinusR = Math.random() < 0.5 ? -1 : 1
      let plusOrMinusG = Math.random() < 0.5 ? -1 : 1
      let plusOrMinusB = Math.random() < 0.5 ? -1 : 1

      this.bgColor.red += rAdjust * plusOrMinusR
      this.bgColor.green += gAdjust * plusOrMinusG
      this.bgColor.blue += bAdjust * plusOrMinusB

      if (this.bgColor.red < 25 || this.bgColor.red > 225) { this.bgColor.red = 125 }

      if (this.bgColor.green < 25 || this.bgColor.green > 225) { this.bgColor.green = 125 }

      if (this.bgColor.blue < 25 || this.bgColor.blue > 225) { this.bgColor.blue = 125 }

      let color = `rgb(${this.bgColor.red}, ${this.bgColor.green}, ${this.bgColor.blue})`
      this.msg.style.color = color
    }
  };

  updateLang () {
    switch (this.lang) {
      case 'jp':
        this.msg.innerHTML = 'こんにちは世界 ' + this.innerHTML
        break
      case 'Greek':
        this.msg.innerHTML = 'Γειά σου Κόσμε ' + this.innerHTML
        break
      case 'Spanish':
        this.msg.innerHTML = 'Hola Mundo ' + this.innerHTML
        break
      default:
        this.msg.innerHTML = 'Hello World ' + this.innerHTML
    }
  }
}

window.customElements.define('core-hello', CoreHello)
