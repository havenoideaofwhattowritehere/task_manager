const config ={
    env: process.env.NODE_ENV || 'development',
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3307,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    }
}

export default config;