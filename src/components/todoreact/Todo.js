import React, { useState, useEffect } from 'react'
import "./style.css"

// get localStorageData(save in browser) : initially empty
// string to array
const getLocalStorageData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists)
  } else {
    return []
  }
}

const Todo = () => {

  const [inputData, setinputData] = useState("")
  const [items, setItems] = useState(getLocalStorageData())
  const [isEditItem, setEditItem] = useState("")   // item to edit
  const [toggleButton, settoggleButton] = useState(false)                             // update button

  // add items function
  const addItem = () => {
    if (!inputData) {
      alert('Please add any item')
    }

    // adding when updating (given id of that item)
    // get thatfirst : take all prev : update that name
    // now inputdata is set to updated

    else if(inputData && toggleButton){   //came from edit -> toggle true -> addItem
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {   // toggle true so there is a editing id item 
            return { ...curElem, name: inputData };  
          }
          return curElem;
        })
      );

      // reset editing tools to null after done
      setinputData("");
      setEditItem(null);
      settoggleButton(false);
    }

    // add new 
    else
     {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]) // add in list
      setinputData('')    // empty box
    }
  }

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };


  // update : find-> return 1 only
  const editItem = (id) => {
    const itemToEdit = items.find((curr) => {
      return curr.id === id
    })
    setinputData(itemToEdit.name)  
    setEditItem(id)        
    settoggleButton(true)  //edit button -> now will go to addItem part

  }

  // remove all from list
  const removeAll = () => {
    setItems([])
  }

  // adidng data to local storage : when [] items will change : inspect
  //  claer on refresh
  // takes key value pair : string form
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo" />
            <figcaption>Add your list here</figcaption>
          </figure>

          {/*  set input && add item */}
          <div className="addItems">
            <input type="text" placeholder='✍️ add items' className='form-control'
              value={inputData}
              onChange={(e) => setinputData(e.target.value)}
            />

            {/* toggle =1 : add when edit is clicked , else when plus */}
            {toggleButton ? 
             ( <i className='fa fa-edit add-btn'
                onClick={addItem} ></i>
              )
             :
           ( <i className='fa fa-plus add-btn' onClick={addItem} ></i> )
            }

          </div>


          {/* show items */}
          
          <div>
            <div className="showItems">

              {items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"    // edit item
                        onClick={() => editItem(curElem.id)}  ></i>
                      <i
                        className="far fa-trash-alt add-btn"   // delete item
                        onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                );
              })}

            </div>


            {/* remove all buttons */}
          </div>

          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Todo

// list : { id , item}
// id = date
// { fun } = {()=> fun()}
// useeffect = storage