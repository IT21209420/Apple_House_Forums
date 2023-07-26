import { cleanEnv } from "envalid"; 
import { port, str } from "envalid/dist/validators";


export default cleanEnv(process.env,{// validating and accessing environment variables 
    URL : str(),
    PORT : port(),
    SECRET : str()
  
})