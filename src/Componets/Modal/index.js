import './index.css';

export default function Modal(props){
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