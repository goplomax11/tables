import { ChangeEvent, useMemo, useState } from "react";
import Modal from "../Modal";
import Search from "../Search";
import { configureTableData } from "../../helpers/configureTableData";
import { findTextKeyValue } from "../../helpers/findTextValue";
import "./index.css";

interface TableProps<T extends Record<string, unknown>> {
  data: T[];
}

const Table = <T extends Record<string, unknown>, G extends Record<string, string>>({ data }: TableProps<T>) => {
  const [headerData, configuredTableData] = useMemo(() => configureTableData(data), [data]);
  const [tableData, setTableData] = useState<G[]>(configuredTableData);
  const [editedRow, setEditedRow] = useState<Record<string, string> | null>(null);
  const [search, setSearch] = useState<string>("");

  const filteredTableData = useMemo(() => {
    return tableData.filter((tableRow: G) => {
      const [, value] = findTextKeyValue(tableRow);
      return value.includes(search);
    });
  }, [tableData, search]);

  const renderTableHeader = () => {
    return (
      <tr className="table-row">
        {headerData.map((data: string, id: number) => {
          return renderTableCell(data, id);
        })}
        <td className="table-cell"></td>
      </tr>
    );
  };

  const renderTableData = () => {
    return filteredTableData.map((tableRow: G) => {
      return (
        <tr key={tableRow.id} className="table-row">
          {headerData.map((headerItem: string) => {
            return renderTableCell(tableRow[headerItem], `${headerItem}-${tableRow.id}`);
          })}
          <td className="table-cell">
            <button className="table-edit-btn" onClick={() => onEditBtnClick(tableRow)}>
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderTableCell = (data: string, id: string | number) => {
    return (
      <td key={`${id}`} className="table-cell">
        {data}
      </td>
    );
  };

  const onEditBtnClick = (tableRow: Record<string, string>) => {
    setEditedRow(tableRow);
  };

  const updateTableCell = (id: string | number, key: string, value: string) => {
    const rowIndex = tableData.findIndex((tableRow: Record<string, string>) => tableRow.id === id);
    const updatingRow = tableData[rowIndex];
    const updatedRow = { ...updatingRow, [key]: value };
    const updatedTableData = [...tableData.slice(0, rowIndex), updatedRow, ...tableData.slice(rowIndex + 1)];
    setTableData([...updatedTableData]);
  };

  const closeModal = () => {
    setEditedRow(null);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="search-container">
        <Search value={search} onChange={onSearch} />
      </div>
      {editedRow && <Modal editedRow={editedRow} close={closeModal} updateTableCell={updateTableCell} />}
      {!!filteredTableData.length ? (
        <table className="table">
          <thead className="table-head">{renderTableHeader()}</thead>
          <tbody className="table-body">{renderTableData()}</tbody>
        </table>
      ) : (
        <div className="empty-text">Empty text</div>
      )}
    </>
  );
};

export default Table;
