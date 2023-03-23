export interface IBook {
    id: number;
    author: string;
    title: string;
    tahun: {
        dibuat: number;
        diterbitkan: number;
    };
}
