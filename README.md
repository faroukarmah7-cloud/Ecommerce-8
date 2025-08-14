# GH Marketplace - Buy/Sell Local Goods

This is a web application for buying and selling local goods in Ghana. It features a modern UI built with Tailwind CSS, dynamic product listings, user authentication, cart and payment modals, and support for Mobile Money (MoMo) payments.

## Features
- Responsive navigation bar and mobile menu
- Hero slider showcasing marketplace scenes
- Dynamic product grid (products managed in `main.js`)
- User registration and login (localStorage-based)
- Google Sign-In integration
- Cart management and checkout
- Payment modal with MoMo options
- OTP verification for payments and password reset
- User profile management
- Category details modal
- Seller onboarding section
- Custom styling via `style.css`

## File Structure
- `index.html` — Main HTML file, links to CSS and JS
- `style.css` — Custom styles for the app
- `main.js` — All custom JavaScript logic
- `login-navbar-profile.js` — (Optional) Additional JS for login/profile
- `IMAGE/` — Product and UI images

## How to Run
1. Clone or download the repository.
2. Open `index.html` in your browser.
3. All features work client-side; no backend required.

## Customization
- Add/edit products in the `products` array in `main.js`.
- Update images in the `IMAGE/` folder and reference them in product objects.
- Modify styles in `style.css` for branding.

## Dependencies
- [Tailwind CSS](https://cdn.tailwindcss.com) (CDN)
- Google Identity Services (CDN)

## Notes
- User data is stored in browser localStorage for demo purposes.
- Passwords are not securely stored; do not use real credentials.
- MoMo payment is simulated; no real transactions occur.

## License
This project is for educational/demo use. Please customize and secure before production use.
