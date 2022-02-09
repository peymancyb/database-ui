export type TableData = {
    [key: string]: string;
}

export type TableListData = null | string[][]

export interface TableListState {
    fetching: boolean;
    error: boolean;
    data: null | TableData[];
}
