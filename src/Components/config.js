const devConfig = {
    websocketUrl: 'ws://localhost:5000',
}
  
const prodConfig = {
    websocketUrl: 'ws://13.50.249.20:5000',
}
  
const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
  
export default config