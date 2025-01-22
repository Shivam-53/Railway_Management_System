const jwt=require("jsonwebtoken")
let secretkey;

const tokenGeneration = async (phoneNumber,role) => {
    try {
        if(role=="admin"){
            secretkey="admin"
        }else{
            secretkey="user"
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



module.exports={tokenGeneration,userauthentication}