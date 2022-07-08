import { useState } from "react";

interface IPageable{
    empty: boolean,
      first:boolean,
      last:boolean,
      number: number
      numberOfElements: number,
      size:number,
      totalElements: number,
      totalPages: number
  }

const FormPagination = () => {
    const[pagination, setPagination] = useState<IPageable>();
    const[pagesNumber, setPagesNumber] = useState<number[]>([]);
    const[page, setPage] = useState<number>(0);
    
    return (

    <div className="pagination">
              {pagination?.first? null:  <i className="paginationImage" onClick={()=>setPage(page-1)}>
              <img src="../assets/images/PathLeft.svg" alt="detailIcon" />
            </i>}
            {pagesNumber.map((p,i)=>(
               <i className="paginationImage" key={i}>
               <img src={i==pagination?.number?"../assets/images/EllipseDark.svg":"../assets/images/EllipseW.svg"} alt="detailIcon"/>
             </i>
            ))}
           
            
            {pagination?.last?null: <i className="paginationImage" onClick={()=>setPage(page+1)}>
              <img src="../assets/images/PathR.svg" alt="detailIcon"/>
            </i>}
            </div>
);
};
export default FormPagination;