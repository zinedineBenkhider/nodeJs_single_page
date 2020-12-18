const path = require("path");

module.exports = {
module: {
rules: [{test:/\.(png|jpg|gif)/},{
test: /\.css$/,

 use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      }

]
},
  // Notre fichier source
  entry: "./public/javascripts/main.js",
  devtool: "inline-source-map",
   
  output: {
    // le chemin vers le bundle que webpack va générer
    path: path.resolve(__dirname, "public/javascripts"),
    // le nom du bundle
    filename: "bundle.js",
  }
};

