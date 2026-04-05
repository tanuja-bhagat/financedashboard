const utils = {
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    },
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    generateId() {
        return `tx_${Math.random().toString(36).substr(2, 7)}`;
    }
};
