import {Container,Row,Col} from 'react-bootstrap'

const FormContainer = ({children})=>
{
    const FormContainerJsx = 
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>

    return FormContainerJsx
}
export default FormContainer