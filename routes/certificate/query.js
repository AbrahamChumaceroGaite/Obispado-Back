const {queryDatabase} = require('../../services/db/query');

async function insertCertificate({
    Name,
    SurName,
    Age,
    Dad,
    Mother,
    DateConfirmation,
    GoodParents,
    Confirming,
    NumberBook,
    NumberPage,
    NumberInvoice,
    Ci,
    Printed,
    Verified,
    ParishId,
    Baptize,
    Date,
}) {
    const query = `INSERT INTO certificate (Name, SurName, Age, Dad, Mother, DateConfirmation, GoodParents, Confirming, NumberBook, NumberPage, NumberInvoice, Ci, Printed, Verified, Erased, ParishId, Baptize, Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?);`;
    const values = [Name, SurName, Age, Dad, Mother, DateConfirmation, GoodParents, Confirming, NumberBook, NumberPage, NumberInvoice, Ci, Printed, Verified, ParishId, Baptize, Date];

    try {
        const results = await db.query(query, values);
        return { mensaje: "Registrado exitosamente" };
    } catch (error) {
        throw error;
    }
}

async function getCertificatesLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder) {
    let query = `SELECT * FROM Certificate WHERE Erased = 0`;

    if (globalFilter) {
        query += ` AND Name LIKE '%${globalFilter}%'`;
    }

    if (sortField && sortOrder) {
        query += ` ORDER BY ${sortField} ${sortOrder === '1' ? 'ASC' : 'DESC'}`;
    }

    query += ` LIMIT ${startIndex}, ${numRows}`;

    return query;


}

async function getTotalFilas(globalFilter) {
    let totalFilasQuery = `SELECT COUNT(*) AS totalFilas FROM Certificate WHERE Erased = 0`;
    if (globalFilter) {
        totalFilasQuery += ` AND Name LIKE '%${globalFilter}%'`;
    }

    return totalFilasQuery;
}


/* async function getTotalFilas(busqueda) {
    const totalFilasQuery = `SELECT COUNT(*) AS totalFilas FROM Certificate WHERE Erased = 0`;
    if (busqueda) {
        totalFilasQuery += ` AND Name LIKE '%${busqueda}%'`;
    }

    try {
        const results = await queryDatabase(totalFilasQuery);
        return results[0].totalFilas;
    } catch (error) {
        throw error;
    }
} */

async function getCertificateById(id) {
    const query = `SELECT * FROM certificate WHERE Id = ?`;

    try {
        const result = await db.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateCertificate(id, updateData) {
    let query = `UPDATE certificate SET `;
    const values = [];

    Object.keys(updateData).forEach((key, index) => {
        query += `${key} = ?${index < Object.keys(updateData).length - 1 ? ', ' : ''}`;
        values.push(updateData[key]);
    });

    query += ` WHERE Id = ?`;
    values.push(id);

    try {
        const result = await db.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteCertificate(id) {
    const query = `UPDATE certificate SET erased = 1 WHERE Id = ?`;

    try {
        const result = await db.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { insertCertificate, getCertificatesLazyLoading, getCertificateById, getTotalFilas, updateCertificate, deleteCertificate };
