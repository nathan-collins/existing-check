import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { existingValueStorageMixin } from '../ExistingValueStorageMixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * `list-component` List component example demonstration
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class ListComponent extends existingValueStorageMixin(PolymerElement) {
  static get properties() {
    return {
      collectionName: 'listValues',

      listValues: {
        type: Array,
        value: () => {
          return [
            {
              name: 'Hello',
              type: 'something',
            },
            {
              name: 'Hello1',
              type: 'something1',
            },
            {
              name: 'Hello2',
              type: 'something2',
            },
            {
              name: 'Hello3',
              type: 'something3',
            },
          ];
        },
      },

      existingFields: {
        type: Array,
        value: () => {
          return ['name'];
        },
      },
    };
  }

  static get template() {
    return html`
      <ul>
        <dom-repeat items="[[listValues]]">
          <template>
            <li>[[item.name]]</li>
          </template>
        </dom-repeat>
      </ul>
    `;
  }
}

customElements.define('list-component', ListComponent);
