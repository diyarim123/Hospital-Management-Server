const db = require('../config/dbConfig');


const checkIdExists = (tableName, idColumn) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            const record = await db(tableName).where({ [idColumn]: id }).first();

            if (!record) {
                return res.status(404).json({ error: `No record found with ID ${id} in ${tableName}` });
            }

            next();
        } catch (err) {
            res.status(500).json({ error: 'Internal server error', details: err.message });
        }
    };
};

module.exports = checkIdExists;
