function signup(body) {
  return fetch("http://localhost:3000/auth/signup/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function login(body) {
  return fetch("http://localhost:3000/auth/login/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function logout(token) {
  return fetch("http://localhost:3000/auth/logout/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

let userToken;

// =============================================== SIGNUP TEST ===============================================

test("signup a user", async () => {
  const body = {
    username: "test",
    email: "test@gmail.com",
    password: "test",
  };

  const data = await signup({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  if (!data?.user) return;

  data.token = "";
  data.id = "";

  expect(data).toEqual({
    id: "",
    username: body.username,
    email: body.email,
    avatar: "",
    isVerified: false,
    role: "user",
    token: "",
  });
});

test("signup an existed user", async () => {
  const body = {
    username: "test",
    email: "test@gmail.com",
    password: "test",
  };

  const data = await signup({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  expect(data).toEqual({
    message: "Something went wrong",
  });
});

function checkSignupFields() {
  const fields = [
    { name: "email", value: "test@gmail.com" },
    { name: "password", value: "test" },
  ];

  for (let field of fields) {
    test(`signup a user without ${field.name}`, async () => {
      let body = {};

      for (let field2 of fields) {
        if (field2.name !== field.name) body[field2.name] = field2.value;
      }

      const data = await signup({
        username: body.username,
        email: body.email,
        password: body.password,
      });

      expect(data).toEqual({
        message: "Validation failure",
        description: {
          message: `The ${field.name} field must be defined`,
          rule: "required",
          field: field.name,
        },
      });
    });
  }
}

checkSignupFields();

// =============================================== LOGIN TEST ===============================================

test("login a user", async () => {
  // username = test
  const body = {
    email: "test@gmail.com",
    password: "test",
  };

  const data = await login({
    email: body.email,
    password: body.password,
  });

  userToken = data.token;

  data.token = "";
  data.id = "";
  data.isVerified = false;

  expect(data).toEqual({
    id: "",
    username: "test",
    email: body.email,
    avatar: "",
    isVerified: false,
    role: "user",
    token: "",
  });
});

function checkLoginFields() {
  const fields = [
    { name: "email", value: "test@gmail.com" },
    { name: "password", value: "test" },
  ];

  for (let field of fields) {
    test(`login a user without ${field.name}`, async () => {
      let body = {};

      for (let field2 of fields) {
        if (field2.name !== field.name) body[field2.name] = field2.value;
      }

      const data = await login({
        email: body.email,
        password: body.password,
      });

      expect(data).toEqual({
        message: "Validation failure",
        description: {
          message: `The ${field.name} field must be defined`,
          rule: "required",
          field: field.name,
        },
      });
    });
  }
}

checkLoginFields();

// =============================================== LOGOUT TEST ===============================================

test("logout a user", async () => {
  const data = await logout(userToken);

  expect(data).toEqual({
    message: "Signed out",
  });
});

test("logout a user without token", async () => {
  const data = await logout("");

  expect(data).toEqual({
    message: "jwt must be provided",
  });
});
