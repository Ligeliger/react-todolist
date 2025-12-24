import './index.css';
type Props ={
      forward:()=>void
      backward:()=>void
}
export default function Footer(props:Props){
      const {forward,backward} = props;
      return(
            <div className='footer'>
                  <div onClick={backward}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <line x1="19" y1="12" x2="5" y2="12" />
                              <polyline points="12 19 5 12 12 5" />
                        </svg>                        
                  </div>
                  <div onClick={forward}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                        </svg>                        
                  </div>


            </div>
      )
}