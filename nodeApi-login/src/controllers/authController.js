// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const { secretKey } = require('../config/jwt');
const UserSchema = require('../models/User')

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< insert user data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.register = async (req, res) => {
  try {
    // Get values/data from the user request body
    const { name, password,role,email } = req.body;

    // Check if all fields are provided
    if (!(name && password && role && email)) {
      return res.status(400).send("All fields are required");
    }

   // Check if the user already exists
    const userExists = await UserSchema.findOne({ email });
    if (userExists) {
      return res.status(401).send("This username is already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user in the database
    const user = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Create JWT token
    const token = jwt.sign({
      id: user._id, name: user.name, role: user.role
    }, secretKey, {
      expiresIn: '1h',
    });

    // Set the token in the response and send user details
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< login Data handler >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// login in controller
exports.login = async (req, res) => {
  try {
    // Get data from the request body
    const { name, password } = req.body;
    console.log(name);
    // Check if both username and password are provided
    if (!(name && password)) {
      return res.status(400).send('All fields are required');
    }

    // Check if the user is in the database
    const userFound = await UserSchema.findOne({ name });

    // If user is not found
    if (!userFound) {
      return res.status(401).json({ message: 'No user found' });
    }

    // Match the password
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    // If password does not match
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If both username and password are valid, generate and send the JWT token
    const token = jwt.sign(
      {
        id: userFound._id,
        name: userFound.name,
        role: userFound.role,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ user: userFound, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< sign up using google handler >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.registerGoogleUser = async (req, res) => {
  try {
    // Get data from the request body
    const { name, email, role,password } = req.body;

    // Check if the user is already in the database
    const userExists = await UserSchema.findOne({ email });
    if (userExists) {
      return res.status(401).send("This Google user is already registered");
    }

    const hashedPasswordGoogle = await bcrypt.hash(password, 8);


    const googleUser = await UserSchema.create({
      name,
      email,
      password:hashedPasswordGoogle,
      role,
      authSource: 'google', // Assuming you want to set the authSource to 'google'
    });

    // Create a token with user information
    const googleUserToken = jwt.sign(
      {
        id: googleUser._id,
        email: googleUser.email,
        role: googleUser.role,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ googleUser, googleUserToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< sign up using facbook handler >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

exports.registerFacebookUser = async (req, res) => {
  try {
    // Get data from the request body
    const { name, email, role,password } = req.body;

    // Check if the user is already in the database
    const userExists = await UserSchema.findOne({ email });
    if (userExists) {
      return res.status(401).send("This Google user is already registered");
    }

    const hashedPasswordFacebook = await bcrypt.hash(password, 8);


    const facbookUser = await UserSchema.create({
      name,
      email,
      password:hashedPasswordFacebook,
      role,
      authSource: 'facbook', // Assuming you want to set the authSource to 'google'
    });

    // Create a token with user information
    const facbookUserToken = jwt.sign(
      {
        id: facbookUser._id,
        email: facbookUser.email,
        role: facbookUser.role,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ facbookUser, facbookUserToken });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
