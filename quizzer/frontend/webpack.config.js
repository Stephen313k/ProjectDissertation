module.exports = {

    module: {
        rules: [
            {                
                //file extensions: ['.js', '.jsx'],
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                //babel
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },    
    
    //unused code, doesn't do anything, trying to debug cors issue
    devServer: {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    },
};