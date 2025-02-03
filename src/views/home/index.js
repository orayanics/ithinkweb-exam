import React from "react";
import { Container, Card } from "reactstrap";

function Index() {
  return (
    <Container>
      <Card className="mt-5 p-5">
        <h1 className="display-4">Nicole E. Oraya</h1>
        <address>
          <a href="mailto:orayanics@gmail.com">orayanics@gmail.com</a>
          <br />
          <a href="tel:+639567052824">(+63) 9567052824</a>
        </address>
      </Card>
    </Container>
  );
}

export default Index;
