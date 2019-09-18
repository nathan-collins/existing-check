import existingValueStorageMixin from './ExistingValueStorageMixin.js';

const ExistingValueStorageValidationMixin = (superClass) => {
  return class extends existingValueStorageMixin(superClass) {
    /**
     * @return {undefined}
     */
    validateExistingField() {
      const fieldConvert = this.existingFieldConvert(this.field);
      if (this.existingCheck && this.existingCheck.includes) {
        if (this.existingCheck.includes(fieldConvert)) {
          if (this.validateExistingField(fieldConvert)) {
            // failed validation
            console.error(`${this.field} value already exists`);
            return;
          }
        }
      }
    }
  };
};

export default ExistingValueStorageValidationMixin;
