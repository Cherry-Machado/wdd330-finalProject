const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    token: String,
    expira: Date, 
    imagen: String
});

// Method for hashing passwords
usuariosSchema.pre('save', async function(next) {
   // if the password is already hashed
    if(!this.isModified('password')) {
        return next(); // stop execution
    }
    // if not hashed
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});
// Send alert when a user is already registered
usuariosSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoError' && error.code === 11000 ){
        next('That email is already registered');
    } else {
        next(error);
    }
});

// Authenticate Users
usuariosSchema.methods = {
    compararPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema);