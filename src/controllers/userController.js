const bcrypt = require("bcryptjs");
const prisma = require("@prisma/client").PrismaClient;
const generateToken = require("../utils/generateToken");

const prismaClient = new prisma();

// ✅ Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role, ngoId } = req.body;

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            ngoId,
        },
    });

    res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id),
    });
};

// ✅ Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
    });
};

module.exports = { registerUser, loginUser };
