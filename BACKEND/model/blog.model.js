const mongoose = require('mongoose');

const AiMetadataSchema = new mongoose.Schema({
  prompt: { type: String },
  model: { type: String },
  modelVersion: { type: String },
  references: [
    {
      source: String,
      quote: String,
      confidence: Number,
    }
  ],
  checks: {
    plagiarismScore: Number,
    profanity: Boolean,
    seoScore: Number
  },
  generatedAt: { type: Date, default: Date.now }
}, { _id: false });

const AuditSchema = new mongoose.Schema({
  action: { type: String }, // e.g. 'created_by_ai', 'approved', 'published', 'reverted'
  by: { type: String },
  at: { type: Date, default: Date.now },
  note: { type: String }
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  about: { type: String, select: true }, // full HTML body
  category: { type: String, required: true },
  adminName: { type: String },
  adminphoto: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blogImage: {
    public_id: String,
    url: String
  },
  tags: [{ type: String }],
  seo_meta: {
    title: String,
    description: String,
    keywords: [String]
  },

  // NEW fields for AI + safety
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  aiGenerated: { type: Boolean, default: false },
  aiMetadata: { type: AiMetadataSchema, default: {} },
  auditTrail: { type: [AuditSchema], default: [] },

  publishedAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);