import { Request, Response } from 'express';

interface IBook {
    id: number;
    author: string;
    title: string;
    tahun: {
        dibuat: number;
        diterbitkan: number;
    };
}

export default IBook;
