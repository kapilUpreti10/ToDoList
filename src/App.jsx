/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [arrData, setArrData] = useState([]);
  const [message, setMessage] = useState("");

  // Load data from local storage when the  page is reloaded 
  React.useEffect(() => {
    const storedData = localStorage.getItem('todoData');
    // this is used to check if data is stored in localstorage or not 
    if (storedData) {
      setArrData(JSON.parse(storedData));
    }
  }, []);
  // empty dependency indicates it should run only once and dont response to change in variable state or props ie kunai props,state change huda yo rerender hudaina 

  const addToDo = () => {
    if (data == "") {
      setMessage("Please write something to add..!!");

    }
    else {
      setArrData((oldData) => {
        const newData = [...oldData, data];
        localStorage.setItem('todoData', JSON.stringify(newData)); // Save to local storage
        return newData;  // this sets value of arrData as newData through setArrData
      });
      setData('');
    }
  }

  function InputEvent(e) {
    setData(e.target.value);
    setMessage("");
  }

  function handlingEnter(e) {
    if (e.key === "Enter") {
      addToDo();
    }
  }



  function deleteItem(index) {
    // this is done to get access to old array using useState
    setArrData((oldData) => {
      const newDataaa = oldData.filter((val, i) => i !== index);// since filter(value,index) hunxa second access garna first arg ni pass garnuparyo so here val is passed 
      localStorage.setItem('todoData', JSON.stringify(newDataaa)); // Save to local storage
      return newDataaa;
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
            onKeyDown={handlingEnter}
          />
          <button onClick={addToDo}><i className="fa-solid fa-plus"></i></button>
        </div>
        <p id='alertMessage'>{message}</p>

        <div className='addedContainer'>
          <ul>
            {arrData.map((arrValue, index) => (
              <div className="addedItems" key={index}>
                <i
                  className="fa-regular fa-circle-xmark"
                  onClick={() => deleteItem(index)}
                // if function ma arg ma pass garne ho vane sadhai yesari callback use garerw nai garnuparne hunxa 
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
