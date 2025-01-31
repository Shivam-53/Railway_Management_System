const jwt=require("jsonwebtoken")
const dotenv=require('dotenv');
dotenv.config();
let secretkey;

const tokenGeneration = async (phoneNumber,role) => {
    try {
        if(role=="admin"){
            secretkey=process.env.adminToken;
        }else{
            secretkey=process.env.userToken;
        }
        const token = jwt.sign({ message: phoneNumber }, secretkey, { expiresIn: '1h' });
        console.log("Token issued:", token);
        console.log("Token type:", typeof token);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};
let key;
const userauthentication = async (req, role) => {
    try {
        console.log(role);
        
        if(role=="admin"){
            key="admin";
        }
        else{
            key="user"
        }
        console.log("inside auth");
        
        const bearerToken = req.headers['authorization'];
        console.log("bearerToken:", bearerToken);
        const btoken = bearerToken.split(" ");
        console.log("Split token:", btoken);
        
        const bTokenInString = btoken[1];
        console.log("Token in string:", bTokenInString);

        const verification = jwt.verify(bTokenInString, key);
        console.log("Verification result:", verification);

        if (verification) {
            return 200;
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return 404;
    }
};


const checkapikey=async(keyy)=>{
    
    const apikey=keyy;
    console.log("wasd ",apikey," ",process.env.apikey);
    
    if(apikey==process.env.apikey){
        return 1;
    }
    return 0;
}




module.exports={tokenGeneration,userauthentication,checkapikey}