import {useRef,useState} from 'react';
import Modal from '../Modal/index';
import {formatTime} from '../../libs/util';
import './index.css';

export default function EditModal(props){
      const {data,isShowEditModal,submitEdit} = props;
      // const [isChecked,setChecked] = useState();
      const textRef = useRef();
      const statusRef = useRef();
      function onClick(){
            const val = textRef.current.value;
            if(val==''){
                  val = data.content;
                  textRef.current.value=data.content;
            }
            const newData = {
                  id:new Date().getTime(),
                  content:val,
                  isDone:statusRef.current.checked
            }
            submitEdit(data.id,newData);
      }
      return (
            <Modal isShowModal={isShowEditModal} title='编辑事件'>
                  <p className='time'>时间： {formatTime(data.id)}</p>
                  <div className='editModalContent'>
                        <div className='contentTitle'>事件：</div>
                        <textarea className='editContent' ref={textRef}
                              defaultValue={data.content}
                        ></textarea>
                  </div>
                  
                  <div className='status'>
                        状态：
                        <input className='statusCheckBox' type='checkbox' 
                              ref={statusRef}
                              defaultChecked={data.isDone}
                        ></input>
                  </div>
                  
                  <button className='submitBtn' onClick={onClick}>确认</button>
            </Modal>
            
      )
}