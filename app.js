const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const verifyToken = require('./middleware/middleware'); // Importar el middleware verifyToken

// Puerto de conexion
const PORT = 80;

// Parsear el contenido enviado
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importa las rutas
const r_parish = require("./routes/parish/parish");
const r_user = require("./routes/user/user");
const r_signatory = require("./routes/signatory/signatory");
const r_certificate = require("./routes/certificate/certificate");
const l_login = require("./services/login");

// Direccion de Prueba
app.get("/api/test", (req, res) => {
  res.send("El Servidor esta bien prendido");
});

//ruta de Login
app.use("/api/Token", l_login);

// Middleware verifyToken para todas las rutas a partir de aquí
/* app.use(verifyToken); */

// Rutas protegidas que requieren token
app.use("/api/parish",  r_parish);
app.use("/api/user", r_user);
app.use("/api/signatory",  r_signatory);
app.use("/api/certificate", r_certificate);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error del servidor' });
  });

app.listen(PORT, () => {
  console.log(`Servidor Prendido en el puerto ${PORT}`);
});
