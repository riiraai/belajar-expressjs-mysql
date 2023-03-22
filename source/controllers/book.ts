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

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');

    const data: IBook = req.body;

    if (!isValidData(data)) {
        return res.status(200).json({
            code: 400,
            success: false,
            message: 'Data yang anda masukkan tidak valid.',
            data: []
        });
    }

    let query = `INSERT INTO ${NAMESPACE} (author, title, tahun_dibuat, tahun_diterbitkan) VALUES ("${data.author}", "${data.title}", "${data.tahun.dibuat}", "${data.tahun.diterbitkan}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        code: 200,
                        success: true,
                        message: 'Berhasil Menambah Buku.',
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

export default { createBook, getAllBooks };
