# Sample E-Commerce — Next.js + TypeScript + RTK Query

## Run

```bash
npm install
cp .env.local.example .env.local   # optional; leave empty to use mock data
npm run dev
```

Open http://localhost:3000

## How data flows

- UI components call RTK Query hooks (`useGetProductsQuery`, `useGetProductByIdQuery`).
- Those hooks live in `src/store/api/productsApi.ts`.
- While `NEXT_PUBLIC_API_BASE_URL` is empty, the API slice returns **mock data**
  (`src/lib/mockData.ts`) via `queryFn`.
- Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api` in `.env.local`
  and the same hooks hit your **Spring Boot** backend instead.

## Connecting Spring Boot later

The frontend expects these endpoints (JSON):

| Method | Path                  | Returns        |
|--------|-----------------------|----------------|
| GET    | `/api/products`       | `Product[]`    |
| GET    | `/api/products/{id}`  | `Product`      |

Matching Spring Boot controller:

```java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
```

The `Product` entity fields must match `src/types/index.ts`
(`id, name, description, price, imageUrl, category, stock`).

To switch off mock data, just make sure `NEXT_PUBLIC_API_BASE_URL` is set —
the `USE_MOCK` flag in `productsApi.ts` keys off it automatically.
