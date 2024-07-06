import {data} from '../../../data/grid-section';
import Button from '../HomePage/Button';

function GridSection()
{
    return(
        <div>
            <div className='mt-20 max-w-[1000px]  w-[80%] mx-auto grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-4  '>
                
                {
                    data.map((element , index)=>{
                        return(
                            <div key={index} className={`text-white p-4 pb-6 
                                            ${(element.position==3)?('lg:col-start-2'):('')}
                                        
                                        ${((element.position %2) == 0)?('bg-richblack-800'):('bg-richblack-700')}
                                        ${(element.position==-1)?('min-[600px]:col-start-1 min-[600px]:col-end-3 bg-richblack-900'):('')}
                            `}>
                                {
                                (element.position== -1)?
                                // First eleemnt
                                (<div className='  text-white border-white font-semibold'>
                                    <div className='text-2xl'>{element.heading}<span className='text-blue-300'> {element.highlightText}</span></div>
                                    <div className='mt-2 mb-7 text-richblack-400'>{element.description}</div>
                                    <Button className='' active={true} linkTo={'/login'}>Learn More</Button>
                                </div>):
                                // Secod eleemnt
                                (<div className={``}>
                                    <div className='text-lg'>{element.heading}</div>
                                    <div className=' mt-8 text-richblack-200'>{element.description}</div>
                                </div>)
                            }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GridSection;