const {queryDatabase} = require('../../services/db/query');
const bcrypt = require('bcrypt');

async function createUser({ UserName, Password, Gmail, Role, ParishId }) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const query = `INSERT INTO user (UserName, Password, Gmail, Role, Erased, ParishId) VALUES (?, ?, ?, ?, 0, ?)`;
    const values = [UserName, hashedPassword, Gmail, Role, ParishId];

    try {
        const result = await queryDatabase(query, values);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUsersLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder) {
    let query = `SELECT * FROM User WHERE Erased = 0`;

    if (globalFilter) {
        query += ` AND UserName LIKE '%${globalFilter}%'`;
    }

    if (sortField && sortOrder) {
        query += ` ORDER BY ${sortField} ${sortOrder === '1' ? 'ASC' : 'DESC'}`;
    }

    query += ` LIMIT ${startIndex}, ${numRows}`;

    return query;


}

async function getTotalUsers(globalFilter) {
    let totalFilasQuery = `SELECT COUNT(*) AS totalFilas FROM User WHERE Erased = 0`;
    if (globalFilter) {
        totalFilasQuery += ` AND UserName LIKE '%${globalFilter}%'`;
    }

    return totalFilasQuery;
}

async function getUserById(id) {
    const query = `SELECT * FROM user WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, updateData) {
    let query = `UPDATE user SET `;
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

async function deleteUser(id) {
    const query = `UPDATE user SET Erased = 1 WHERE Id = ?`;

    try {
        const result = await queryDatabase(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, getUsersLazyLoading, getTotalUsers, getUserById, updateUser, deleteUser };
