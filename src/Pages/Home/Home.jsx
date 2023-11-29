import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import CallToAction from "./CallToAction/CallToAction";
import Category from "./Category/Category";
import ContactUs from "./ContactUs/ContactUs";
import Experiences from "./Experiences/Experiences";
import Gallery from "./Gallery/Gallery";
import NewsLatter from "./NewsLatter/NewsLatter";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <Gallery></Gallery>
            <Experiences></Experiences>.
            <ContactUs></ContactUs>
            <NewsLatter></NewsLatter>
        </div>
    );
};

export default Home;