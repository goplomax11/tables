export const configureTableData =<T extends Record<string, unknown>>(data: T[]) => {
  const tableData = data.map((item: T) => {
    return flattenObj(item);
  });

  const headersData = Object.keys(tableData[0]);

  return [headersData, tableData];
};

const flattenObj = <T>(obj: T) => {
  let result: any = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        result[j] = temp[j];
      }
    } else {
      const [key, value] = renameActiveKey(i, obj[i])
      result[key] = value;
    }
  }
  return result;
};

const renameActiveKey = <T>(key: string, value: T) => {
  return key === "active" ? ["status", value ? "active" : "completed"] : [key, value]
}
