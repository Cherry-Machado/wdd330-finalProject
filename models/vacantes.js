const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

// Define the schema for the Vacante model
const vacantesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: 'The name of the vacancy is required.',
    trim: true
  },
  empresa: {
    type: String,
    trim: true,
  },
  ubicacion: {
    type: String,
    required: 'The location of the vacancy is required.',
    trim: true
  },
  salario: {
    type: String,
    default: 0,
    trim: true
  },
  contrato: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true,
  },
   skills: [String],
   candidatos: [
    {
      nombre: String,
      email: String,
      cv: String
      }
   ]
});

// Middleware to set the URL before saving
vacantesSchema.pre('save', function(next) {
  const vacante = this;
  if (!vacante.isModified('titulo')) {
    return next();
  }
  
  // Generate a URL slug from the title
  vacante.url = slug(vacante.titulo, { lower: true });
  
  // Append a unique identifier to the URL
  vacante.url += `-${shortid.generate()}`;
  
  next();
});

module.exports = mongoose.model('vacante', vacantesSchema);