const GetResourceValue = (resources, key) => {  
    return resources.find((item) => item.key === key).value; 
};

export default GetResourceValue;
