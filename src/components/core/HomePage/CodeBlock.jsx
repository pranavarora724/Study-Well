import { TypeAnimation } from "react-type-animation";

function CodeBlock({codeContent , codeColor})
{
    return(
        <div className="flex flex-row gap-x-1">

            {/* Numbering */}
            <div className="flex flex-col w-[10%] items-end  border-white text-pure-greys-400">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
            </div>

            {/* Code */}
            <TypeAnimation className={`w-[90%] ${codeColor}`}  
            sequence={[codeContent , 500 , '']}
            speed={50}
            omitDeletionAnimation={true}
            repeat={Infinity}
            style={
                {
                    whiteSpace: 'pre-line',
                    display:'block'
                }
            }
            />
        </div>
    )
}

export default CodeBlock;