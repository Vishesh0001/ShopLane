class Validator{

     async checkValidation(data,schema){
        // (data);
        // console.log(schema,data);
        
        
   const {error} = await schema.validateAsync(data,{abortEarly:true}).catch(err => { return { error: err }}) // this wiill be giving first erroe that appears
       if(error){
   
        return{
          

            message: {keyword: error.details[0].message},
           
        }
       }else{
        return false
       }
    }
}module.exports = new Validator()