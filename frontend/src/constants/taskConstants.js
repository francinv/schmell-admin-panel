export const SORT_OPTIONS = [
    {
        type: 'PUBL_DESC',
        text: 'Publisert'
    },
    {
        type: 'PRIORITY_LTH',
        text: 'Prioritet (lav til høy)'
    },
    {
        type: 'PRIORITY_HTL',
        text: 'Prioritet (høy til lav)'
    },
    {
        type: 'DEADLINE_ASC',
        text: 'Frist nyest - eldst'
    },
    {
        type: 'DEADLINE_DESC',
        text: 'Frist eldst - nyest'
    },
    {
        type: 'UPDT_DESC',
        text: 'Oppdatert nyest - eldst'
    },
    {
        type: 'UPDT_ASC',
        text: 'Oppdatert eldst - nyest'
    }
];

export const STATUS_OPTIONS = [
    {
        value: 'P',
        text: 'Ikke startet'
    },
    {
        value: 'D',
        text: 'Doing'
    },
    {
        value: 'F',
        text: 'Fullført'
    }
];

export const PRIORITY_OPTIONS = [
    {
        value: 3,
        text: 'LAV',
        color: '#FEC400',
        textColor: '#FFF',
    },
    {
        value: 2,
        text: 'MEDIUM',
        color: '#29CC97',
        textColor: '#FFF',
    },
    {
        value: 1,
        text: 'HØY',
        color: '#F12B2C',
        textColor: '#FFF',
    }
];

export const TASK_TABLE_HEADER = [
    "Oppgave detaljer",
    "Kategori",
    "Frist",
    "Prioritet",
];

export const CATEGORY_OPTIONS = [
    {
        value: 'G',
        text: 'Spill'
    },
    {
        value: 'D',
        text: 'Utvikling'
    },
    {
        value: 'W',
        text: 'Design'
    },
    {
        value: 'M',
        text: 'Markedsføring'
    },
    {
        value: 'E',
        text: 'Økonomi'
    }
];