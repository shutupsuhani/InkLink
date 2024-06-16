import ChatAssistant from "../ChatAssistant/ChatAssistant"
import Accordian from "../FAQ/Accordion"
import GoToTop from "../GoTo"
import About from "../about/About"
import Footer from "../footer/Footer"
import Hero from "../hero/Hero"
import Topbar from "../topbar/Topbar"

const Home = () => {

  

  return (
    <div>
    <Topbar/>
    
    <About/>
    <Accordian/>
    <GoToTop/>
    <ChatAssistant/>
    <Footer/>
    </div>
  )
}

export default Home
