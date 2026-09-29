# Restaurant Ordering & Order Management Application

A responsive restaurant online-ordering application built with Next.js, TypeScript, and Tailwind CSS.

The application provides a customer-facing menu, search and category filtering, shopping cart, checkout flow, and an admin order management page.



## Features

### Restaurant Menu

- Displays restaurant name and basic information.
- Displays menu items with:
  - Name
  - Price
  - Description
  - Image
  - Category
- Menu data is provided through an API route.
- Search menu items by name.
- Filter menu items by category.
- Responsive design for desktop and mobile devices.

### Shopping Cart

- Add menu items to cart.
- Increase item quantity.
- Decrease item quantity.
- Remove items from cart.
- Automatically calculates:
  - Subtotal
  - Tax
  - Grand Total
- Cart data is persisted using browser localStorage.

### Checkout

- Customer checkout form with:
  - Customer name
  - Mobile number
  - Email
  - Address
- Client-side form validation.
- Place Order functionality.
- Order is submitted through an API route.
- Handles successful and failed order requests.
- Displays order-success confirmation after successful submission.

### Admin Order Management

- Separate admin orders page.
- Displays sample/received orders.
- Supports order statuses:
  - Pending
  - Accepted
  - Preparing
  - Completed
- Filter orders by status.
- View basic order details.
- Change the status of an order.

---

## Technology Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- React Context API
- REST-style API routes
- localStorage

---

## Project Structure

```text
restaurant-ordering-app/
│
├── app/
│   ├── admin/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── menu/
│   │   │   └── route.ts
│   │   └── orders/
│   │       └── route.ts
│   │
│   ├── checkout/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── CartSummary.tsx
│   ├── Header.tsx
│   └── MenuCard.tsx
│
├── context/
│   └── CartContext.tsx
│
├── data/
│   ├── menu.ts
│   └── orders.ts
│
├── types/
│   └── index.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── .npmrc
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
