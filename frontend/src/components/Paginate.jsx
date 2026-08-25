import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Paginate = ({pages,page,isAdmin = false,keyword=''}) => {
  return (
    pages>1 && <Pagination>
        {
            [...Array(pages).keys()].map
            (
                (x)=>
                {
                  
                    let ToUrl
                    let PaginationItems
                    if (isAdmin)
                    {
                        ToUrl = `/admin/productlist/${x+1}`
                        PaginationItems = 
                        <LinkContainer key={x+1} to={ToUrl}>
                            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                        </LinkContainer>
                        return PaginationItems
                    }
                    
                    else if (keyword && page)
                    {
                        ToUrl = `/search/${keyword}/page/${x+1}`
                        PaginationItems = 
                        <LinkContainer key={x+1} to={ToUrl}>
                            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                        </LinkContainer>
                        
                        return PaginationItems
                    }
                    else if (keyword)
                    {
                        ToUrl = `/search/${keyword}`
                        PaginationItems = 
                        <LinkContainer key={x+1} to={ToUrl}>
                            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                        </LinkContainer>
                        return PaginationItems
                    }
                    else if (page)
                    {
                        ToUrl = `/page/${x+1}`
                        PaginationItems = 
                        <LinkContainer key={x+1} to={ToUrl}>
                            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                        </LinkContainer>
                        return PaginationItems
                    }
                    
                }
            )
        }
    </Pagination>
  )
}

export default Paginate

