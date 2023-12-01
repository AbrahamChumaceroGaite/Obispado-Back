const {queryDatabase} = require('../../services/db/query');

async function insertParish({ Name, Direction, Phone }) {
    const query = `INSERT INTO Parish (Name, Direction, Phone, Erased) VALUES (?, ?, ?, 0)`;
    const values = [Name, Direction, Phone];

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getParishesLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder) {
    let query = `SELECT * FROM Parish WHERE Erased = 0`;

    if (globalFilter) {
        query += ` AND Name LIKE '%${globalFilter}%'`;
    }

    if (sortField && sortOrder) {
        query += ` ORDER BY ${sortField} ${sortOrder === '1' ? 'ASC' : 'DESC'}`;
    }

    query += ` LIMIT ${startIndex}, ${numRows}`;

    return query;


}

async function getTotalParishes(globalFilter) {
    let totalFilasQuery = `SELECT COUNT(*) AS totalFilas FROM Parish WHERE Erased = 0`;
    if (globalFilter) {
        totalFilasQuery += ` AND Name LIKE '%${globalFilter}%'`;
    }

    return totalFilasQuery;
}

async function getParishById(id) {
    const query = `SELECT * FROM parish WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, [id]);
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

async function updateParish(id, updateData) {
    let query = `UPDATE parish SET `;
    const values = [];

    Object.keys(updateData).forEach((key, index) => {
        query += `${key} = ?${index < Object.keys(updateData).length - 1 ? ', ' : ''}`;
        values.push(updateData[key]);
    });

    query += ` WHERE Id = ?`;
    values.push(id);

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteParish(id) {
    const query = `UPDATE parish SET erased = 1 WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { insertParish, getParishesLazyLoading, getParishById, getAllParishes, getTotalParishes, updateParish, deleteParish };