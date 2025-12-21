import {useRef} from 'react';
import './index.css';

export default function AddInput(props){
      const {isShowAddInput, addItem} =props;
      const textRef = useRef();
      function onClick(){
            const val = textRef.current.value;
            if(val===''){
                  return;
            }
            const newData = {
                  id : new Date().getTime(),
                  content : val,
                  isDone : false
            }
            addItem (newData);
            textRef.current.value='';
      }
      return (
            isShowAddInput&&
            (<div className="addInputBox">
                  <input className='addInput' ref={textRef}/>
                  <button className='confirmBtn' onClick={onClick}>添加</button>
            </div>)
      )
}