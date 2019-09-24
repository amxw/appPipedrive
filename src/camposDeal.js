const datos1 = [
    {
        name: "Fecha pactada para Expediente",
        field_type: "date",
    },
    {
        name: "Fecha Limite para Reservar",
        field_type: "date",
    },
    {
        name: "Proceso Financiamiento",
        field_type: "enum",
        options: [
            "Suspendido Análisis",
            "Suspensión Técnica",
            "Suspendido",
            "Resguardo",
            "Resolución Bancaria",
            "Ventas al Contado",
            "Escrituras Contado",
            "Aprobado Análisis",
            "Aprobado Tecnico"
        ]
    },
    {
        name: "Contrato",
        field_type: "text",
    },
    {
        name: "Promoción",
        field_type: "text"
    },
    {
        name: "Co Deudor",
        field_type: "people"
    }
    , {
        name: "Banco",
        field_type: "varchar_auto"
    },
]

const datos2 = [
    {
        name: "Financiamiento en años",
        field_type: "double"
    },
    {
        name: "Monto a Prestar",
        field_type: "monetary"
    },
    {
        name: "Enganche Pactado",
        field_type: "monetary"
    },
    {
        name: "Reserva",
        field_type: "monetary"
    },
    {
        name: "Contenido",
        field_type: "varchar_auto"
    },
]

const datos3 = [
    {
        name: "Campaña",
        field_type: "varchar_auto"
    },
    {
        name: "Fuente",
        field_type: "enum",
        options: [
            "Organico directo",
            "Linkeding,facebook",
            "instagram",
            "google, ads",
            "email",
            "valla|muppie|Cerramiento",
            "prensa|Revista|Volante",
            "Referido",
            "Cartera",
            "Corredor inmobiliario",
            "Evento"
        ]
    },
    {
        name: "Medio",
        field_type: "enum",
        options: [
            "Website",
            "lead ad",
            "Messenger | chat",
            "Email",
            "Telefono",
            "en persona",
            "whatsapp"
        ]
    },
    {
        name: "¿Cuántas habitaciones busca?",
        field_type: "enum",
        options: [
            "1",
            "2",
            "3",
            "4",
            "5 o más"
        ]
    },
    {
        name: "¿Para cuándo desea comprar su casa?",
        field_type: "enum",
        options: [
            "1 a 3 meses",
            " 3 a 6 meses",
            "6 a 9 meses",
            "9 meses o más"
        ]
    },
]

const datos4 = [
    {
        name: "¿En qué rango de precio quiere comprar?",
        field_type: "enum",
        options: [
            "Q700,000-Q800,000",
            "Q800,001-Q900,000",
            "Q900,001-Q1,000,000",
            "Q1,000,001 o más"
        ]
    },
    {
        name: "¿Cuál es su interés de compra?",
        field_type: "enum",
        options: [
            "Independencia",
            "Por Boda",
            "Segunda Casa",
            "Inversión",
            "Divorcio",
            "Creció Familia",
            "Ubicación",
            "Familia Fuera del País"
        ]
    },
    {
        name: "Banco a Cotizar",
        field_type: "enum",
        options: [
            "Banrural",
            "BAM",
            "BAC",
            "G&T",
            "Promerica",
            "CHN"
        ]
    },
    {
        name: "¿Cuál es su presupuesto mensual para pagar una casa?",
        field_type: "enum",
        options: [
            "Q5000 a Q6000",
            "Q6000 a Q7000",
            "Q7000 a Q8000",
            "Q8000 a Q9000",
            "Más de Q9000"
        ]
    },
    {
        name: "¿Quién más toma la decisión de compra?",
        field_type: "text"
    },
    {
        name: "Term",
        field_type: "varchar_auto"
    },
    {
        name: "¿Por que quiere comprar?",
        field_type: "enum",
        options: [
            "Nueva familia | matrimonio",
            "Divorcio",
            "La proíedad anterion no llena sus nesesidades actuales",
            "Progreso economico",
            "Inversion patrimonial",
            "Inversion financiera",
        ]
    },
    {
        name: "¿Para cuando quiere comprar?",
        field_type: "enum",
        options: [
            "1 - 3 meses",
            "3 - 6 meses",
            "mas de 6 meses",
            "no sabe / no responder"
        ]
    },
    {
        name: "¿Cual es la cuota mensual presupuestado?",
        field_type: "monetary"
    },
    {
        name: "¿Quienes influyen en la toma de decisión?",
        field_type: "set",
        options: [
            "padres | suegros",
            "hijos",
            "conyuge",
            "socios",
            "amigos"
        ]
    },
    {
        name: "observación de prospección",
        field_type: "text",
    },
    {
        name: "producto interesado",
        field_type: "enum",
        options: [
            "oficina",
            "comercio",
            "vivienda"
        ]
    }
]
export { datos1, datos2, datos3, datos4 }