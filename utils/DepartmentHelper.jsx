import { useNavigate } from "react-router-dom"
import axios from 'axios'
export const columns = [
    {
    name:"S No",
    selector:(row) => row.sno
    },
    {
    name:"Department Name",
    selector:(row) => row.dep_name,
    sortable:true
    },
     {
    name:"Action",
    selector:(row) => row.action
    },
    

   

]
export const DepartmentButton=({_id,onDepartmentDelete})=>{
    const navigate = useNavigate()
    const handleDelete =async(id)=>{
        const confirm = window.confirm("Do you want to delete?")
         if(confirm){
     try{
       
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/department/${id}`,{
          headers:{

          }
        })
        if(response.data.success){
         onDepartmentDelete(id)
        }
    
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
  }
}
    }
    return(
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
            <button className="w-full sm:w-auto px-4 py-2 bg-teal-400 text-white rounded text-sm sm:text-base" 
            onClick={()=>navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="w-full sm:w-auto px-4 py-2 bg-red-400 text-white rounded text-sm sm:text-base" onClick={()=>handleDelete(_id)}>Delete</button>
        </div>
    )
}

