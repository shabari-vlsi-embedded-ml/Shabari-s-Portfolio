# Animated Portfolio & Personal Growth Monitor

An animated developer portfolio and personal monitor built with **Next.js (React 19, TypeScript)**, **Framer Motion**, **Tailwind CSS**, and **Supabase (Data Authentication & PostgreSQL)**.

---

## 🌟 What This Website Includes

### Public Portfolio (9 Sectors)
1. **Current Degree & Academics** (Hero banner with live student status pill & university)
2. **Extra-Curricular Activities** (Leadership roles, open-source clubs, community impact)
3. **Prizes Won** (Competitive awards, hackathon podiums, trophy cards)
4. **Skills Matrix** (Categorized technical competencies with animated progress meters)
5. **Completed Projects** (Shipped systems with live demo & GitHub repository links)
6. **In-Progress Projects** (Current initiatives with live target dates & completion sliders)
7. **Net Portfolio Overview** (Executive statement, quantified impact benchmarks & statistics)
8. **Courses Completed** (Specializations from MIT OCW, Coursera, CMU)
9. **Certificates Verified** (Accreditations from AWS, Google Cloud, Meta, CNCF)

---

### Private Personal Growth Monitor (Protected by Authentication)
Access via `/login` or the **"Personal Monitor & CMS"** button:
* **Projects to End (Deadlines & Milestones):** Set target completion dates, adjust completion percentages, and manage pending checklists before shipping.
* **Topics to Study (Continuous Learning Roadmap):** Queue topics to master; easily cycle statuses (`To Learn` ➔ `Learning` ➔ `Mastered`) with celebratory confetti.
* **Focus Areas to Concentrate On:** Set quarterly concentration pillars with visual effort allocation percentages (e.g. 50% AI Agents, 30% Distributed Systems).
* **Reliable Sector Update CMS:** Directly add, edit, or delete items across all 9 sectors on the website with real-time saving.

---

## 🚀 How to Run the Website Locally

1. Open your terminal in this directory:
   ```bash
   cd C:\Users\user\.gemini\antigravity\scratch\animated-portfolio
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your web browser:
   * **Public Portfolio:** [http://localhost:3000](http://localhost:3000)
   * **Personal Monitor / CMS:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   * **Login:** [http://localhost:3000/login](http://localhost:3000/login) *(Click **"Instant Demo Sign-In"** or sign in with your email)*

---

## 🔐 Connecting Supabase for Cloud Data Authentication

1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. In the Supabase Dashboard, click **SQL Editor** on the left menu.
3. Open `supabase_schema.sql` located in this project's root folder, copy its contents, paste them into the Supabase SQL editor, and click **Run**.
4. In Supabase, go to **Project Settings** ➔ **API** and copy:
   * **Project URL**
   * **anon public key**
5. Create a `.env.local` file in this folder:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. In Supabase, navigate to **Authentication** ➔ **Users** and click **Add User** (Create your personal owner login credentials).
7. Now when you sign in at `/login`, your credentials and database queries are verified against Supabase with PostgreSQL Row-Level Security!
