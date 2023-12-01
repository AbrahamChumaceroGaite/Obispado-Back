const {queryDatabase} = require('../../services/db/query');

async function getSignatoriesLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder) {
    let query = `SELECT * FROM Signatory WHERE Erased = 0`;

    if (globalFilter) {
        query += ` AND Name LIKE '%${globalFilter}%'`;
    }

    if (sortField && sortOrder) {
        query += ` ORDER BY ${sortField} ${sortOrder === '1' ? 'ASC' : 'DESC'}`;
    }

    query += ` LIMIT ${startIndex}, ${numRows}`;

    return query;


}

async function getSignatories() {
    let query = `SELECT * FROM Signatory WHERE Erased = 0`;

    const values = [];

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getTotalSignatories(globalFilter) {
    let totalFilasQuery = `SELECT COUNT(*) AS totalFilas FROM Signatory WHERE Erased = 0`;
    if (globalFilter) {
        totalFilasQuery += ` AND Name LIKE '%${globalFilter}%'`;
    }

    return totalFilasQuery;
}

async function createSignatory({ Name, SurName, Position, Verified }) {
    const query = `INSERT INTO signatory (Name, SurName, Position, Verified, Erased) VALUES (?, ?, ?, ?, 0)`;
    const values = [Name, SurName, Position, Verified];

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getSignatoryById(id) {
    const query = `SELECT * FROM signatory WHERE Id = ?`;
    const values = [id];

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getAllParishes() {
    const query = `SELECT Id, Name FROM parish`;

    try {
        const result = await queryDatabase(query);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateSignatory(id, updateFields) {
    const setClauses = Object.keys(updateFields).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updateFields);
    values.push(id);

    const query = `UPDATE signatory SET ${setClauses} WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteSignatory(id) {
    const query = `UPDATE signatory SET erased = 1 WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getSignatoriesLazyLoading, getSignatories, createSignatory, getSignatoryById, getAllParishes, getTotalSignatories, updateSignatory, deleteSignatory };
