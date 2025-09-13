const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  subscriberId: { type: mongoose.Schema.Types.ObjectId, ref: 'MerchantSubscriber', required: false },

  // what is being measured, e.g. "inference_request", "storage_gb", "api_call"
  metric: { type: String, required: true },

  // amount of units (e.g. requests count, GBs)
  units: { type: Number, required: true, default: 1 },

  // price per unit in smallest currency unit or decimal (choose one convention)
  costPerUnit: { type: Number, required: true, default: 0 },

  // totalCost = units * costPerUnit (computed automatically if not provided)
  totalCost: { type: Number, required: true },

  // currency code
  currency: { type: String, default: 'USD' },

  // optional human description
  description: { type: String },

  // an event id for idempotency (optional)
  eventId: { type: String, index: true },

  // free-form metadata (useful to store request ids, invoice hints, etc.)
  metadata: { type: mongoose.Schema.Types.Mixed },

  // mark if this usage has been invoiced / charged
  invoiced: { type: Boolean, default: false },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },

  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

// compute totalCost if not provided / when units or costPerUnit changed
usageLogSchema.pre('validate', function (next) {
  try {
    // if totalCost not set or units/costPerUnit modified, compute it
    if (this.isNew || this.isModified('units') || this.isModified('costPerUnit') || this.totalCost == null) {
      const u = Number(this.units || 0);
      const p = Number(this.costPerUnit || 0);
      // round to 6 decimals just to be safe with fractional pricing
      this.totalCost = parseFloat((u * p).toFixed(6));
    }
    next();
  } catch (err) {
    next(err);
  }
});

// useful compound index to query recent usage per merchant/subscriber
usageLogSchema.index({ merchantId: 1, subscriberId: 1, metric: 1, createdAt: -1 });

// single-field indexes
usageLogSchema.index({ eventId: 1 });
usageLogSchema.index({ createdAt: -1 });

module.exports = mongoose.models.UsageLog || mongoose.model('UsageLog', usageLogSchema);
