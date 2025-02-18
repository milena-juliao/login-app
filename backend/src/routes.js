const jwt = require("jsonwebtoken");
const { Router } = require("express");

const routes = Router();

const users = [
    {
        name: "admin",
        email: "admin@spsgroup.com.br",
        password: "1234",
        type: "admin",
    },
];

const findUserByEmail = (email) => users.find((user) => user.email === email);

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token é necessário!" });

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido!" });
        req.user = user;
        next();
    });
};

//rotas
routes.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (user && user.password === password) {
        const token = jwt.sign(
            { email: user.email, type: user.type },
            "secretkey",
            { expiresIn: "1h" }
        );

        return res.json({ token, type: user.type });
    } else {
        return res
            .status(401)
            .json({ message: "Informações de login incorretas!" });
    }
});

routes.post("/users", authenticateToken, (req, res) => {
    if (req.user.type !== "admin") {
        return res
            .status(403)
            .json({ message: "Apenas administradores podem criar usuários!" });
    }

    const { email, name, type, password } = req.body;

    if (findUserByEmail(email)) {
        return res.status(400).json({ message: "Email já cadastrado!" });
    }
    const newUser = { email, name, type, password };
    users.push(newUser);
    res.status(201).json(newUser);
});

routes.get("/listUsers", authenticateToken, (req, res) => {
    try {
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários!" });
    }
});

routes.delete("/users/:email", authenticateToken, (req, res) => {
    const { email } = req.params;
    const index = users.findIndex((user) => user.email === email);
    if (index === -1)
        return res.status(404).json({ message: "Usuário não encontrado!" });

    users.splice(index, 1);
    res.status(200).json({ message: "Usuário removido com sucesso!" });
});

routes.put("/users/:email", authenticateToken, (req, res) => {
    const { email } = req.params;
    const { name, type, password } = req.body;

    const user = findUserByEmail(email);
    if (!user)
        return res.status(404).json({ message: "Usuário não encontrado!" });

    user.name = name || user.name;
    user.type = type || user.type;
    user.password = password || user.password;

    res.status(200).json(user);
});

module.exports = routes;
