import About from "../about/About"
import ChatAssistant from "../ChatAssistant/ChatAssistant"
import Accordian from "../FAQ/Accordion"

import GoToTop from "../GoTo"
import Hero from "../hero/Hero"




const Home = () => {

  

  return (
    <div>
   
    <Hero/>
    <About/>
   <Accordian/>
    
    <GoToTop/>
    <ChatAssistant/>
    
    </div>
  )
}

export default Home
