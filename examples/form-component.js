import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { existingValueStorageValidationMixin } from '../ExistingValueStorageValidationMixin.js';

/**
 * `FormComponent` Form component example code
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class FormComponent extends existingValueStorageValidationMixin(
  PolymerElement
) {
  static get properties() {
    return {};
  }

  static get template() {
    return html``;
  }
}

customElements.define('FormComponent', FormComponent);
