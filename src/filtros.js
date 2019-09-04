const filtro = [{
    "name": "Atrasado Interesado",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "443",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12464",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Cita Establecida",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "487",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": "487"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Contactado sin 5 Seguimientos",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "475",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": "486"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12478",
                        "operator": "<",
                        "value": "5",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Contactado",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "486",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": "486"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Interesado Sin 4 Llamadas",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "491",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12464",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12478",
                        "operator": "<",
                        "value": "4",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Negociación",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "488",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": "488"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Reserva",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "489",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "1_week_ago",
                        "extra_value": "477"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Atrasado Visitado",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "490",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "entered_stage",
                        "operator": "<",
                        "value": "2_weeks_ago",
                        "extra_value": "490"
                    },
                    {
                        "object": "deal",
                        "field_id": "12463",
                        "operator": "=",
                        "value": "open",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": []
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Perdido no contesta Seguimiento sin 5 Seguimientos",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12474",
                        "operator": "=",
                        "value": "No Responde seguimiento",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12478",
                        "operator": "<",
                        "value": "5",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "491",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "486",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "487",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "488",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "477",
                        "extra_value": null
                    }
                ]
            }
        ]
    },
    "type": "deals"
},
{
    "name": "Perdido No contesta sin 4 seguimientos",
    "conditions": {
        "glue": "and",
        "conditions": [
            {
                "glue": "and",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12474",
                        "operator": "=",
                        "value": "No Contesta",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12478",
                        "operator": "<",
                        "value": "4",
                        "extra_value": null
                    }
                ]
            },
            {
                "glue": "or",
                "conditions": [
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "474",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "475",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "487",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "490",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "488",
                        "extra_value": null
                    },
                    {
                        "object": "deal",
                        "field_id": "12462",
                        "operator": "=",
                        "value": "489",
                        "extra_value": null
                    }
                ]
            }
        ]
    },
    "type": "deals"
}
]

export { filtro }