// Sistema de Contador de Visitas usando GitHub Issues como "backend"
class VisitorCounter {
    constructor() {
        // Configuración del repositorio (CAMBIAR ESTOS VALORES)
        this.GITHUB_TOKEN = null; // Se pedirá al usuario o se configurará manualmente
        this.REPO_OWNER = null;   // Tu usuario de GitHub
        this.REPO_NAME = null;    // Nombre de tu repositorio
        this.ISSUE_NUMBER = 1;    // Número del issue que crearás
        
        this.init();
    }
    
    async init() {
        // Intentar cargar configuración
        await this.loadConfig();
        
        // Verificar si es una visita única
        if (!this.hasVisitedBefore()) {
            await this.incrementCounter();
        }
        
        // Mostrar contador
        await this.displayCounter();
    }
    
    async loadConfig() {
        // Intentar cargar configuración desde archivo externo o localStorage
        return new Promise((resolve) => {
            // Primero intentar cargar desde config.js
            if (typeof CONFIG !== 'undefined') {
                this.GITHUB_TOKEN = CONFIG.GITHUB_TOKEN;
                this.REPO_OWNER = CONFIG.REPO_OWNER;
                this.REPO_NAME = CONFIG.REPO_NAME;
                this.ISSUE_NUMBER = CONFIG.ISSUE_NUMBER;
                resolve();
            } 
            // Si no, intentar cargar desde localStorage
            else if (localStorage.getItem('github_config')) {
                const config = JSON.parse(localStorage.getItem('github_config'));
                this.GITHUB_TOKEN = config.GITHUB_TOKEN;
                this.REPO_OWNER = config.REPO_OWNER;
                this.REPO_NAME = config.REPO_NAME;
                this.ISSUE_NUMBER = config.ISSUE_NUMBER;
                resolve();
            }
            // Si no hay configuración, usar modo demo
            else {
                console.warn('Usando modo demo - Configura GitHub para contador real');
                this.useDemoMode = true;
                resolve();
            }
        });
    }
    
    hasVisitedBefore() {
        const visitorKey = 'type25_visitor_id';
        const hasVisited = localStorage.getItem(visitorKey);
        
        if (!hasVisited) {
            // Generar ID único para el visitante
            const visitorId = this.generateVisitorId();
            localStorage.setItem(visitorKey, visitorId);
            return false;
        }
        
        return true;
    }
    
    generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    async incrementCounter() {
        if (this.useDemoMode) {
            this.incrementDemoCounter();
            return;
        }
        
        try {
            // Obtener el issue actual
            const issue = await this.getIssue();
            let counterData;
            
            try {
                // Intentar parsear el contenido del issue
                counterData = JSON.parse(issue.body);
            } catch (e) {
                // Si no existe, crear estructura inicial
                counterData = {
                    count: 0,
                    visitors: [],
                    lastReset: new Date().toISOString()
                };
            }
            
            // Incrementar contador
            counterData.count++;
            counterData.visitors.push(this.getVisitorId());
            
            // Actualizar el issue
            await this.updateIssue(counterData);
            
        } catch (error) {
            console.error('Error al incrementar contador:', error);
            this.incrementDemoCounter();
        }
    }
    
    async getIssue() {
        const url = `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}/issues/${this.ISSUE_NUMBER}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${this.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener issue: ${response.status}`);
        }
        
        return await response.json();
    }
    
    async updateIssue(data) {
        const url = `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}/issues/${this.ISSUE_NUMBER}`;
        
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${this.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: JSON.stringify(data, null, 2)
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error al actualizar issue: ${response.status}`);
        }
        
        return await response.json();
    }
    
    async displayCounter() {
        const counterElement = document.getElementById('visitorCount');
        if (!counterElement) return;
        
        if (this.useDemoMode) {
            let demoCount = localStorage.getItem('demo_counter');
            if (!demoCount) {
                demoCount = Math.floor(Math.random() * 100) + 50;
                localStorage.setItem('demo_counter', demoCount);
            }
            counterElement.textContent = demoCount;
            return;
        }
        
        try {
            const issue = await this.getIssue();
            const counterData = JSON.parse(issue.body);
            counterElement.textContent = counterData.count;
        } catch (error) {
            console.error('Error al mostrar contador:', error);
            counterElement.textContent = '?';
        }
    }
    
    incrementDemoCounter() {
        let demoCount = localStorage.getItem('demo_counter');
        if (!demoCount) {
            demoCount = Math.floor(Math.random() * 100) + 50;
        } else {
            demoCount = parseInt(demoCount) + 1;
        }
        localStorage.setItem('demo_counter', demoCount);
        
        const counterElement = document.getElementById('visitorCount');
        if (counterElement) {
            counterElement.textContent = demoCount;
        }
    }
    
    getVisitorId() {
        return localStorage.getItem('type25_visitor_id') || this.generateVisitorId();
    }
}

// Inicializar contador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para asegurar que el usuario está autenticado
    setTimeout(() => {
        const counter = new VisitorCounter();
    }, 500);
});
