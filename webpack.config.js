const path = require('path');

module.exports = [
  {
    entry: './assets/script/friendRequests.ts',
    output: {
      filename: 'friendRequests.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/friends.ts',
    output: {
      filename: 'friends.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/friendsMenu.ts',
    output: {
      filename: 'friendsMenu.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/main.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/signin.ts',
    output: {
      filename: 'signin.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/signup.ts',
    output: {
      filename: 'signup.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/socket.ts',
    output: {
      filename: 'socket.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    entry: './assets/script/users.ts',
    output: {
      filename: 'users.js',
      path: path.resolve(__dirname, 'assets/script'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
];
