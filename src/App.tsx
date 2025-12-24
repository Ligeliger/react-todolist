import {useState, useCallback, useEffect,useRef,useMemo} from 'react';
import './App.css';
import Header from './Components/Header/index';
import AddInput from './Components/AddInput/index';
import TodoItem from './Components/TodoItem/index';
import CheckModal from './Components/CheckModal/index';
import EditModal from './Components/EditModal/index';
import NoItemTip from './Components/NoItemTip/index';
import Footer from './Components/Footer/index';

import { Todo } from './types/todo';

function App() {
  const [isShowAddInput,setShowAddInput] = useState(false);
  const [todoList,setTodoList] = useState<Todo[]>([]);
  const [isShowCheckModal,setShowCheckModal] = useState(false);
  const [currentData,setCurrentData] = useState<Todo|null>(null);
  const [isShowEditModal,setShowEditModal] = useState(false);
  const [history,setHistory] = useState<Todo[][]>([]);
  const [keyword,setKeyword] = useState('');
  const isRefreshed = useRef(false);
  const pointerRef = useRef(0);
  

  const displayList = useMemo(()=>{
    if(!keyword) return todoList;
    return todoList.filter((item)=>{
      return item.content.includes(keyword);
    })
  },[keyword,todoList]);
  

  const updateHistory = useCallback((newTodoList:Todo[])=>{
    newTodoList = JSON.parse(JSON.stringify(newTodoList));
    setHistory((prevHistory)=>{
        console.log("updateHistory--");
        console.log("old-pointerRef.current",pointerRef.current);
        console.log("prevHistory",prevHistory);
        let newHistory = prevHistory.slice(0,pointerRef.current+1);
        newHistory = [...newHistory,newTodoList];
        console.log("new-history",newHistory);
        pointerRef.current++;
        console.log("new-pointerRef.current",pointerRef.current);
        return newHistory;
    });
  },[])


  const showAddInput = useCallback(()=>{
    setShowAddInput(!isShowAddInput);
    if(!isShowAddInput){setKeyword('');}
  },[isShowAddInput]);



  const addItem = useCallback((newData : Todo)=>{
    const newTodoList = [...todoList,newData];
    setTodoList(newTodoList);
    updateHistory(newTodoList);
  },[todoList,updateHistory]);

  const openCheckModal = useCallback((id:number)=>{
    const currentItem = todoList.filter((item)=>item.id===id)[0];
    setCurrentData(currentItem);
    setShowCheckModal(true);
  },[todoList]);
  
  const closeCheckModal = useCallback(()=>{
    setShowCheckModal(false);
  },[])

  const openEditModal = useCallback((id:number)=>{
    const currentItem = todoList.filter((item)=>item.id===id)[0];
    setCurrentData(currentItem);
    setShowEditModal(true);
  },[todoList]);

  const submitEdit = useCallback((id:number,newData:Todo)=>{
    setTodoList((todoList)=>{
      const newTodoList = todoList.map((item)=>{
        if(item.id===id){
          item = newData;
        }
        return item;
      });
      updateHistory(newTodoList);
      return newTodoList;
    });
    setShowEditModal(false);
  },[]);

  const deleteItem = useCallback((id:number)=>{
    setTodoList((todoList)=>{
      const newTodoList = todoList.filter((item)=>item.id!==id);
      updateHistory(newTodoList);
      return newTodoList;
    })
  },[]);

  const completeItem = useCallback((id:number)=>{
    setTodoList((todoList)=>{
      const newTodoList = todoList.map((item)=>{
        if(item.id===id){
          return { ...item, isDone: !item.isDone };//这里得建一个新对象，否则引用地址一样，不会重新渲染check的值
        }
        return item;
      });
      updateHistory(newTodoList);
      return newTodoList;
    });
    
  },[]);

  const forward = useCallback(()=>{
    if(pointerRef.current===history.length-1){
      console.log("forward--pointerRef.current==history.length-1--");
      console.log("pointerRef.current",pointerRef.current);
      console.log("history",history);
      return;
    }else{
      console.log('forward--real--');
      console.log('old--pointerRef.current',pointerRef.current);
      console.log("history",history);
      setTodoList(history[++pointerRef.current]);
      console.log("new--pointerRef.current",pointerRef.current);
    }
  },[history]);
  const backward = useCallback(()=>{
    if(pointerRef.current){
      console.log('backward--realbackfoward--');
      console.log('old  pointerRef.current',pointerRef.current);
      console.log('history',history);

      setTodoList(history[--pointerRef.current]);
      console.log('new  pointerRef.current',pointerRef.current);

    }else if(pointerRef.current===0){
      console.log('backward--pointerRef.current==0--');
      console.log('pointerRef.current',pointerRef.current);
      console.log("history",history);
      return;
    }
   
  },[history]);
  // const completeItem = useState(()=>{
    
  // })


  useEffect(()=>{
    const todoData :Todo[] = JSON.parse(localStorage.getItem('todoData')||'[]');
    setTodoList(todoData||[]);
    setHistory([todoData||[]]);
    isRefreshed.current = true;
    console.log("isRefreshed.current",isRefreshed.current);
  },[]);

  useEffect(()=>{
    if(!isRefreshed.current && !todoList.length){
      return;
    }
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
      {!isShowAddInput?(
        <div className='searchInputBox'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  width="20"
                                height="20"
                                fill="currentColor">
                                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
                          </svg>
          <input className='searchInput' value={keyword} onChange={ev=>setKeyword(ev.target.value)} />
          <div className='clearKeyword' onClick={()=>{setKeyword('')}}>清空</div>
        </div>        
      ):null}

      

      <AddInput isShowAddInput={isShowAddInput} addItem={addItem}></AddInput>
      {/* <SearchInput isSearching={isSearching} onSearch={onSearch}></SearchInput> */}
            
      {!displayList.length? (<NoItemTip>{keyword?'无匹配结果':'您还没有待办事项'}</NoItemTip>)
        :(
          
          <ul className='todoList'>
            {displayList.map((item)=>
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
      
      <Footer forward={forward} backward={backward}></Footer>
    </div>
  );
}

export default App;
