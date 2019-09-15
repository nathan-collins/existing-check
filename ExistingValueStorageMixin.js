/**
 * eslint-env es6
 * @polymer
 * @mixinFunction
 * @extends PolymerElement
 * @polymerMixin
 * @param {Object} superClass PolymerElement
 * @return {Object} superClass
 */
const ExistingValueStorage = function(superClass) {
  return class extends superClass {
    /**
     */
    static get properties() {
      return {
        // Name of the collection data
        collectionName: {
          type: String,
          value: 'tableData',
        },

        // Disable a button until all values are available
        enabledExistingButtons: {
          type: Array,
          value: () => {
            return [];
          },
        },

        // The field data to be retrieved
        existingFields: {
          type: Array,
        },

        existingDataName: {
          type: String,
        },

        // All existing check values in flat arrays
        existingValues: {
          type: Object,
        },

        // Force the collection to be pulled again
        refreshCollections: {
          type: Boolean,
          value: false,
        },
      };
    }

    /**
     * @return {Array} Observers for the existing check mixin
     */
    static get observers() {
      return ['existingDataNameChanged(existingDataName)'];
    }

    /**
     * @param {String} existingDataName Existing data name
     */
    existingDataNameChanged(existingDataName) {
      this._createMethodObserver(
<<<<<<< HEAD:ExistingValueStorageMixin.js
        `populateExistingValues(existingFields, ${existingDataName}.*, refreshCollections)`,
=======
        `populateExistingValues(existingCheck, ${existingDataName}.*, force)`,
>>>>>>> master:ExistingCheckMixin.js
        true
      );
    }

    /**
     * @param {Array} existingFields Existing fields check
     * @param {Boolean} refreshCollections Force the collections to be refreshed
     */
    populateExistingValues(existingFields, refreshCollections) {
      if (!existingFields || existingFields.length === 0) return;
      if (!refreshCollections) return;
      if (!this[this.collectionName] || !this[this.collectionName].base) return;

      let existingData = {};

<<<<<<< HEAD:ExistingValueStorageMixin.js
      existingFields.forEach(field => {
        let values;

        values = this[this.collectionName].base.map(existing => {
=======
      existingCheck.forEach(field => {
        let values;

        values = tableData.base.map(existing => {
>>>>>>> master:ExistingCheckMixin.js
          return existing[field].toLowerCase().trim();
        });

        existingData[field] = values;
      });
      this.set('enabledExistingButtons', []);

      const allFields = Object.keys(existingData);
      allFields.forEach(field => {
        if (!this.enabledExistingButtons.includes(field)) {
          AromaHelper.prototype._fireEvent('disable-create-button', {}, true);
        }

        if (existingData[field].length > 0) {
          // enable the create button
          this.push('enabledExistingButtons', field);
          AromaHelper.prototype._fireEvent('enable-create-button', {}, true);
        }
      });

      this.set('existingFieldValues', existingData);

      // this gets triggered far to often,
      // we need to debounce this or limit it only setting once.
      AromaHelper.prototype._fireEvent('create-form-existing', {
        existingFieldValues: this.existingValues,
      });
      this.set('refreshCollections', false);
    }

    /**
     * @param {Event} event Event
     */
    updateExistingCheck(event) {
      if (this[this.collectionName]) {
        this.set('refreshCollections', true);
      }
    }

    /**
     * @param {String} field Name of the field to check
     * @param {String} values Value supplied
     * @return {Boolean} Check existing fields
     */
    validateExistingField(field, values) {
      if (!this.existingFields.includes(field) || !this.existingValues[field]) {
        return;
      }
      if (!field || !values) return false;
      if (!values[field]) return false;

      return this.existingValues[field].includes(
        values[this.existingCheckFieldConvert(field)].toLowerCase()
      );
    }

    /**
     * @param {String} field Field value
     * @return {String} Existing name
     */
    existingCheckFieldConvert(field) {
      if (!field) return;
      if (!this.existingNameConvert) return this.field;

      const convertedField = this.existingNameConvert.map((convert, index) => {
        if (field === Object.values(convert)[index].toLowerCase()) {
          return Object.keys(convert)[index];
        }
      });

      return !convertedField[0] ? this.field : convertedField[0];
    }

    /**
     * @param {Array} existingValues Existing values
     * @param {String} entity The entity of the current existing value
     * @return {Array} Existing list
     */
    removeUpdateExistingValue(existingValues, entity) {
      if (!existingValues) return;
      const existingValuesKeys = Object.keys(existingValues);

      existingValuesKeys.forEach(key => {
        const removeExistingIndex = existingValues[key].findIndex(
          existingValue => {
            return existingValue === entity[key].toLowerCase();
          }
        );
        if (removeExistingIndex !== -1) {
          existingValues[key].splice(removeExistingIndex, 1);
        }
      });

      return existingValues;
    }
  };
};

export default ExistingValueStorage;
