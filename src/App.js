import {useState, useCallback, useEffect} from 'react';
import './App.css';
import Header from './Componets/Header/index';
import AddInput from './Componets/AddInput/index';
import TodoItem from './Componets/TodoItem/index';
import CheckModal from './Componets/CheckModal/index';
import EditModal from './Componets/EditModal/index';
import NoItemTip from './Componets/NoItemTip/index';

function App() {
  const [isShowAddInput,setShowAddInput] = useState(false);
  const [todoList,setTodoList] = useState([]);
  const [isShowCheckModal,setShowCheckModal] = useState(false);
  const [currentData,setCurrentData] = useState(null);
  const [isShowEditModal,setShowEditModal] = useState(false);

  const showAddInput = useCallback(()=>{
    setShowAddInput(!isShowAddInput);
  },[isShowAddInput]);

  const addItem = useCallback((newData)=>{
    setTodoList([...todoList,newData]);
  },[todoList]);

  const openCheckModal = useCallback((id)=>{
    const currentItem = todoList.filter((item)=>item.id==id)[0];
    setCurrentData(currentItem);
    setShowCheckModal(true);
  },[todoList]);
  
  const closeCheckModal = useCallback(()=>{
    setShowCheckModal(false);
  },[])

  const openEditModal = useCallback((id)=>{
    const currentItem = todoList.filter((item)=>item.id==id)[0];
    setCurrentData(currentItem);
    setShowEditModal(true);
  },[todoList]);

  const submitEdit = useCallback((id,newData)=>{
    setTodoList((todoList)=>{
      return todoList.map((item)=>{
        if(item.id==id){
          item = newData;
        }
        return item;
      })
    });
    setShowEditModal(false);
  },[]);

  const deleteItem = useCallback((id)=>{
    setTodoList((todoList)=>{
      return todoList.filter((item)=>item.id!==id)
    })
  },[]);

  const completeItem = useCallback((id)=>{
    setTodoList((todoList)=>{
      return todoList.map((item)=>{
        if(item.id==id){
          item.isDone=!item.isDone;
        }
        return item;
      })
    })
  },[]);


  useEffect(()=>{
    const todoData = JSON.parse(localStorage.getItem('todoData'));
    setTodoList(todoData||[]);
  },[]);

  useEffect(()=>{
    localStorage.setItem('todoData',JSON.stringify(todoList));
  },[todoList]);


  return (
    <div className="App">

      {currentData&&(
        <CheckModal isShowCheckModal={isShowCheckModal} 
        data={currentData} closeCheckModal={closeCheckModal}
      ></CheckModal>
      )}

      {currentData&&(
        <EditModal isShowEditModal={isShowEditModal}
        data={currentData} submitEdit={submitEdit}
      ></EditModal>)}

      <Header showAddInput={showAddInput}></Header>

      <AddInput isShowAddInput={isShowAddInput} addItem={addItem}></AddInput>
      
        {!todoList.length? (<NoItemTip></NoItemTip>)
        :(
          <ul className='todoList'>
            {todoList.map((item)=>
              <TodoItem key={item.id} data={item}
                openCheckModal = {openCheckModal}
                openEditModal = {openEditModal}
                deleteItem = {deleteItem}
                completeItem = {completeItem}
              ></TodoItem>
            )}
          </ul>
        )
      }
      
      
    </div>
  );
}

export default App;
