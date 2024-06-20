import "./AboutPage.css";
import aboutImg from "../../assets/images/AboutIMG.jpg";
import AboutRow from "../../components/AboutRow/AboutRow";

const AboutPage = () => {
  return (
    <section className="about-page-container">
      <section className="about-page">
        <h2 className="about-heading text-wheat">About Us</h2>
        <p className="about-p">The book is a good companion</p>
        <section className="about-content">
          <section className="about-text">
            <AboutRow heading="Exceptional client services">What sets our Library apart is our commitment to exceptional service delivered by our highly trained teams in person and online.</AboutRow>
            <AboutRow heading="Extensive resources">
              We have millions of resources including over 450,000 ebooks, 260 databases, and over 90,000 electronic journals. You can also borrow from other libraries using our document delivery services to access millions of other
              publications worldwide.
            </AboutRow>
            <AboutRow heading="Supporting research">The institutional repository, Research Online, showcases the unique research of the University, and Archives Online ensures our unique collections are easily accessible.</AboutRow>
            <AboutRow heading="Inspired learning spaces">We provide quiet and collaborative Library spaces across Wollongong, regional and metropolitan campuses.</AboutRow>
          </section>
          <section className="about-image">
            <img src={aboutImg} alt="about_image" />
          </section>
        </section>
      </section>
    </section>
  );
};

export default AboutPage;
