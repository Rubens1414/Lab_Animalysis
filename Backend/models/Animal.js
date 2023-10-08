const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  Animal_ID:  { type: String, index: true },
  Name: String,
  DateTime: String,
  Found_Location: { type: String, index: true },
  Intake_Type: String,
  Intake_Condition: String,
  Animal_Type: String,
  Sex_upon_Intake: String,
  Age_upon_Intake: String,
  Breed: String,
  Color: String,
});

const Animals = mongoose.model('animals', animalSchema);

module.exports = Animals;
