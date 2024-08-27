const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Conectar a MongoDB
mongoose
	.connect('mongodb://localhost:27017/instagram-clone', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Registro de usuario
app.post('/register', async (req, res) => {
	try {
		const { user, name, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ user, name, password: hashedPassword });
		await newUser.save();
		res.status(201).send('User registered');
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Inicio de sesión
app.post('/login', async (req, res) => {
	try {
		const { user, password } = req.body;
		const existingUser = await User.findOne({ user });
		if (!existingUser) return res.status(400).send('User not found');
		const isMatch = await bcrypt.compare(password, existingUser.password);
		if (!isMatch) return res.status(400).send('Invalid password');
		const token = jwt.sign({ id: existingUser._id }, 'your_jwt_secret');
		res.json({ token });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Crear un nuevo post
app.post('/posts', async (req, res) => {
	try {
		const { token, content } = req.body;
		const decoded = jwt.verify(token, 'your_jwt_secret');
		const newPost = new Post({ userId: decoded.id, content });
		await newPost.save();
		res.status(201).send('Post created');
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
