# JavaScript Interview Questions

### 1. `null` vs `undefined`

- **`undefined`**: The default value when a variable is declared but not assigned.
- **`null`**: An intentional value used to represent an "empty" or "null" object.

---

### 2. `map()` vs `forEach()`

- **`map()`**: Transforms an array and returns a **new array**. It doesn't change the original.
- **`forEach()`**: Just loops through the array to perform actions. It **returns nothing**.

---

### 3. `==` vs `===`

- **`==`**: Loose equality. It compares **values** and converts types if they don't match.
- **`===`**: Strict equality. It compares both **value and type**. (Recommended).

---

### 4. Why use `async/await` for APIs?

- Makes asynchronous code look like **sequential code**.
- Much **easier to read** than `.then()` chains.
- Allows for cleaner error handling with `try/catch`.

---

### 5. Scope in JavaScript

- **Global**: Variables accessible anywhere in the script.
- **Function**: Variables accessible only inside the function they are declared in.
- **Block**: Variables (`let`/`const`) accessible only within the `{ }` brackets (e.g., `if` or `for` loops).

---
