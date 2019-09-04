const producto = [
    {
        name: "Proyecto",
        field_type: 'enum',
        options: [
            "Proyecto 1",
            " Proyecto 2",
            " Proyecto 3",
            " Proyecto 4"
        ]
    },
    {
        name: "No. de Unidad",
        field_type: "text"
    },
    {
        name: "Tipo de Unidad",
        field_type: "enum",
        options: [
            "Apartamento",
            "Oficina",
            "Parqueo",
            "Bodega",
            "Comercial"
        ]
    },
    {
        name: "Fase",
        field_type: "enum",
        options: [
            "Fase 1",
            "Fase 2",
            "Fase 3"
        ]
    },
    {
        name: "Nivel",
        field_type: "double"
    },
    {
        name: "Modelo",
        field_type: "double"
    },
    {
        name: "Dormitorios",
        field_type: "double"
    },
    {
        name: "Baños",
        field_type: "double"
    },
    {
        name: "M2 interiores",
        field_type: "double",
    },
    {
        name: "M2 exteriores",
        field_type: "double"
    },
    {
        name: "M2 totales",
        field_type: "double"
    },
    {
        name: "Precio x M2",
        field_type: "monetary"
    },
    {
        name: "Parqueos",
        field_type: "double",
    }
    

]

export { producto }