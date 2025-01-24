// import React from 'react'

// export default function App() {
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//           <th>no</th>
//           <th>name</th>
//           <th>price</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>k</td>
//                     <td>b</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </td>
//             <td></td>
//             <td></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }


import React, { useState } from "react";

export default function App() {
  let months = [31, 28, 31,21];

  let obj = [
    {
      name: "karan",
      leaves: [
        {
          start: new Date(2025, 0, 5),
          end: new Date(2025, 1, 20),
        },
        {
          start: new Date(2025, 2, 9),
          end: new Date(2025, 3, 16),
        },
      ],
    },
    {
      name: "sanjay",
      leaves: [
        {
          start: new Date(2025, 2, 10),
          end: new Date(2025, 1, 20),
        },
        {
          start: new Date(2025, 2, 8),
          end: new Date(2025, 2, 16),
        },
      ],
    },
  ];

  let [toggle, settoglle] = useState(false);



  function helperfunc(leavesarry,month,date){
    let newdate=new Date(2025,month,date);
    
    
    
   return leavesarry.some((i)=>{
    


        // if(month>=i.start.getMonth()&&month<=i.end.getMonth()){


         
        //         if(date>=i.start.getDate()&&date<=i.end.getDate()){
        //           return true
        //         }
        //         else{
        //           return false
        //         }
                
        // }
        // else{
        //   return false;
        // }


        if(newdate>=i.start&&newdate<=i.end){
          return true
        }

        // if(month)

      
        //  return  month==i.start.getMonth() && date>=i.start.getDate() ||i.end.getMonth()==month && date==i.end.getDate() ;
    })
    
  }

  function func1(leavesarry,month,date){
    let newdate=new Date(2025,month,date);

   

        
   leavesarry.some((i)=>{

    if(newdate>=i.start&&newdate<=i.end){
      alert("start="+i.start.toLocaleDateString('en-GB',{
        year:'numeric',
        month:'short',
        day:'numeric'

      }) +" end date="+i.end.toLocaleDateString('en-GB',{
        year:'numeric',
        month:'short',
        day:'numeric'

      }))
      
      
    }
  })
    
    
  }

  return (
    <div>
      <table className="maintable">
        <thead>
          <tr>
            <th>name</th>
            <th>jan</th>
            <th>feb</th>
            <th>march</th>
            <th>april</th>
          </tr>
        </thead>

        <tbody>
          {obj.map((item, index) => {
            let leavespan = item.leaves.length;

            let i = 0;
            let startmonth = item.leaves[i].start.getMonth();
            let startdate = item.leaves[i].start.getDate();

            i < leavespan ? i++ : 0;



            return (
              <>
                <tr>
                  <td>{item.name}</td>

                  {months.map((month, monthindex) => {
                    return (
                      <>
                        <td className="p-0">
                          <table className="secondtable">
                            <tbody>
                              <tr>  
                                {Array.from({ length: month }, (_, index2) => {
                                 
                                  let date = index2 + 1;
                                  const isHighlighted = (monthindex === startmonth && date === startdate)||(0);
                                  // console.log(isHighlighted);


                                  let isleave=helperfunc(item.leaves,monthindex,date)
                                  console.log(isleave)

                                

                                  return (
                                    <>
                                      {isleave ? (
                                        <td style={{ background: "red" }} onMouseOver={()=>func1(item.leaves,monthindex,date)}>
                                          
                                        </td>
                                      ) : (
                                        <td></td>
                                      )}
                                    </>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
//leave paller website




// belo is the css 


table,tr{
    border: 1px solid red;
    border-collapse: collapse;


   


         

}

.maintable{
    td{
        padding: 2px;
    }
}


.secondtable{

    height: 30px;

}