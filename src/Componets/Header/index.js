import './index.css';

export default function Header(props){
      const {showAddInput} =props;
      return(
            <div className='header'>
                  <div className='title'>待办事项清单</div>
                  <div className='addBtn' onClick={showAddInput}>+</div>
            </div>
      )
}