import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <section className="brand">
          <h1 className="brand__logo">PetTake</h1>
          <p className="brand__catchphrase">
            Your pet buddy is waiting for you.
          </p>
        </section>

        <section className="sitemap">
          <h2 className="page-footer__section-header sitemap__header">
            Sitemap
          </h2>

          <ul className="sitemap__list">
            <li className="sitemap__list-item">
              <Link
                to="/home"
                className="sitemap__list-link sitemap__list-link__home"
              >
                Home
              </Link>
            </li>

            <li className="sitemap__list-item">
              <Link
                to="/contact"
                className="sitemap__list-link sitemap__list-link__contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </section>

        <section className="contact">
          <h2 className="page-footer__section-header contact__header">
            Contact us
          </h2>

          <ul className="contact__list">
            <li className="contact__list-item">
              <span className="contact__list-logo">
                <FontAwesomeIcon icon={['far', 'envelope']} />
              </span>
              <span className="contact__list-info">
                customer_service@pettake.com
              </span>
            </li>
            <li className="contact__list-item">
              <span className="contact__list-logo">
                <FontAwesomeIcon icon="phone" />
              </span>
              <span className="contact__list-info">+1 2233 44231</span>
            </li>
            <li className="contact__list-item">
              <span className="contact__list-logo">
                <FontAwesomeIcon icon="map-marker-alt" />
              </span>
              <span className="contact__list-info">
                2444 Merryweather street, WI 53188
              </span>
            </li>
          </ul>
        </section>

        <section className="copyright">
          <p>Copyright PetTake</p>
        </section>
      </div>
    </footer>
  );
}
