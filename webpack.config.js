const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  //Configuração dos loaders
  module: { 
    rules: [
      //Cada arquivo dentro desse array rules é um loader
      //onde um loader representa um tipo de arquivo a ser interpretado
      {
        //Rejex ou expressoes regulares começam com barra e terminam com outra barra, e no meio tem uma regra, uma condicional 
        test: /\.jsx?$/,
        //temos um \. js pra indicar que queremos literalmente um . e não um indicador de generalização
        //o $ também é usado pra indicar que a condição da expressao regular deve ser encontrada no final do arquivo, o arquivo tem de terminar com .js nesse caso
        exclude: /node_modules/,
        //exclude = não iremos passar pelos arquivos de node_modules por motivos obvios
        use: 'babel-loader',
      },
      {
        //Adição do tipo de arquivo que vai ser interpretado, css no caso
        test: /\.scss$/,
        //Nesse caso, precisamos passar qual loader vai ser utilizado nesse tipo de arquivo dessa maneira EXATAMENTE:
        use: [
          'style-loader',
          {
            loader:'css-loader',
            options:{
              modules: true,
            },
          },
          //Pois, precisamos declarar assim como array quando vamos utilizar mais de um loader
          //E tambem, colocar eles na ordem certa, pois nesse caso não podemos colocar css-loader antes do style-loader, até pela lógica do que eles fazem
          'sass-loader',
        ],
      },
    ],
  },
  //configurando porta do servidor local
  devServer: {
    port: 3000,
  }
};