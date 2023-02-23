import { useState } from "react"

 const Test = () => {
    const [test, setTest] = useState<string>('');
    
    setTest('ciao')
    
    return(
        <>
        {test}
        </>
    )
}
export default Test;