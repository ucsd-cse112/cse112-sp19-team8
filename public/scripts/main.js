(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <div class = "core">
    <h1 class = "msg">Hello World</h1>
  </div>
  `;

  class CoreHello extends HTMLElement {

    // Fires when an instance of the element is created.
    constructor() {
      super();
      this.attachShadow({mode : 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.bgColor = this.shadowRoot.querySelector('.core');
      this.msg = this.shadowRoot.querySelector('.msg');
      this.rainbow_Switch = false;
      this.msg.innerHTML = "Hello World " + this.innerHTML;
    };
    connectedCallback() {

      if(this.hasAttribute('rainbow')) {
        this.updateColor();
      }
      if(this.hasAttribute('lang')) {
        this.updateLang(this.lang);
      }
      //Call the draw function initially
      this.draw();
      //Call the draw function every section to update the time
      setInterval(() => {
        this.draw();
      }, 1000);
    }
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attrName, oldVal, newVal) {
      switch (attrName) {
        case "rainbow":
          this.updateColor();
          break;
        case "lang":
          this.updateLang(newVal);
          break;
        default:
          this.rainbow = false;
      }
    };
    draw() {
      if(this.rainbow_Switch == true){
        var random = Math.random();
        let color = "";
        if(random < 0.33){
          color = "blue";
        }
        else if(random < 0.66){
          color = "red";
        }
        else if(random < 1.0){
          color = "green";
        }
        this.bgColor.style.backgroundColor = color;
      }
    };
    updateColor() {
      this.rainbow_Switch = true;
    };
    updateLang(lan){
      switch (lan) {
        case "jp":
        this.msg.innerHTML = "こんにちは世界 " + this.innerHTML;
        break;
        case "Greek":
        this.msg.innerHTML = "Γειά σου Κόσμε " + this.innerHTML;
        break;
        case "Spanish":
        this.msg.innerHTML = "Hola Mundo " + this.innerHTML;
        break;
        default:
        this.msg.innerHTML = "Hello World " + this.innerHTML;

      }
    }
  }
  window.customElements.define('core-hello', CoreHello);
})();
