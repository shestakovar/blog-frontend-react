import React from 'react'
import { Container } from 'react-bootstrap';
import { Telegram, Github } from 'react-bootstrap-icons';

const Footer = () => {
  return (

    <footer className="mt-5 text-center text-lg-start bg-light text-muted ">
      <Container>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

          <div className="me-5 d-none d-lg-block">
            <span>Свяжитесь со мной:</span>
          </div>


          <div>

            <a href="https://t.me/shestakovar" className="me-4 text-reset">
              <Telegram />
            </a>
            <a href="https://github.com/shestakovar" className="me-4 text-reset">
              <Github />
            </a>

          </div>

        </section>
      </Container>
    </footer>

  )
}

export default Footer;
