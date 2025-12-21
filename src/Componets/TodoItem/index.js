import './index.css';

export default function TodoItem(props){
      const {data,openCheckModal,openEditModal,deleteItem,completeItem} =props;
      return (
            <div className='todoItem'>
                  <input className='checkBox' type='checkbox'
                        defaultChecked={data.isDone}
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