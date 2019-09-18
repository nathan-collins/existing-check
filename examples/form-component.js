import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
// eslint-disable-next-line
import existingValueStorageValidationMixin from '../ExistingValueStorageValidationMixin.js';

/**
 * `form-component` Form component example code
 *
 * @customElement
 * @polymer
 * @demo
 */
class FormComponent extends existingValueStorageValidationMixin(
    PolymerElement
) {
  /**
   * @return {Object} Properties list
   */
  static get properties() {
    return {};
  }

  /**
   * @return {String} HTML
   */
  static get template() {
    return html``;
  }
}

customElements.define('form-component', FormComponent);
