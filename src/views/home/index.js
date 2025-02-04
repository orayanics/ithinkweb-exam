import React from "react";
import { Container, Card } from "reactstrap";

function Index() {
  return (
    <Container>
      <Card className="mt-5 p-5">
        <p className="h1">Nicole Oraya</p>
        <p className="h5">
          I'm a <span className="gradient-text">web developer</span>. I design
          and develop web apps for seamless user experience.
        </p>
        <address>
          <a
            className="h6 text-decoration-none"
            href="mailto:orayanics@gmail.com"
          >
            orayanics@gmail.com
          </a>
          <br />
          <a
            className="h6 fw-normal text-decoration-none fst-italic text-secondary"
            href="tel:+639567052824"
          >
            (+63) 9567052824
          </a>
        </address>
      </Card>
    </Container>
  );
}

export default Index;
