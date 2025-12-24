import './index.css';
import {ReactNode} from 'react';
type Props ={
      isShowModal: boolean, 
      children:ReactNode, 
      title: string
}
export default function Modal(props:Props){
      const {isShowModal, children, title} = props;

      return (
            isShowModal&&
            (<div className='modal'>
                  <div className='inner'>
                        <div className='modalHeader'>{title}</div>
                        <div className='modalContent'>
                              {children}
                        </div>
                  </div>
            </div>)
      )
}