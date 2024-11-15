var express = require("express");
const mongoose = require("mongoose");
const cors =require('cors');

var app = express();
app.use(cors());
// Connect to MongoDB
var mongoDB = 'mongodb://127.0.0.1/MyDb';
mongoose.connect(mongoDB).then(() => {
    console.log("DB Connection is successful...");
}).catch((err) => {
    console.error("DB Connection failed:", err);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Listen on port 8003
app.listen(8003, function () {
    console.log("Server is listening at http://localhost:8003");
});

// Define the schema
var Schema = mongoose.Schema;

// Create a new Doctor schema
var DoctorSchema = new Schema({
  "id": Number,
  "name": String,
  "specialization": String,
  "phone_number": Number,
  "location": String
});

// Model for the Doctor schema
const DoctorTable = mongoose.model('doctor', DoctorSchema);

// Get all doctors
app.get("/getAllDoctors", function (req, res) {
    DoctorTable.find()
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
});

// For inserting a doctor record
app.use(express.json());

app.post("/insertDoctor", function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var specialization = req.body.specialization;
    var phone_number = req.body.phone_number;
    var location = req.body.location;

    // Create a new doctor object with the data received
    var doctorObj = new DoctorTable({
        "id": id,
        "name": name,
        "specialization": specialization,
        "phone_number": phone_number,
        "location": location
    });

    // Save the doctor object to the database
    doctorObj.save()
        .then((data) => {
            console.log("Doctor data inserted successfully:", data);
            res.status(200).send(data);  // Send a successful response with the inserted data
        })
        .catch((err) => {
            console.error("Error inserting doctor data:", err);
            res.status(400).send(err);  // Send an error response if insertion fails
        });
});

// For updating a record in the table.
/*app.put("/updateData", function (req, res) {

    var id = req.body.id;
    var name = req.body.name;
    var specialization = req.body.specialization;
    var phone_number = req.body.phone_number;
    var location = req.body.location;
  
    DoctorTable.updateOne({ id: id }, { name: name, specialization: specialization, phone_number: phone_number, location: location }, function (err, docs) {
        if (err) {
            console.log(err); 
            res.send(err);
        } else {
            console.log(docs); 
            res.status(201).send("Record updated Successfully.");
        }
    });
});*/
app.put("/updateData", async function (req, res) {
    console.log("Request received at /updateData"); // Check if the route is hit
    console.log("Request body:", req.body);         // Check if req.body is parsed correctly
    try {
        const { id, name, specialization, phone_number, location } = req.body;
        
        const result = await DoctorTable.updateOne(
            { id: id },
            { name, specialization, phone_number, location }
        );
  
        console.log("Update result:", result);       // Check if update is successful
        
        if (result.modifiedCount > 0) {
            res.status(201).send("Record updated successfully.");
        } else {
            res.status(404).send("Record not found or no changes made.");
        }
    } catch (err) {
        console.error("Error updating record:", err);
        res.status(500).send("Internal Server Error");
    }
  })

// Delete a record based on a condition.
app.delete("/deleteRecord/:id", function (req, res) {
    const { id } = req.params;
    console.log("Given id to delete is: " + id);

    DoctorTable.deleteMany({ "id": id })
      .then(function () {
          console.log("Record deleted successfully...");
          res.status(200).send("Record deleted Successfully.");
      })
      .catch(function (err) {
          console.error(err);
          res.status(400).send(err);
      });
});

