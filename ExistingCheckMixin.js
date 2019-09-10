import AromaHelper from '../../custom-components/aroma-helper/aroma-helper';

/**
 * eslint-env es6
 * @polymer
 * @mixinFunction
 * @extends PolymerElement
 * @polymerMixin
 * @param {Object} superClass PolymerElement
 * @return {Object} superClass
 */
const ExistingCheckMixin = function(superClass) {
  return class extends superClass {
    /**
     *
     */
    static get properties() {
      return {
        enabledExistingButtons: {
          type: Array,
          value: () => {
            return [];
          },
        },

        existingCheck: {
          type: Array,
        },

        existingDataName: {
          type: String,
          value: 'tableData',
        },

        existingValues: {
          type: Object,
        },

        force: {
          type: Boolean,
          value: false,
        },

        tableData: {
          type: Array,
        },
      };
    }

    /**
     */
    static get observers() {
      return ['existingDataNameChanged(existingDataName)'];
    }

    /**
     * @param {String} existingDataName Existing data name
     */
    existingDataNameChanged(existingDataName) {
      this._createMethodObserver(
          `populateExistingValues(existingCheck, ${existingDataName}.*, force)`,
          true
      );
    }

    /**
     * @param {Array} existingCheck Existing fields check
     * @param {Array} tableData Table data
     * @param {Boolean} force Force a refresh
     */
    populateExistingValues(existingCheck, tableData, force = false) {
      if (!existingCheck || existingCheck.length === 0) return;
      if (!tableData || !tableData.base) return;

      let existingData = {};

      existingCheck.forEach((field) => {
        let values;

        values = tableData.base.map((existing) => {
          return existing[field].toLowerCase().trim();
        });

        existingData[field] = values;
      });
      this.set('enabledExistingButtons', []);

      const allFields = Object.keys(existingData);
      allFields.forEach((field) => {
        if (!this.enabledExistingButtons.includes(field)) {
          AromaHelper.prototype._fireEvent('disable-create-button', {}, true);
        }

        if (existingData[field].length > 0) {
          // enable the create button
          this.push('enabledExistingButtons', field);
          AromaHelper.prototype._fireEvent('enable-create-button', {}, true);
        }
      });

      this.set('existingValues', existingData);

      // this gets triggered far to often,
      // we need to debounce this or limit it only setting once.
      AromaHelper.prototype._fireEvent('create-form-existing', {
        existingValues: this.existingValues,
      });
      this.set('force', false);
    }

    /**
     * @param {Event} event Event
     */
    updateExistingCheck(event) {
      if (this.tableData) {
        this.set('force', true);
      }
    }

    /**
     * @param {String} field Name of the field to check
     * @param {String} values Value supplied
     * @return {Boolean} Check existing fields
     */
    validateExistingField(field, values) {
      if (!this.existingCheck.includes(field) || !this.existingValues[field]) {
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

      existingValuesKeys.forEach((key) => {
        const removeExistingIndex = existingValues[key].findIndex(
            (existingValue) => {
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

export default ExistingCheckMixin;
