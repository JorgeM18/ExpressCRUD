const Users = require('./../models/users')

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    return res.status(200).json({
      status: 200,
      response: users || []
    })
  } catch(error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    })
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({
        status: 404,
        message: `User with id: ${userId} was not found in the database`
    })
    return res.status(200).json({
      status: 200,
      response: user
    })
  } catch(error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

const createUser = (req, res) => {
  const { name, email, age, password } = req.body;
  const userDB = new Users({ name, email, age, password });
  try {
    userDB.save((err, user) => {
      if (err) throw Error(err);
      return res.status(200).json({
        status: 200,
        response: user
      })
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error
    })
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, age, password } = req.body;
  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, { name, email, age, password});
    if (!updatedUser) return res.status(400).json({
      status: 400,
      message: "Bad request"
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(400).json({
      status: 400,
      message: `Couldn't delete user with id: ${userId}. Please try again or check your request parameters`
    })
    return res.status(200).json({
      status: 200,
      response: deletedUser
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }