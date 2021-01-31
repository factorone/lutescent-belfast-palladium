import React from "react";
import { Row, Col } from "reactstrap";

import ImageUpload from "components/CustomUpload/ImageUpload.js";

class Wizard extends React.Component {
    render() {
        return (
            <>
                <h5 className="info-text">Who are you? (Fileinput)</h5>
                <Row className="justify-content-center">
                    <Col className="text-center" lg="10">
                        <ImageUpload
                            changeBtnClasses="btn-simple"
                            addBtnClasses="btn-simple"
                            removeBtnClasses="btn-simple"
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

export default Wizard;
