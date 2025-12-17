export type State = | { status: 'idle' }
    | { status: 'editing', value: string }
    | { status: 'submitting'; }
    | { status: 'success'; }
    | { status: 'error'; message: string };

export type Action = | { type: 'EDITING'; value: string }
    | { type: 'SUBMIT' }
    | { type: 'RESOLVE' }
    | { type: 'REJECT'; message: string }
    | { type: 'RESET' }
    | { type: 'TIMEOUT' };


//Stateler discriminated union type olarak tanımlandı. status burada discriminant.
//Actionlar da ayrı bir discriminated union type olarak tanımlandı. type alanı burada discriminant.
