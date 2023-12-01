const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
require('dotenv').config();

const connection = mysql.createConnection({
/*   host: process.env.DB_HOSTCOOLIFYP, */
  host: process.env.DB_HOSTCOOLIFY,
/*   port: process.env.DB_PORTCOOLIFY, */
  user: process.env.DB_USERCOOLIFY,
  password: process.env.DB_PASSWORDCOOLIFY,
  database: process.env.DB_DATABASECOOLIFY
});

//Actualizar la encryptacion para las contraseñas del anterior backend

/* connection.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    const query = `SELECT Id, Password FROM user`;
    connection.query(query, (error, results) => {
      if (error) throw error;
    
      // Recorrer los resultados y actualizar las contraseñas con bcrypt
      results.forEach(row => {
        // Encriptar la contraseña con bcrypt
        const hashedPassword = bcrypt.hashSync(row.Password, 10);
    
        // Actualizar la contraseña en la base de datos
        const updateQuery = `UPDATE user SET Password = ? WHERE Id = ?`;
        connection.query(updateQuery, [hashedPassword, row.Id], (updateError, updateResults) => {
          if (updateError) throw updateError;
          console.log(`Contraseña actualizada para el usuario con ID ${row.Id}`);
        });
      });
    
      // Cerrar la conexión a la base de datos
      connection.end();
    });
}); */

module.exports = {connection};
