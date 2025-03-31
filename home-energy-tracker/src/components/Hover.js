import { useState } from 'react';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { IoWarningOutline } from "react-icons/io5";

const Hover = ({ message, image }) => {

    const [hover, setHover] = useState(false);

    const getImage = () => {
        if(image === 'question'){
            return <RxQuestionMarkCircled 
                className='question-mark'
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} />
        }
        else if(image === 'warning'){
            return <IoWarningOutline
                className='warning'
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} />
        }
    }
    return (
        <div>
            {getImage()}
            <span className={hover ? "hover-box" : "none"}>{message}</span>
        </div>   
    )
}

export default Hover;