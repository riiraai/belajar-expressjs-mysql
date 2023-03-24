# 📘 Documentation API belajar-expressjs-mysql
Backend - Simple Crud Book with expressjs and mysql
| No  | API Route Books             | Method | Description       | Request                                                | Response                  |
| --- | --------------------------- | ------ | ----------------- | ------------------------------------------------------ | ------------------------- |
| 1.  | {url}/books/get/books       | GET    | Get all books     | -                                                      | Status 200, Get All Books |
| 2.  | {url}/books/create-book     | POST   | Create a book     | { author, title, tahun.dibuat, tahun.diterbitkan }     | Status 200                |
| 3.  | {url}/books/update-book/:id | PUT    | Update a book     | { id, author, title, tahun.dibuat, tahun.diterbitkan } | Status 200, result        |
| 4.  | {url}/books/show-book/:id   | GET    | Show a book       | { id }                                                 | Status 200, result        |
| 5.  | {url}/books/delete-book/:id | DELETE | Delete a book     | { id }                                                 | Status 200                |
| 6.  | {url}/books/upload          | POST   | Upload Image Book | { image }                                              | Status 200, result        |

> ℹ You can use this repository with ```Use Templates```
