// Datos del arma base
const baseWeapon = {
    nombre: "Type 25-",
    dano: 24,
    cadencia: 86,
    precision: 44,
    movilidad: 83,
    alcance: 47,
    control: 46
};

// Datos de todos los accesorios
const accesorios = {
    BOCA_DE_CANON: {
        SILENCIADOR_TACTICO: { Id: "1A", dano: 0, cadencia: 0, precision: 0, movilidad: -2, alcance: 0, control: 0 },
        SILENCIADOR_LIGERO_OWC: { Id: "1B", dano: 0, cadencia: 0, precision: 0, movilidad: 0, alcance: -7, control: 0 },
        SILENCIADOR_MONOLITICO: { Id: "1C", dano: 0, cadencia: 0, precision: -3, movilidad: -5, alcance: 8, control: 0 },
        COMPENSADOR_LIGERO_OWC: { Id: "1D", dano: 0, cadencia: 0, precision: 0, movilidad: -2, alcance: 0, control: 6 },
        SUPRESOR_DE_FOGONAZO_LIGERO_DE_MIP: { Id: "1E", dano: 0, cadencia: 0, precision: 2, movilidad: -2, alcance: 0, control: 0 },
        FRENO_DE_BOCA_LIGERO_RTC: { Id: "1F", dano: 0, cadencia: 0, precision: 1, movilidad: -2, alcance: 0, control: 4 }
    },
    CANON: {
        CANON_LIGERO_MIP: { Id: "2A", dano: 0, cadencia: 0, precision: -3, movilidad: 3, alcance: 0, control: -1 },
        CANON_LIGERO_CORTO_MIP: { Id: "2B", dano: 0, cadencia: 0, precision: -2, movilidad: 4, alcance: 0, control: -4 },
        CANON_LIGERO_Y_EXTENDIDO_DE_MIP: { Id: "2C", dano: 0, cadencia: 0, precision: 3, movilidad: -5, alcance: 6, control: 0 }
    },
    CULATA: {
        CULATA_LIGERA_YKM: { Id: "4A", dano: 0, cadencia: 0, precision: -3, movilidad: 2, alcance: 0, control: -1 },
        CULATA_COMBAT_YKM: { Id: "4B", dano: 0, cadencia: 0, precision: -6, movilidad: 6, alcance: 0, control: -2 },
        CULATA_ESTABLE_RTC: { Id: "4C", dano: 0, cadencia: 0, precision: 9, movilidad: -2, alcance: 0, control: 0 }
    },
    VENTAJA: {
        PRESTIDIGITACION: { Id: "5B", dano: 0, cadencia: 0, precision: 0, movilidad: 1, alcance: 0, control: 0 },
        TIRO_LEJANO: { Id: "5G", dano: 0, cadencia: 0, precision: 0, movilidad: 0, alcance: 3, control: 0 }
    },
    LASER: {
        LASER_1_MW_RTC: { Id: "6A", dano: 0, cadencia: 0, precision: 2, movilidad: 0, alcance: 0, control: 0 },
        LASER_5MW_DE_MIP: { Id: "6B", dano: 0, cadencia: 0, precision: 2, movilidad: 4, alcance: 0, control: 0 },
        LASER_TACTICO_OWC: { Id: "6C", dano: 0, cadencia: 0, precision: 4, movilidad: 3, alcance: 0, control: 0 }
    },
    ACOPLE: {
        EMPUNADURA_FRONTAL_DE_ATAQUE: { Id: "7A", dano: 0, cadencia: 0, precision: 3, movilidad: -3, alcance: 0, control: 4 },
        EMPUNADURA_FRONTAL_DE_MERCENARIO: { Id: "7B", dano: 0, cadencia: 0, precision: 2, movilidad: -6, alcance: 0, control: 3 },
        EMPUNADURA_FRONTAL_DE_OPERADOR: { Id: "7C", dano: 0, cadencia: 0, precision: 0, movilidad: -4, alcance: 0, control: 7 },
        EMPUNADURA_FRONTAL_DE_RANGER: { Id: "7D", dano: 0, cadencia: 0, precision: 5, movilidad: -8, alcance: 0, control: 7 },
        EMPUNADURA_FRONTAL_TACTICA_A: { Id: "7E", dano: 0, cadencia: 0, precision: 3, movilidad: -1, alcance: 0, control: 0 }
    },
    AGARRE_TRASERO: {
        ADHESIVO_DE_EMPUNADURA_GRANULADO: { Id: "8A", dano: 0, cadencia: 0, precision: 6, movilidad: -1, alcance: 0, control: 0 },
        EMPUNADURA_ADHESIVO_ENGOMADO: { Id: "8B", dano: 0, cadencia: 0, precision: -3, movilidad: 0, alcance: 0, control: 6 },
        ADHESIVO_DE_EMPUNADURA_PUNTEADO: { Id: "8C", dano: 0, cadencia: 0, precision: 5, movilidad: 4, alcance: 0, control: -2 }
    },
    MUNICION: {
        CARGADOR_AMPLIADO_A_38_BALAS: { Id: "9A", dano: 0, cadencia: 0, precision: 0, movilidad: -1, alcance: 0, control: 0 },
        CARGADOR_AMPLIADO_A_46_BALAS: { Id: "9B", dano: 0, cadencia: 0, precision: 0, movilidad: -5, alcance: 0, control: 0 },
        RECARGA_RAPIDA: { Id: "9C", dano: 0, cadencia: 0, precision: 0, movilidad: 2, alcance: 0, control: 0 },
        RECARGA_RAPIDA_DE_42_BALAS: { Id: "9D", dano: 0, cadencia: 0, precision: 0, movilidad: -4, alcance: 0, control: 0 },
        RECARGA_DE_FUERZA_VULNERANTE: { Id: "9E", dano: 4, cadencia: 0, precision: -6, movilidad: 0, alcance: 0, control: -5 }
    }
};

// Función principal para calcular las mejores combinaciones
function calcularMejoresCombinaciones(atributosSeleccionados) {
    const resultados = {};

    for (let cantidad = 1; cantidad <= 5; cantidad++) {
        const mejorCombinacion = encontrarMejorCombinacion(atributosSeleccionados, cantidad);
        
        if (mejorCombinacion && mejorCombinacion.accesorios.length === cantidad) {
            resultados[cantidad] = mejorCombinacion;
        }
    }

    return resultados;
}

// Nueva función que calcula puntuación priorizando los atributos seleccionados
function calcularPuntuacionAvanzada(accesorio, atributosSeleccionados) {
    let puntuacion = 0;
    
    // Para cada atributo seleccionado, calcular su contribución
    for (let atributo of atributosSeleccionados) {
        const valor = accesorio[atributo];
        
        // Dar peso extra a valores positivos y castigar más los negativos
        if (valor > 0) {
            // Los atributos positivos tienen peso aumentado
            puntuacion += valor * 2;
        } else if (valor < 0) {
            // Los atributos negativos tienen peso reducido (menos castigo)
            puntuacion += valor * 0.5;
        }
    }
    
    return puntuacion;
}

// Función para encontrar el mejor accesorio para un atributo específico
function encontrarMejorAccesorioPorAtributo(atributo, categoriaExcluir = null) {
    let mejorAccesorio = null;
    let mejorValor = -Infinity;
    
    for (let categoria in accesorios) {
        if (categoriaExcluir === categoria) continue;
        
        for (let nombre in accesorios[categoria]) {
            const accesorio = accesorios[categoria][nombre];
            const valor = accesorio[atributo];
            
            if (valor > mejorValor) {
                mejorValor = valor;
                mejorAccesorio = {
                    ...accesorio,
                    categoria: categoria,
                    nombre: nombre
                };
            }
        }
    }
    
    return mejorAccesorio;
}

// Función corregida que prioriza los mejores accesorios para cada atributo
function encontrarMejorCombinacion(atributosSeleccionados, cantidadDeseada) {
    if (atributosSeleccionados.length === 0) return null;
    
    const seleccionados = [];
    const categoriasUsadas = new Set();
    
    // Estrategia: Para cada atributo seleccionado, encontrar su mejor accesorio
    for (let atributo of atributosSeleccionados) {
        if (seleccionados.length >= cantidadDeseada) break;
        
        const mejorAcc = encontrarMejorAccesorioPorAtributo(atributo);
        
        if (mejorAcc && !categoriasUsadas.has(mejorAcc.categoria)) {
            // Calcular puntuación para este accesorio basado en todos los atributos seleccionados
            const puntuacion = calcularPuntuacionAvanzada(mejorAcc, atributosSeleccionados);
            
            seleccionados.push({
                ...mejorAcc,
                puntuacion: puntuacion
            });
            categoriasUsadas.add(mejorAcc.categoria);
        }
    }
    
    // Si aún necesitamos más accesorios, completar con los mejores por puntuación general
    if (seleccionados.length < cantidadDeseada) {
        const todosAccesorios = [];
        
        for (let categoria in accesorios) {
            if (categoriasUsadas.has(categoria)) continue;
            
            for (let nombre in accesorios[categoria]) {
                const accesorio = accesorios[categoria][nombre];
                const puntuacion = calcularPuntuacionAvanzada(accesorio, atributosSeleccionados);
                
                todosAccesorios.push({
                    ...accesorio,
                    categoria: categoria,
                    nombre: nombre,
                    puntuacion: puntuacion
                });
            }
        }
        
        // Ordenar por puntuación descendente
        todosAccesorios.sort((a, b) => b.puntuacion - a.puntuacion);
        
        // Agregar los mejores que no estén ya seleccionados
        for (let acc of todosAccesorios) {
            if (seleccionados.length >= cantidadDeseada) break;
            if (!categoriasUsadas.has(acc.categoria)) {
                seleccionados.push(acc);
                categoriasUsadas.add(acc.categoria);
            }
        }
    }
    
    // Si aún no alcanzamos la cantidad deseada, permitir repetición de categorías
    if (seleccionados.length < cantidadDeseada) {
        const todosAccesorios = [];
        
        for (let categoria in accesorios) {
            for (let nombre in accesorios[categoria]) {
                const accesorio = accesorios[categoria][nombre];
                const yaSeleccionado = seleccionados.some(s => s.Id === accesorio.Id);
                
                if (!yaSeleccionado) {
                    const puntuacion = calcularPuntuacionAvanzada(accesorio, atributosSeleccionados);
                    todosAccesorios.push({
                        ...accesorio,
                        categoria: categoria,
                        nombre: nombre,
                        puntuacion: puntuacion
                    });
                }
            }
        }
        
        todosAccesorios.sort((a, b) => b.puntuacion - a.puntuacion);
        
        for (let acc of todosAccesorios) {
            if (seleccionados.length >= cantidadDeseada) break;
            seleccionados.push(acc);
        }
    }
    
    // Ordenar por ID para consistencia
    seleccionados.sort((a, b) => a.Id.localeCompare(b.Id));
    
    // Calcular estadísticas finales
    const estadisticasFinales = calcularEstadisticasFinales(seleccionados);
    const puntuacionTotal = calcularPuntuacionTotal(estadisticasFinales, atributosSeleccionados);
    const mejoraAtributos = calcularMejoraAtributos(atributosSeleccionados, estadisticasFinales);
    
    return {
        accesorios: seleccionados,
        puntuacionTotal: puntuacionTotal,
        estadisticasFinales: estadisticasFinales,
        mejoraAtributos: mejoraAtributos
    };
}

function obtenerTodosAccesoriosOrganizados() {
    const organizados = {};

    for (let categoria in accesorios) {
        organizados[categoria] = [];
        for (let nombre in accesorios[categoria]) {
            organizados[categoria].push(accesorios[categoria][nombre]);
        }
    }

    return organizados;
}

function obtenerCategoriaPorId(id) {
    for (let categoria in accesorios) {
        for (let nombre in accesorios[categoria]) {
            if (accesorios[categoria][nombre].Id === id) {
                return categoria;
            }
        }
    }
    return null;
}

function calcularPuntuacionParaAtributos(accesorio, atributosSeleccionados) {
    let puntuacion = 0;
    atributosSeleccionados.forEach(atributo => {
        puntuacion += accesorio[atributo];
    });
    return puntuacion;
}

function calcularEstadisticasFinales(accesoriosSeleccionados) {
    const estadisticas = { ...baseWeapon };

    accesoriosSeleccionados.forEach(accesorio => {
        for (let stat in accesorio) {
            if (stat !== 'Id' && stat !== 'nombre' && stat !== 'categoria' && stat !== 'puntuacion') {
                if (typeof estadisticas[stat] === 'number') {
                    estadisticas[stat] += accesorio[stat];
                }
            }
        }
    });

    return estadisticas;
}

function calcularPuntuacionTotal(estadisticasFinales, atributosSeleccionados) {
    let puntuacion = 0;
    atributosSeleccionados.forEach(atributo => {
        puntuacion += estadisticasFinales[atributo];
    });
    return puntuacion;
}

function calcularMejoraAtributos(atributosSeleccionados, estadisticasFinales) {
    const mejora = {};
    const estadisticasBase = { ...baseWeapon };

    atributosSeleccionados.forEach(atributo => {
        mejora[atributo] = estadisticasFinales[atributo] - estadisticasBase[atributo];
    });

    return mejora;
}

function generarNombreConfiguracion(accesorios) {
    const accesoriosOrdenados = [...accesorios].sort((a, b) => a.Id.localeCompare(b.Id));
    const ids = accesoriosOrdenados.map(accesorio => accesorio.Id).join('');
    return `Type 25-${ids}`;
}

function formatearAtributo(atributo) {
    const nombres = {
        'dano': 'Daño',
        'cadencia': 'Cadencia',
        'precision': 'Precisión',
        'movilidad': 'Movilidad',
        'alcance': 'Alcance',
        'control': 'Control'
    };
    return nombres[atributo] || atributo;
}

function mostrarResultados(atributosSeleccionados, resultados) {
    const resultadosContainer = document.getElementById('results');
    resultadosContainer.innerHTML = '';

    if (atributosSeleccionados.length === 0) {
        resultadosContainer.innerHTML = '<div class="no-results">Selecciona al menos un atributo para calcular las mejores configuraciones</div>';
        return;
    }

    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    const resultHeader = document.createElement('div');
    resultHeader.className = 'result-header';

    const atributosTexto = atributosSeleccionados.map(atributo => formatearAtributo(atributo)).join(', ');
    const resultTitle = document.createElement('h3');
    resultTitle.className = 'result-title';
    resultTitle.textContent = `Mejores Configuraciones para: ${atributosTexto}`;

    resultHeader.appendChild(resultTitle);
    resultCard.appendChild(resultHeader);

    const resultadosList = document.createElement('div');
    resultadosList.className = 'resultados-list';

    for (let cantidad in resultados) {
        const combinacion = resultados[cantidad];
        const item = document.createElement('div');
        item.className = 'resultado-item';

        const configName = document.createElement('div');
        configName.className = 'config-name';
        configName.textContent = generarNombreConfiguracion(combinacion.accesorios);

        const configDesc = document.createElement('div');
        configDesc.className = 'config-desc';

        const mejoraText = atributosSeleccionados.map(atributo => {
            const mejora = combinacion.mejoraAtributos[atributo];
            const signo = mejora > 0 ? '+' : '';
            return `${formatearAtributo(atributo)}: ${signo}${mejora}`;
        }).join(' | ');

        const categoriasUtilizadas = combinacion.accesorios.map(acc => 
            obtenerCategoriaPorId(acc.Id)
        ).join(', ');

        configDesc.innerHTML = `
            <strong>${cantidad} accesorio(s)</strong><br>
            ${mejoraText}<br>
            <small>Categorías: ${categoriasUtilizadas}</small>
        `;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copiar';
        copyBtn.onclick = () => copiarTexto(generarNombreConfiguracion(combinacion.accesorios));

        const detallesBtn = document.createElement('button');
        detallesBtn.className = 'detalles-btn';
        detallesBtn.textContent = 'Ver Accesorios';
        detallesBtn.onclick = () => mostrarDetallesAccesorios(combinacion.accesorios);

        const accionesContainer = document.createElement('div');
        accionesContainer.className = 'acciones-container';
        accionesContainer.appendChild(copyBtn);
        accionesContainer.appendChild(detallesBtn);

        item.appendChild(configName);
        item.appendChild(configDesc);
        item.appendChild(accionesContainer);
        resultadosList.appendChild(item);
    }

    resultCard.appendChild(resultadosList);
    resultadosContainer.appendChild(resultCard);
}

function mostrarDetallesAccesorios(accesorios) {
    const detalles = accesorios.map(accesorio => {
        const nombre = obtenerNombreAccesorio(accesorio.Id);
        const categoria = obtenerCategoriaPorId(accesorio.Id);
        const stats = [];

        for (let stat in accesorio) {
            if (stat !== 'Id' && stat !== 'nombre' && stat !== 'categoria' && stat !== 'puntuacion' && accesorio[stat] !== 0) {
                const signo = accesorio[stat] > 0 ? '+' : '';
                stats.push(`${formatearAtributo(stat)}: ${signo}${accesorio[stat]}`);
            }
        }

        return `${nombre} (${accesorio.Id}) - ${categoria}: ${stats.join(', ')}`;
    }).join('\n');

    alert('Accesorios utilizados:\n\n' + detalles);
}

function obtenerNombreAccesorio(id) {
    for (let tipo in accesorios) {
        for (let nombre in accesorios[tipo]) {
            if (accesorios[tipo][nombre].Id === id) {
                return nombre.replace(/_/g, ' ');
            }
        }
    }
    return 'Accesorio desconocido';
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarMensajeCopiado();
    }).catch(err => {
        console.error('Error al copiar: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        mostrarMensajeCopiado();
    });
}

function mostrarMensajeCopiado() {
    const mensaje = document.createElement('div');
    mensaje.className = 'copy-message';
    mensaje.textContent = '¡Clase copiada!';
    document.body.appendChild(mensaje);

    setTimeout(() => {
        document.body.removeChild(mensaje);
    }, 2000);
}

// Inicializar eventos cuando el usuario está autenticado
function initApp() {
    document.getElementById('calculate').addEventListener('click', function() {
        const atributosSeleccionados = [];
        const checkboxes = document.querySelectorAll('.attribute-checkbox input:checked');

        checkboxes.forEach(checkbox => {
            atributosSeleccionados.push(checkbox.value);
        });

        const resultados = calcularMejoresCombinaciones(atributosSeleccionados);
        mostrarResultados(atributosSeleccionados, resultados);
    });

    document.getElementById('clear').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.attribute-checkbox input');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        document.getElementById('results').innerHTML = '';
    });
}

// Escuchar evento de autenticación
window.addEventListener('authSuccess', () => {
    initApp();
});