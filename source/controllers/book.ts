import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import IBook from '../interfaces/book';

const NAMESPACE = 'Books';

function isValidData(data: IBook): boolean {
    if (data.author == undefined || data.title == undefined || data.tahun.diterbitkan == undefined || data.tahun.dibuat == undefined) {
        return false;
    }

    if (data.author == '' || data.title == '' || data.tahun.diterbitkan == 0 || data.tahun.dibuat == 0) {
        return false;
    }

    if (typeof data.author !== 'string' || typeof data.title !== 'string' || typeof data.tahun.diterbitkan !== 'number' || typeof data.tahun.dibuat !== 'number') {
        return false;
    }

    return true;
}

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating books');

    const data: IBook = req.body;
    const id = req.params.id;

    if (!isValidData(data)) {
        return res.status(200).json({
            code: 400,
            success: false,
            message: 'Data yang anda masukkan tidak valid.',
            data: []
        });
    }

    let query = `UPDATE ${NAMESPACE} SET author = "${data.author}", title = "${data.title}", tahun_dibuat = "${data.tahun.dibuat}", tahun_diterbitkan = "${data.tahun.diterbitkan}" WHERE id = ${id}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book updated: ', result);

                    return res.status(200).json({
                        code: 200,
                        success: true,
                        message: 'Berhasil Mengubah Buku.',
                        data: []
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');

                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books from array');

    const data: IBook[] = req.body;

    if (data.length == 0) {
        return res.status(200).json({
            code: 400,
            success: false,
            message: 'Data yang anda masukkan tidak valid.',
            data: []
        });
    }

    let query = `INSERT INTO ${NAMESPACE} (author, title, tahun_dibuat, tahun_diterbitkan) VALUES `;
    let values = '';

    data.forEach((book, index) => {
        if (!isValidData(book)) {
            return res.status(200).json({
                code: 400,
                success: false,
                message: 'Data yang anda masukkan tidak valid.',
                data: []
            });
        }

        if (index == data.length - 1) {
            values += `("${book.author}", "${book.title}", "${book.tahun.dibuat}", "${book.tahun.diterbitkan}")`;
        } else {
            values += `("${book.author}", "${book.title}", "${book.tahun.dibuat}", "${book.tahun.diterbitkan}"), `;
        }
    });

    query += values;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        code: 200,
                        success: true
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');

                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    let query = `SELECT * FROM ${NAMESPACE}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        code: 200,
                        success: true,
                        message: 'Berhasil Mendapatkan Semua Buku.',
                        data: results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks, updateBook };
