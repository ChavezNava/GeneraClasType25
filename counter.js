// Sistema de Contador de Visitas - Versión Mejorada
class VisitorCounter {
    constructor() {
        this.GITHUB_TOKEN = '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';
        this.REPO_OWNER = 'ChavezNava';
        this.REPO_NAME = 'GeneraClasType25';
        this.ISSUE_NUMBER = 2;
        
        this.init();
    }
    
    async init() {
        console.log('Iniciando contador de visitas...');
        
        // Verificar conexión con GitHub
        const connected = await this.testConnection();
        
        if (!connected) {
            console.warn('Usando modo demo - No se pudo conectar a GitHub');
            this.useDemoMode = true;
            this.incrementDemoCounter();
            await this.displayCounter();
            return;
        }
        
        // Verificar si es una visita única
        if (!this.hasVisitedBefore()) {
            await this.incrementCounter();
        } else {
            console.log('Visitante recurrente - no se incrementa el contador');
        }
        
        // Mostrar contador
        await this.displayCounter();
    }
    
    async testConnection() {
        try {
            console.log('Probando conexión con GitHub API...');
            const url = `https://api.github.com/repos/${this.REPO_OWNER}/${this.REPO_NAME}`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (response.ok) {
                console.log('✅ Conexión exitosa con GitHub');
                return true;
            } else {
                console.error('❌ Error de conexión:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error.message);
            return false;
        }
    }
    
    hasVisitedBefore() {
        const visitorKey = 'type25_visitor_id';
        const hasVisited = localStorage.getItem(visitorKey);
        
        if (!hasVisited) {
            const visitorId = this.generateVisitorId();
            localStorage.setItem(visitorKey, visitorId);
            console.log('Nuevo visitante - ID:', visitorId);
            return false;
        }
        
        console.log('Visitante recurrente - ID:', hasVisited);
        return true;
    }
    
    generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    async incrementCounter() {
        try {
            console.log('Intentando incrementar contador...');
            
            // Obtener el issue actual
            const issue = await this.getIssue();
            console.log('Issue obtenido:', issue.number);
            
            let counterData;
            try {
                counterData = JSON.parse(issue.body);
                console.log('Contador actual:', counterData.count);
            } catch (e) {
                console.warn('Issue no tiene formato válido, creando nuevo contador');
                counterData = {
                    count: 0,
                    visitors: [],
                    lastReset: new Date().toISOString()
                };
            }
            
            // Verificar si este visitante ya ha sido contado
            const visitorId = this.getVisitorId();
            if (!counterData.visitors.includes(visitorId)) {
                counterData.count++;
                counterData.visitors.push(visitorId);
                counterData.lastUpdate = new Date().toISOString();
                
                console.log(`✅ Nueva visita registrada! Total: ${counterData.count}`);
                
                // Actualizar el issue
                await this.updateIssue(counterData);
            } else {
                console.log('Visitante ya contado anteriormente');
            }
            
        } catch (error) {
            console.error('Error al incrementar contador:', error);
            this.useDemoMode = true;
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
            throw new Error(`Error ${response.status}: ${response.statusText}`);
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
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        console.log('✅ Issue actualizado correctamente');
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
            console.log('Modo demo - Mostrando contador:', demoCount);
            return;
        }
        
        try {
            const issue = await this.getIssue();
            const counterData = JSON.parse(issue.body);
            counterElement.textContent = counterData.count;
            console.log('Contador real:', counterData.count);
        } catch (error) {
            console.error('Error al mostrar contador:', error);
            counterElement.textContent = '?';
        }
    }
    
    incrementDemoCounter() {
        let demoCount = localStorage.getItem('demo_counter');
        if (!demoCount) {
            demoCount = Math.floor(Math.random() * 100) + 50;
            localStorage.setItem('demo_counter', demoCount);
            console.log('Iniciando contador demo en:', demoCount);
        } else {
            const wasVisited = localStorage.getItem('type25_visitor_id');
            if (!wasVisited) {
                demoCount = parseInt(demoCount) + 1;
                localStorage.setItem('demo_counter', demoCount);
                console.log('Demo: Nueva visita - Total:', demoCount);
            } else {
                console.log('Demo: Visitante recurrente');
            }
        }
    }
    
    getVisitorId() {
        return localStorage.getItem('type25_visitor_id') || this.generateVisitorId();
    }
}

// Inicializar contador
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const counter = new VisitorCounter();
    }, 500);
});
