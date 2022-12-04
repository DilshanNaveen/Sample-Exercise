import axios from "axios";
import { SERVER_URL } from "../config";
import Book from "../type/book";

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const { data } : { data: Book[] } = await axios.get(`${SERVER_URL}/books`);
        return data;
    } catch (err: any) {
        console.log(`Get all books api failed: ${err.message}`);
        return [];
    }
};

export const getBookById = async (id: string): Promise<Book> => {
    try {
        const { data } : { data: Book } = await axios.get(`${SERVER_URL}/book/${id}`);
        return data as Book;
    } catch (err: any) {
        console.log(`Get book by id api failed: ${err.message}`)
        return {} as Book;
    }
}; 

export const checkInBook = async (id: string): Promise<boolean> => {
    try {
        const { data } : { data: Book } = await axios.get(`${SERVER_URL}/check-in?id=${id}`);
        return data.ID ? true : false;
    } catch (err: any) {
        console.log(`Return book id api failed: ${err.message}`)
        return false;
    }
}; 

export const checkoutBook = async (id: string): Promise<boolean> => {
    try {
        const { data } : { data: Book } = await axios.get(`${SERVER_URL}/checkout?id=${id}`);
        return data.ID ? true : false;
    } catch (err: any) {
        console.log(`Checkout book api failed: ${err.message}`)
        return false;
    }
}; 