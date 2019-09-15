import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `existing-value-storage`
 * Hold previously loaded existing values from a populated list and make it accessible for forms in a crud application
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ExistingValueStorage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'existing-value-storage',
      },
    };
  }
}

window.customElements.define('existing-value-storage', ExistingValueStorage);
