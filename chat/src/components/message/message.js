// Assuming your existing Message component looks like this
const Message = ({ user , message ,classs }) => {
    if(user){
        return (
            <div className={`bg-cyan-300 float-right w-60 xl:w-72 p-2 text-md font-serif font-normal rounded-md m-4 ${classs}`}>
                {`${user} : ${message}`}
            </div> 
        )   
    }
    else{
        return (
            <div className={`bg-green-300 w-60 xl:w-72 p-2 text-md font-serif font-normal rounded-md float-left m-4 ${classs}`}>
                {`You : ${message}`}
            </div>
        );
    }
    
  };
  export default Message;