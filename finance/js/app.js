/**
 * BreezeFin Dashboard - Main Application Entry Point
 * -----------------------------------------------
 * This app is structured as follows:
 * - mockData.js: initial seed data
 * - state.js: handles data management, roles, and themes
 * - utils.js: helper functions for formatting and ID generation
 * - charts.js: handles Chart.js instances and rendering
 * - ui.js: handles all DOM manipulation and event listeners
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize state (loads from localStorage or mock)
    appState.init();
    
    // 2. Initialize UI (binds events and triggers initial render)
    uiController.init();
    
    // Log initialization
    console.log('Finance Dashboard Initialized 🚀');
});
