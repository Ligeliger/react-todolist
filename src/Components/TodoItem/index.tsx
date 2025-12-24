import './index.css';
import { Todo } from '../../types/todo';
type Props = {
      data : Todo,
      openCheckModal : (id : number)=>void,
      openEditModal : (id : number)=>void,
      deleteItem: (id : number)=>void,
      completeItem: (id : number)=>void
}
export default function TodoItem(props: Props){
      const {data,openCheckModal,openEditModal,deleteItem,completeItem} =props;
      return (
            <div className='todoItem'>
                  <input className='checkBox' type='checkbox'
                        checked={data.isDone}//这里不能用defaultCheck 只在首次渲染的时候赋一次值，之后只能手动更改
                        onChange={()=>{
                              completeItem(data.id);
                        }}
                  ></input>
                  <div className={data.isDone?'content done':'content'}>{data.content}</div>
                  <button className='btn btn-check'
                        onClick={()=>{openCheckModal(data.id)}}
                  >查看</button>
                  <button className='btn btn-edit'
                        onClick={()=>{openEditModal(data.id)}}
                  >编辑</button>
                  <button className='btn btn-delete'
                        onClick={()=>{
                              deleteItem(data.id);
                        }}
                  >删除</button>
              
            </div>
      )
}