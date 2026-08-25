import { Helmet } from "react-helmet-async"

const Meta = ({title,description,keywords}) => 
{
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />    
    </Helmet>
  )
}


Meta.defaultProps = {
    title:'Welcome to Proshop',
    description:'Best shop ever you can find',
    keywords:'electronics, buy electronics, cheap electronics and others too'
}
export default Meta