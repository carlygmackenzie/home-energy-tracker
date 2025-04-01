import { useState } from 'react';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { IoWarningOutline } from "react-icons/io5";
import '../styles/Hover.css';

const Hover = ({ message, image, addStyle }) => {

    const [hover, setHover] = useState(false);

    const getImage = () => {
        if(image === 'question'){
            return <RxQuestionMarkCircled 
                className='small question-mark'
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} />
        }
        else if(image === 'warning'){
            return <IoWarningOutline
                className='small warning'
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} />
        }
    }
    return (
        <div>
            {getImage()}
            <span className={hover ? `hover-box ${addStyle}` : 'none'}>
                {typeof message === 'object' ?
                    message.map((item, index) => 
                        <p key={index}>
                            {item}
                        </p>
                    )
                :
                <p>{message}</p>
            }
            </span>
        </div>   
    )
}

export default Hover;