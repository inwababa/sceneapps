const User = require("../model/user");
const Profile = User.users

exports.Update = (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, {$set:{first_name : req.body.first_name,
        last_name : req.body.last_name,
        username: req.body.username,
        dob: req.body.dob
        }}, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
          });
        } else res.status(200).json({ data, message: "Profile was updated successfully." });
      })
      .catch(err => {
        res.status(500).json({
          message: "Error updating Profile with id=" + id
        });
      });
  };