const uiController = {
    init() {
        // Form Initial Date
        const dateInput = document.getElementById('inp-date');
        if (dateInput) dateInput.valueAsDate = new Date();
        
        // Search & Filter Events
        document.getElementById('filter-search')?.addEventListener('input', (e) => appState.setFilter('search', e.target.value));
        document.getElementById('filter-type')?.addEventListener('change', (e) => appState.setFilter('type', e.target.value));
        document.getElementById('sort-by')?.addEventListener('change', (e) => appState.setFilter('sort', e.target.value));
        
        // Form Submission
        document.getElementById('form-add')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const newTx = {
                id: utils.generateId(),
                desc: document.getElementById('inp-desc').value,
                amount: parseFloat(document.getElementById('inp-amount').value),
                type: document.getElementById('inp-type').value,
                category: document.getElementById('inp-category').value,
                date: document.getElementById('inp-date').value
            };
            appState.addTransaction(newTx);
            document.getElementById('add-modal')?.close();
            e.target.reset();
            if (dateInput) dateInput.valueAsDate = new Date();
        });

        this.renderAll();
    },

    renderAll() {
        this.renderSummary();
        this.renderTable();
        chartController.renderCharts();
    },

    updateRoleUI() {
        const isAdmin = appState.role === 'admin';
        
        const addBtn = document.getElementById('btn-add-transaction');
        const btnViewer = document.getElementById('btn-role-viewer');
        const btnAdmin = document.getElementById('btn-role-admin');
        
        if (addBtn) {
            isAdmin ? addBtn.classList.remove('hidden') : addBtn.classList.add('hidden');
            isAdmin ? addBtn.classList.add('flex') : addBtn.classList.remove('flex');
        }

        const adminCols = document.querySelectorAll('.admin-col');
        adminCols.forEach(col => {
            isAdmin ? col.classList.remove('hidden') : col.classList.add('hidden');
        });

        // Update Role Buttons Styling
        const activeClasses = ['bg-white', 'dark:bg-slate-700', 'shadow-sm', 'text-slate-900', 'dark:text-white'];
        const inactiveClasses = ['text-slate-500', 'dark:text-slate-400', 'hover:text-slate-900', 'dark:hover:text-white', 'bg-transparent', 'shadow-none'];

        if (btnViewer && btnAdmin) {
            if (appState.role === 'viewer') {
                btnViewer.classList.add(...activeClasses);
                btnViewer.classList.remove(...inactiveClasses);
                btnAdmin.classList.add(...inactiveClasses);
                btnAdmin.classList.remove(...activeClasses);
            } else {
                btnAdmin.classList.add(...activeClasses);
                btnAdmin.classList.remove(...inactiveClasses);
                btnViewer.classList.add(...inactiveClasses);
                btnViewer.classList.remove(...activeClasses);
            }
        }
    },

    renderSummary() {
        let income = 0;
        let expense = 0;
        const categoryTotals = {};

        appState.transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            if (t.type === 'expense') {
                expense += t.amount;
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            }
        });

        const balance = income - expense;

        const valBalance = document.getElementById('val-balance');
        const valIncome = document.getElementById('val-income');
        const valExpense = document.getElementById('val-expense');
        const donutCenterVal = document.getElementById('donut-center-val');

        if (valBalance) valBalance.textContent = utils.formatCurrency(balance);
        if (valIncome) valIncome.textContent = utils.formatCurrency(income);
        if (valExpense) valExpense.textContent = utils.formatCurrency(expense);
        if (donutCenterVal) donutCenterVal.textContent = utils.formatCurrency(expense);

        let highestCat = 'N/A';
        let highestAmt = 0;
        for (const [cat, amt] of Object.entries(categoryTotals)) {
            if (amt > highestAmt) { highestAmt = amt; highestCat = cat; }
        }
        
        const insightEl = document.getElementById('insight-highest-cat');
        if (insightEl) {
            insightEl.innerHTML = `<i class="ph ph-warning-circle mr-1"></i> Top Expense: ${highestCat} (${utils.formatCurrency(highestAmt)})`;
        }
    },

    renderTable() {
        const tbody = document.getElementById('transaction-tbody');
        const emptyState = document.getElementById('empty-state');
        if (!tbody) return;

        const data = this.getProcessedTransactions();
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            emptyState?.classList.remove('hidden');
            emptyState?.classList.add('flex');
        } else {
            emptyState?.classList.add('hidden');
            emptyState?.classList.remove('flex');
            
            data.forEach(t => {
                const isIncome = t.type === 'income';
                const amountColor = isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white';
                const sign = isIncome ? '+' : '-';
                const icon = isIncome ? 'ph-arrow-down-left text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'ph-arrow-up-right text-rose-500 bg-rose-50 dark:bg-rose-500/10';

                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group animate-fade-in';
                tr.innerHTML = `
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-full flex items-center justify-center ${icon.split(' ').slice(1).join(' ')}">
                                <i class="ph ${icon.split(' ')[0]} text-base"></i>
                            </div>
                            <div class="max-w-[150px] sm:max-w-[250px]">
                                <p class="text-sm font-medium text-slate-900 dark:text-white truncate" title="${t.desc}">${t.desc}</p>
                                <p class="text-xs text-slate-500 capitalize md:hidden truncate">${t.category}</p>
                                <p class="text-[10px] text-slate-400 font-mono hidden md:block mt-0.5">${t.id}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            ${t.category}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        ${utils.formatDate(t.date)}
                    </td>
                    <td class="px-6 py-4 text-right whitespace-nowrap">
                        <span class="text-sm font-semibold ${amountColor}">${sign}${utils.formatCurrency(t.amount)}</span>
                    </td>
                    <td class="px-6 py-4 text-center admin-col hidden">
                        <button onclick="appState.deleteTransaction('${t.id}')" class="text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100">
                            <i class="ph ph-trash text-lg"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        this.updateRoleUI(); 
    },

    getProcessedTransactions() {
        let { search, type, sort } = appState.filters;
        let filtered = appState.transactions.filter(t => {
            const matchSearch = t.desc.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
            const matchType = type === 'all' || t.type === type;
            return matchSearch && matchType;
        });

        filtered.sort((a, b) => {
            if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sort === 'amount-desc') return b.amount - a.amount;
            if (sort === 'amount-asc') return a.amount - b.amount;
        });

        return filtered;
    },

    exportCSV() {
        if (appState.transactions.length === 0) return alert("No data to export.");
        
        let csvContent = "data:text/csv;charset=utf-8,ID,Date,Description,Category,Type,Amount\n";
        appState.transactions.forEach(t => {
            csvContent += `"${t.id}","${t.date}","${t.desc}","${t.category}","${t.type}","${t.amount}"\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `breezefin_export_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
