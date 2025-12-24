import {useRef} from 'react';
import './index.css';
import {Todo} from '../../types/todo';
type Props = {
      isShowAddInput:boolean, 
      addItem : (newData:Todo)=>void
}
export default function AddInput(props :Props){
      const {isShowAddInput, addItem} =props;
      const textRef = useRef<HTMLInputElement>(null);
      const btnRef = useRef<HTMLButtonElement>(null);
      if(textRef.current&&btnRef.current){
            textRef.current.addEventListener('keydown', function(event) {
                  if (event.key === 'Enter') {
                        event.preventDefault();
                        btnRef.current?.click();
                  }
            });
      }

      function onClick(){
            const val = textRef.current?.value;
            if(!textRef.current||!val){
                  return;
            }
            const newData :Todo = {
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
                  <button className='confirmBtn' onClick={onClick} ref={btnRef}>添加</button>
            </div>)
      )
}