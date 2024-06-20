import "./HomePage.css";
import { FaCheck } from "react-icons/fa";
import bookshelf_img from "../../assets/images/library5.jpg";

const HomePage = () => {
  const authors = [
    {
      author: "Jane Austen",
      quote: `"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife." - Pride and Prejudice`,
    },
    {
      author: "Mark Twain ",
      quote: `"The two most important days in your life are the day you are born and the day you find out why." - Pudd'nhead Wilson's Calendar`,
    },
    {
      author: "Gabriel Garcia Marquez",
      quote: `"He who awaits much can expect little." - Love in the Time of Cholera`,
    },
    {
      author: "J.K. Rowling",
      quote: `"It is our choices, Harry, that show what we truly are, far more than our abilities." - Harry Potter and the Chamber of Secrets`,
    },
    {
      author: "Ernest Hemingway",
      quote: `"The world breaks everyone, and afterward, some are strong at the broken places." - A Farewell to Arms`,
    },
  ];

  return (
    <div className="site-wrap" id="home-section">
      <div className="site-section-cover overlay">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10 text-center">
              <h1>
                Exploring <strong>worlds</strong> through <strong>pages</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img className="img-fluid w-100" src={bookshelf_img} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="mb-4">#1 Destination for Knowldge Exploration</h1>
              <p className="mb-4">
                Step into the enchanting world of knowledge at our library,
                where every shelf is a realm of discovery.
              </p>
              <p>
                <FaCheck className="text-teal me-3" />
                Experience the serenity of our library
              </p>
              <p>
                <FaCheck className="text-teal me-3" />
                Enjoy the flexibility of extended opening hours
              </p>
              <p>
                <FaCheck className="text-teal me-3" />
                Access a wealth of knowledge beyond the physical shelves with
                our digital resources
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tm-container">
        <div className="tm-container-inner">
          <section className="tm-text-section">
            <div className="tm-timelines">
              <h2 className="tm-text-green mb-5">Some Author's Qoutes</h2>
              <div className="tm-timelines-inner">
                <div className="tm-timeline-white-bar"></div>
                <div className="tm-timeline-circle"></div>
                {authors.map((value, index) => (
                  <div
                    className="tm-timeline mb-4 tm-first-timeline"
                    key={index}
                  >
                    <div className="media tm-media">
                      <div className="media-body tm-media-body tm-media-body-ml-1">
                        <h5 className="mt-0 tm-text-green">{value.author}</h5>
                        {value.quote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
