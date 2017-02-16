module.exports = {
    apps: [
        {
            name: 'IRIS-TIME',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                IRIS_URL: 'http://34.251.16.136:3000'
            }
        }
    ],
    
    deploy: {
        production: {
            user: 'node',
            host: ['34.251.16.119', '34.250.101.115'],
            ref: 'origin/master',
            repo: 'https://github.com/danielkhan/iris-time.git',
            path: '/var/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};
