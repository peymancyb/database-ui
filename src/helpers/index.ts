export function mapTableData(payload: null | string[][]) {
  if (!payload) {
    return null;
  }
  const [info, ...data] = payload;
  return data.map((table: any) => table.reduce((acc: any, item: string, index: number) => {
    const key = info[index];
    acc[key] = item;
    return acc;
  }, {}));
}

export function mapTableDataWithColumns(payload: null | string[][]) {
  if (!payload) {
    return {
      columns: [],
      data: [],
    };
  }
  const [info, ...data] = payload;
  const mappedData = data.map((table: any) => table.reduce((acc: any, item: string, index: number) => {
    const key = info[index];
    acc[key] = item;
    return acc;
  }, {}));
  return {
    columns: info,
    data: mappedData,
  };
}
