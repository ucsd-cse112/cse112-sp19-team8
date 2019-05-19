const buttonTemplate = document.createElement('template')
buttonTemplate.innerHTML = `
<style>
button {
  font-size: 1.3em;
  width: 10em;
  padding: 1em 2em;
  margin: 3px;
  border: 0;
  outline: 0;
  color: white;
  background-color: #2196F3;
  text-transform: uppercase;
  border-radius: 0.15em;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  
  overflow: hidden;
  position: relative;
}

button .ripple {
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
<div class = "container">
</div>
`

class RippleButton extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))
  }

  get contents () {
    return this.getAttribute('content')
  }

  get class () {
    if (this.hasAttribute('class')) { return this.getAttribute('class') } else { return 'default' }
  }

  connectedCallback () {
    this.update()
  }

  update () {
    var div = this.shadowRoot.querySelector('.container')
    var button = document.createElement('button')
    button.addEventListener('click', function (e) {
      for (let i = 0; i < this.children.length; i++) {
        this.children[0].remove()
      }

      var circle = document.createElement('div')
      circle.classList.add('ripple')
      this.appendChild(circle)

      var d = Math.max(this.clientWidth, this.clientHeight)

      circle.style.width = circle.style.height = d + 'px'

      var rect = this.getBoundingClientRect()
      circle.style.left = e.clientX - rect.left - d / 2 + 'px'
      circle.style.top = e.clientY - rect.top - d / 2 + 'px'
    })
    button.setAttribute('class', this.class)
    button.innerHTML = this.contents
    div.appendChild(button)
  }
}

window.customElements.define('ripple-button', RippleButton)
