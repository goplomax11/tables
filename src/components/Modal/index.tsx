import { useEffect, useState } from "react";
import { findTextKeyValue } from "../../helpers/findTextValue";
import "./index.css";

interface ModalProps {
  close: () => void;
  editedRow: Record<string, string>;
  updateTableCell: (id: string, label: string, inputValue: string) => void;
}

const Modal = ({ close, editedRow, updateTableCell }: ModalProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [label, value] = findTextKeyValue(editedRow);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const save = () => {
    updateTableCell(editedRow.id, label, inputValue);
    close();
  };

  return (
    <>
      <div className="modal-background" onClick={close} />
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <h4 className="modal-heading">Edit</h4>
          </div>
          <form className="modal-content" onSubmit={(e) => e.preventDefault()}>
            <div className="modal__input-wrapper">
              <label className="modal__input-label">{label}</label>
              <input
                className="modal__input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="modal__actions">
              <div className="modal__actions-container">
                <button className="modal__save-btn" onClick={save}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
