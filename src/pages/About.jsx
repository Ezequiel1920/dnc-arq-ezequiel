import { useContext } from 'react'
import AbouText from "../components/AboutText/AboutText"
import Banner from "../components/Banner/Banner"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Footer from "../components/Footer/Footer"
import ProjectsList from "../components/ProjectsList/ProjectsList"

// CONTEXT
import { AppContext } from "../contexts/AppContext"

function About() {
    const appContext = useContext(AppContext)
    return (
        <>
            <Header/>
            <Banner title={appContext.languages[appContext.language].menu.about} image="about.svg" />
            <div className="container">
               <AbouText /> 
            </div>
            <Footer/>
        </>
    )
}

export default About