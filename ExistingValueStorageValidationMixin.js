
import existingValueStorageMixin from './ExistingValueStorageMixin.js';

const ExistingValueStorageValidationMixin = (superClass) => {
  
  class extends existingValueStorageMixin(superClass) {
    /**
     * Form validation
     */
    validateExistingField() {
        const fieldConvert = this.existingFieldConvert(this.field);
        if (this.existingCheck && this.existingCheck.includes) {
          if (this.existingCheck.includes(fieldConvert)) {
            if (this.validateExistingField(fieldConvert, values)) {
              // failed validation
              console.error(`${this.field} value already exists`)
              return false;
            } else {
              this.set(`invalids.${this.field}`, false);
            }
          }
        }
      }
    }
  };

export default ExistingValueStorageValidationMixin;
