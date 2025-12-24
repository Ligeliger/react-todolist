import './index.css';
type Props = {
      showAddInput : ()=>void
}
export default function Header(props:Props){
      const {showAddInput} =props;
      return(
            <div className='header'>
                  <div className='title'>待办事项清单</div>
                  <div className='addBtn' onClick={showAddInput}>+</div>
            </div>
      )
}