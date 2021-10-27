export class WCCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button id="dec"> − </button>
      <span id="display"></span>
      <button id="inc"> + </button>
    `;
    this._display = this.shadowRoot.getElementById('display');
    this._dec = this.shadowRoot.getElementById('dec');
    this._inc = this.shadowRoot.getElementById('inc');
    this._value = 0;
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this._display.textContent = value.toString();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }

  connectedCallback() {
    this._display.textContent = this.value.toString();
    this._dec.addEventListener('click', () => this.decrement());
    this._inc.addEventListener('click', () => this.increment());
  }
}

window.customElements.define('wc-counter', WCCounter);
