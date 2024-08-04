// login user
const loginUser = async () => {
  res.json({ mssg: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  res.json({ mssg: "signup user" });
};

module.exports = { loginUser, signupUser };
