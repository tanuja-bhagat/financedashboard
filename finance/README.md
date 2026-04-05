💸 BreezeFin — Finance Dashboard UI

📌 Overview

BreezeFin is a clean and responsive Finance Dashboard UI designed to help users track their financial activity, including balance, income, expenses, and transactions.

The goal of this project is to demonstrate strong frontend fundamentals, structured state management, and intuitive UI/UX design without relying on heavy frameworks.

⸻

🚀 Live Demo

👉 [Add your deployed link here]

⸻

📂 Repository

👉 [Add your GitHub repository link here]

⸻

🧠 Key Features

📊 Dashboard Overview
	•	Summary cards for:
	•	Total Balance
	•	Total Income
	•	Total Expenses
	•	Line chart showing balance trend over time
	•	Donut chart showing category-wise expense breakdown

⸻

💳 Transactions Management
	•	View all transactions with:
	•	Date
	•	Amount
	•	Category
	•	Type (Income/Expense)
	•	Features:
	•	🔍 Search by description/category
	•	🎯 Filter by type (Income/Expense)
	•	↕ Sort by date or amount

⸻

🔐 Role-Based UI (Frontend Simulation)
	•	Viewer → Read-only access
	•	Admin → Can add and delete transactions
	•	Toggle roles using UI switch

⸻

💡 Smart Insights
	•	Displays highest spending category
	•	Shows useful financial observations
	•	Helps users understand spending patterns

⸻

🌙 Additional Features
	•	Dark mode toggle
	•	CSV export functionality
	•	LocalStorage persistence
	•	Responsive design for all screen sizes
	•	Empty state handling

⸻

🏗️ Tech Stack
	•	HTML5
	•	Tailwind CSS
	•	Vanilla JavaScript
	•	Chart.js

⸻

🧩 Project Structure

finance-dashboard/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js        # Entry point
│   ├── state.js      # State management
│   ├── ui.js         # UI rendering logic
│   ├── charts.js     # Chart handling
│   └── utils.js      # Helper functions
│
├── data/
│   └── mockData.js   # Initial data
│
└── README.md


⸻

⚙️ How It Works
	•	State Management:
Application state (transactions, filters, role, theme) is managed using a centralized appState object.
	•	UI Rendering:
UI updates are handled via a uiController which re-renders components based on state changes.
	•	Charts:
Chart.js is used to visualize:
	•	Balance trend (line chart)
	•	Category breakdown (donut chart)
	•	Persistence:
Data is stored in localStorage to maintain state across sessions.

⸻

▶️ How to Run

Option 1 (Recommended)

Use Live Server in VS Code:

Right click → index.html → Open with Live Server

Option 2

Open directly:

open index.html


⸻

🎯 Design Approach
	•	Focused on clean and minimal fintech UI
	•	Used card-based layout for clarity
	•	Maintained consistent spacing and typography
	•	Added micro-interactions and animations for better UX
	•	Ensured mobile-first responsiveness

⸻

🧠 Why Vanilla JavaScript?

This project intentionally uses Vanilla JS to:
	•	Keep the application lightweight
	•	Demonstrate core JavaScript and DOM manipulation skills
	•	Show clear understanding of state and UI flow without abstraction

⸻

📈 Possible Improvements
	•	Convert to React for component-based architecture
	•	Add backend integration (Node.js / Firebase)
	•	Implement authentication & real RBAC
	•	Add advanced analytics and filters
	•	Improve accessibility (ARIA, keyboard navigation)

⸻

🙌 Conclusion

This project reflects a practical approach to building a real-world dashboard interface with a focus on usability, structure, and clean code.

It demonstrates the ability to design, structure, and implement a frontend system thoughtfully rather than relying solely on frameworks.

⸻

⭐ If you found this project interesting, feel free to explore and improve it!
:::

⸻

🔥 What You Should Do Now

1. Replace demo link
2. Replace GitHub link
3. Push to repo
4. Submit 🚀