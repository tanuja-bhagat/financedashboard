const appState = {
    transactions: [],
    role: 'viewer', // 'viewer' | 'admin'
    filters: { search: '', type: 'all', sort: 'date-desc' },
    theme: localStorage.getItem('theme') || 'light',
    
    init() {
        const stored = localStorage.getItem('finance_data');
        this.transactions = stored ? JSON.parse(stored) : [...MOCK_DATA];
        this.applyTheme(this.theme);
        this.setRole(this.role);
    },

    addTransaction(tx) {
        this.transactions.push(tx);
        this.saveData();
        uiController.renderAll();
    },

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveData();
        uiController.renderAll();
    },

    saveData() {
        localStorage.setItem('finance_data', JSON.stringify(this.transactions));
    },

    setRole(newRole) {
        this.role = newRole;
        uiController.updateRoleUI();
    },

    setFilter(key, value) {
        this.filters[key] = value;
        uiController.renderTable();
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme(this.theme);
        chartController.renderCharts(); 
    },

    applyTheme(theme) {
        const html = document.documentElement;
        const icon = document.getElementById('theme-icon');
        if (theme === 'dark') {
            html.classList.add('dark');
            if (icon) icon.classList.replace('ph-moon', 'ph-sun');
        } else {
            html.classList.remove('dark');
            if (icon) icon.classList.replace('ph-sun', 'ph-moon');
        }
    }
};
