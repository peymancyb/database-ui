import axios from 'axios';

// credentials
const BASE_URL = 'https://emncqcmfwhxkdeeqnhil.nhost.run/v2/query';
const ACCESS_KEY = 'e1f27db32eb30112b0fa0a6c21136c38';

// default config
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['x-hasura-access-key'] = ACCESS_KEY;

interface TablesListData {
  data: {
    result: string[][]
    result_type: string
  }
}
export function getTablesList(): Promise<TablesListData> {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: "SELECT * FROM information_schema.tables WHERE table_schema = 'public';",
    },
  });
}

export function getTableInfo(tableName: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `SELECT * FROM information_schema.columns WHERE table_name = '${tableName}';`,
    },
  });
}

export function createTable(tableName: string, columnsQuery: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `CREATE TABLE ${tableName} ( id serial PRIMARY KEY, ${columnsQuery} );`,
    },
  });
}

export function deleteTable(tableName: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `DROP TABLE ${tableName};`,
    },
  });
}

export function listDataRows(tableName: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `SELECT * FROM public.${tableName}`,
    },
  });
}

export function insertData(tableName: string, keysQuery: string, valuesQuery: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `INSERT INTO public.${tableName} (${keysQuery}) VALUES (${valuesQuery});`,
    },
  });
}

export function deleteData(tableName: string, id: string) {
  return axios.post(BASE_URL, {
    type: 'run_sql',
    args: {
      source: 'default',
      sql: `DELETE FROM public.${tableName} WHERE id = ${id};`,
    },
  });
}
