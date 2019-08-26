import * as mongoose from 'mongoose';

const FieldSchema = mongoose.Schema({
  fieldPath: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    required: true
  },
  fieldOptions: {
    isRequired: {
      type: Boolean,
      required: true,
      default: false
    },
    defaultValue: {
      required: false
    },
    ref: {
      type: String,
      required: false
    }
  }
}, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

FieldSchema.virtual('fieldName').get(function() {
  return this.fieldPath.split('.').pop();
});

export const StructureSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  options: {
    generateSPV: {
      type: Boolean,
      default: false
    },
    allowUnauthenticatedFetch: {
      type: Boolean,
      default: false
    }
  },
  fields: [FieldSchema]
}, {
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });
