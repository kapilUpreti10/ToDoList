import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [arrData, setArrData] = useState([]);

  // Load data from local storage when the component mounts
  React.useEffect(() => {
    const storedData = localStorage.getItem('todoData');
    if (storedData) {
      setArrData(JSON.parse(storedData));
    }
  }, []);

  const addToDo = () => {
    setArrData((oldData) => {
      const newData = [...oldData, data];
      localStorage.setItem('todoData', JSON.stringify(newData)); // Save to local storage
      return newData;
    });
    setData('');
  }

  function InputEvent(e) {
    setData(e.target.value);
  }

  function deleteItem(index) {
    setArrData((oldData) => {
      const newData = oldData.filter((_, i) => i !== index);
      localStorage.setItem('todoData', JSON.stringify(newData)); // Save to local storage
      return newData;
    });
  }

  return (
    <>
      <div className='container'>
        <h1>To-Do List:</h1>
        <div className='input'>
          <input
            type="text"
            placeholder='Write to do here..'
            value={data}
            onChange={InputEvent}
          />
          <button onClick={addToDo}><i className="fa-solid fa-plus"></i></button>
        </div>
        <div className='addedContainer'>
          <ul>
            {arrData.map((arrValue, index) => (
              <div className="addedItems" key={index}>
                <i
                  className="fa-regular fa-circle-xmark"
                  onClick={() => deleteItem(index)}
                />
                <li>{arrValue}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
