import {Container,Row,Col} from 'react-bootstrap'

const Footer = ()=>
{
    const presentYear = new Date().getFullYear()

    const FooterElement = 
    <footer>
        <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>ProShop {presentYear}</p>
                    </Col>
                </Row>

        </Container>
    </footer>


    return FooterElement
}

export default Footer