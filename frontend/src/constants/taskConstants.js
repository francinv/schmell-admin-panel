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
        type: 'P',
        text: 'Ikke startet'
    },
    {
        type: 'D',
        text: 'Doing'
    },
    {
        type: 'F',
        text: 'Fullført'
    }
];

export const PRIORITY_OPTIONS = [
    {
        value: 3,
        text: 'LAV',
        color: '#FEC400'
    },
    {
        value: 2,
        text: 'MEDIUM',
        color: '#29CC97'
    },
    {
        value: 1,
        text: 'HØY',
        color: '#F12B2C'
    }
];

export const TASK_TABLE_HEADER = [
    "Oppgave detaljer",
    "Kategori",
    "Frist",
    "Prioritet",
];
