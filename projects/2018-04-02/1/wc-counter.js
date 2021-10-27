export class WCCounter extends HTMLElement {
  constructor() {
    super();
    this._value = 0;
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
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
}

window.customElements.define('wc-counter', WCCounter);
