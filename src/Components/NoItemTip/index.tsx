import './index.css';
import {ReactNode} from 'react';
type Props = {
      children : ReactNode
}
export default function NoItemTip({children}:Props){
      return (
            <div className='tip'>
                  <div className='tipInner'>{children}</div>
            </div>
            
      )
}