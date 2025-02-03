import { useEffect, useState } from "react";
import { postApi, getApi } from "../../Repository/Api";
import "./SavedList.css";
import endPoints from "../../Repository/apiConfig";

export const ListModal = ({ isOpen, onClose, productId }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getApi(endPoints.getUserSavedList(), {
        setResponse: (data) => {
          console.log(data);
          if (data.length < 1) {
            setLists(data);
          }
        },
      });
    }
  }, [isOpen]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    postApi(
      endPoints.createList,
      { name: newListName },
      {
        setResponse: (data) => {
          setLists([...lists, data.list]);
          setNewListName("");
        },
      }
    );
  };

  const handleAddToList = async (listId) => {
    setSelectedList(listId);

    try {
      await postApi(`/api/lists/${listId}/add`, { productId });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="list-modal-overlay" onClick={onClose}>
      <div className="list-modal" onClick={(e) => e.stopPropagation()}>
        <div className="list-modal-header">
          <h3>Add to List</h3>
          <button className="list-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="create-list-section">
          <input
            type="text"
            className="create-list-input"
            placeholder="Enter new list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button className="create-list-button" onClick={handleCreateList}>
            Create New List
          </button>
        </div>

        <div className="existing-lists">
          {lists.map((list) => (
            <div
              key={list.id}
              className={`list-item ${
                selectedList === list.id ? "selected" : ""
              }`}
              onClick={() => handleAddToList(list.id)}
            >
              <span className="list-item-name">{list.name}</span>
              <span className="list-item-check">
                <FaCheck />
              </span>
            </div>
          ))}
        </div>
      </div>
      {showSuccess && (
        <div className="list-success-message">Added to list successfully!</div>
      )}
    </div>
  );
};
