
import existingValueStorageMixin from './ExistingValueStorageMixin.js';

const ExistingValueStorageValidationMixin = (superClass) =>
  
class extends existingValueStorageMixin(superClass) {
  validateExistingField() {
      const fieldConvert = this.existingFieldConvert(this.field);
      if (this.existingCheck && this.existingCheck.includes) {
        if (this.existingCheck.includes(fieldConvert)) {
          if (this.validateExistingField(fieldConvert, values)) {
            this.set(`invalids.${this.field}`, true);
            this.set(
                `errorMessages.${this.field}`,
                `unique-${AromaHelper.prototype.dashes(this.field)}`
            );

            return false;
          } else {
            this.set(`invalids.${this.field}`, false);
          }
        }
      }
    }
  }
}

export default ExistingValueStorageValidationMixin;
