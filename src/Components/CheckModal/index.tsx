import Modal from '../Modal/index';
import {formatTime} from '../../libs/util';
import './index.css';
import {Todo} from '../../types/todo';
type Props = {
      isShowCheckModal:boolean,
      data:Todo,
      closeCheckModal : ()=>void
}
export default function CheckModal(props:Props){
      const { isShowCheckModal,data,closeCheckModal } = props;
      return (
            <Modal isShowModal={isShowCheckModal} title='查看事件'>
                  <p className='text'>时间： {formatTime(data.id)}</p>
                  <p className='text '>{'事件： '+data.content}</p>
                  <p className='text'>{'状态： '+(data.isDone?'已完成':'未完成')}</p>
                  <button className='closeBtn' onClick={closeCheckModal}>关闭</button>
            </Modal>
      )
}