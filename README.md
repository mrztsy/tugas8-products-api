# Tugas 8 — API Products (NestJS + MongoDB/Mongoose)

API CRUD Products menggunakan NestJS dan MongoDB Atlas (Mongoose), sesuai spesifikasi tugas.

## Cara Menjalankan

### 1. Install dependencies

```bash
npm install
```

### 2. Setup koneksi MongoDB Atlas

Buka file `.env` , lalu ganti `MONGODB_URI` dengan connection string Atlas milikmu:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=3000
```

> Connection string bisa didapat dari MongoDB Atlas → Database → Connect → Drivers.
> Pastikan IP Address kamu sudah ditambahkan di Network Access (atau pakai `0.0.0.0/0` untuk akses dari mana saja, khusus untuk keperluan tugas/development).

### 3. Jalankan server (development, auto-reload)

```bash
npm run start:dev
```

Server berjalan di `http://localhost:3000`

### 4. Build untuk production

```bash
npm run build
npm run start:prod
```

## Struktur Folder

```
src/
├── app.module.ts          # Root module, setup ConfigModule & MongooseModule
├── main.ts                 # Entry point, global ValidationPipe
└── products/
    ├── products.module.ts
    ├── products.controller.ts
    ├── products.service.ts
    ├── dto/
    │   ├── create-product.dto.ts
    │   └── update-product.dto.ts
    └── schemas/
        └── product.schema.ts
```

## Endpoint API

| Endpoint                     | Method | Deskripsi                         |
| ---------------------------- | ------ | --------------------------------- |
| `/products`                  | POST   | Menambah produk baru              |
| `/products`                  | GET    | Mendapatkan semua produk          |
| `/products/:id`              | GET    | Mendapatkan produk berdasarkan ID |
| `/products/:id`              | PUT    | Mengupdate produk                 |
| `/products/:id`              | DELETE | Menghapus produk                  |
| `/products/search?q=keyword` | GET    | Mencari produk berdasarkan nama   |

## Contoh Request

### Tambah produk (POST /products)

```json
{
  "name": "Laptop Gaming",
  "price": 15000000,
  "description": "Laptop Gaming Acer Nitro",
  "category": "Aksesoris Komputer",
  "stock": 25,
  "isAvailable": true
}
```

### Update produk (PUT /products/:id)

```json
{
  "price": 400000,
  "stock": 20
}
```

### Search produk

```
GET /products/search?q=keyboard
```

## Error Handling

- **400 Bad Request** → terjadi saat:
  - Body request tidak valid (misal `name` kosong, `price` negatif)
  - Format `:id` bukan ObjectId MongoDB yang valid
  - Query `q` pada search kosong
- **404 Not Found** → terjadi saat produk dengan `:id` yang diberikan tidak ditemukan di database

## Fitur yang Diimplementasikan

- MongoDB Atlas (cloud database) via Mongoose, koneksi diatur lewat `.env`
- Schema validation menggunakan decorator `@Prop()` (Mongoose) + `class-validator` di DTO
- CRUD lengkap (Create, Read, Update, Delete)
- Error handling 404 & 400
- Search by name (`/products/search?q=keyword`, case-insensitive)
- `createdAt` & `updatedAt` otomatis (`timestamps: true` di schema)
