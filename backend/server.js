const express = require("express");
const cors = require("cors");
require("dotenv").config();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Netlify puede entregar el body como Buffer
app.use((req, res, next) => {
if (Buffer.isBuffer(req.body) && req.body.length > 0) {
    try {
        req.body = JSON.parse(req.body.toString("utf8"));
    } catch (error) {
        console.error("Error convirtiendo Buffer:", error);
    }
}

  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("BODY:", req.body);

  next();
});

// Sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "autotaller_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Rutas
app.use("/api/citas", require("./routes/citas"));
app.use("/api/configuracion", require("./routes/configuracion"));
app.use("/api/login", require("./routes/login"));

// Ruta de inicio
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la API"
  });
});

// Puerto local
const PORT = process.env.PORT || 3000;

// Solo ejecutar listen localmente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Netlify
module.exports = app;