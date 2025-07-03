# Infortic Web App - Himafortic Unesa

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-green?logo=supabase)](https://supabase.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Project Overview

**Infortic** is the official web platform for the Himpunan Mahasiswa D4 Manajemen Informatika (Himafortic) at Universitas Negeri Surabaya (Unesa). This platform serves as a central hub for students to find information about technology-related competitions (lomba), scholarships (beasiswa), and internships (magang).

Built with modern web technologies, this project aims to provide a fast, reliable, and user-friendly experience for all students of Manajemen Informatika.

---

### Website

Check out the live website at:
https://infortic.netlify.app

---

### Key Features

- **Dynamic Content:** Information on competitions, scholarships, and internships is fetched dynamically from a Supabase backend.
- **Advanced Search & Filtering:** Users can easily search and filter content based on various criteria like category, price, location, and education level.
- **SEO Optimized:** Built with best practices for Search Engine Optimization, including dynamic sitemaps and structured data (JSON-LD).
- **Responsive Design:** Fully responsive and mobile-first, built with Tailwind CSS.
- **Static Pages:** Includes informative pages like "Tentang Kami" and "Kontak".

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Database & Backend:** [Supabase](https://supabase.io/)
- **Deployment:** [Netlify](https://www.netlify.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/infortic-web.git
    cd infortic-web
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add your Supabase credentials. You can copy the example from `.env.example`.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Deployment

This project is configured for deployment on **Netlify**. To deploy, connect your GitHub repository to Netlify and configure the build settings. Ensure that you set the environment variables in the Netlify UI.

- **Build Command:** `npm run build`
- **Publish Directory:** `.next`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
