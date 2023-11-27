// TODO: implement sign up logic here
// TODO: implement sign in logic here
// TODO: implement sign out logic here

export const signup = (req, res) => {
  const { username, email, password } = req.user;

  const newUser = {
    username,
    email,
    password,
  };

  const token = "36942323423";

  res.status(200).json({ user: newUser, token });
};

export const signin = (req, res) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
  };

  const token = "1263217896189";

  res.status(200).json({ user, token });
};

export const signout = (req, res) => {
  res.status(201).json({});
};
