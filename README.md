# Goal: Partner. 🚀

**The business of failure is over.**

Goal: Partner is an open-source alternative to traditional dating apps. Designed to break the paradox of platforms that thrive on keeping you scrolling, our goal is simple: helping you find a partner and leave the app as soon as possible.

## 🌟 Vision

Traditional dating apps are built on a "business of failure." They benefit from your subscriptions, ad views, and micro-transactions. We believe dating should be transparent, efficient, and respect your time.

- **No subscriptions or hidden costs:** One-time lifetime access (currently free during the early phase).
- **Transparent algorithms:** No opaque mechanics. Users are shown based on compatibility and proximity.
- **Time in your hands:** No artificial limits on how many profiles you can see.
- **Privacy & Flexibility:** Present yourself exactly how you want, with or without photos.

## 🛠 Tech Stack

- **Framework:** [Astro 5](https://astro.build/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Infrastructure:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Database:** [Cloudflare KV](https://developers.cloudflare.com/kv/) (Key-Value storage for the waitlist)
- **Icons:** [Font Awesome](https://fontawesome.com/)

## 🌍 Features

- **Multi-language support:** Fully translated into Spanish (`/`) and English (`/en`).
- **Responsive design:** Optimized for mobile and desktop experiences.
- **Serverless Waitlist:** Integrated form that stores interest data in Cloudflare's edge.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.1 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/martinezharo/goal-partner.git
   cd goal-partner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:4321`.

## 📡 Deployment

This project is configured for Cloudflare Pages. 

1. Ensure you have a KV namespace created in your Cloudflare account.
2. Update the `id` for the `WAITLIST` binding in `wrangler.json` with your own namespace ID.
3. Deploy to Cloudflare:
   ```bash
   npm run build
   npx wrangler pages deploy ./dist
   ```

## ⚠️ Project Status

**This project is currently on standby.** 

I am not actively developing new features at this moment, but the core landing page is functional and ready for deployment. If there is significant community interest or high-quality pull requests, I will resume active development.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is open-source. Feel free to fork it, use it, and contribute.
