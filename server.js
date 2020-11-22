let express = require('express')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')

let app = express()

// 配置跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if (req.method.toLowerCase() === "options") {
        return res.end();
    }
    next();
})

// 配置bodyparser
app.use(bodyParser.json())

let secret = "xwc"

//获取用户信息的接口
app.get("/user", (req, res) => {
    setTimeout(() => {
        res.json({
            name: "wangcai"
        })
    }, 500)
})

//登录的接口
app.post('/login',(req,res)=>{
    let {username} = req.body;
    if(username === 'Fan'){
        //登录成功后返回一个token
        res.json({
            code:0,
            username:'Fan',
            token:jwt.sign({username:'Fan'},secret,{
                expiresIn:20    //表示token20秒过期
            })
        })
    }else{
        //登录失败
        res.json({
            code:1,
            data:'登录失败了'
        })
    }
})

//验证token的接口
app.get('/validate',(req,res)=>{
    let token = req.headers.authorization;  //我们会把token放到我们自己设置的http的头authorization中，在这里可以直接拿到
    console.log(token)
    jwt.verify(token,secret,(err,decode)=>{     //验证token
        if(err){
            return res.json({
                code:1,
                data:'token失效了'
            })
        }else{
            // token合法  在这里，需要把token的时效延长，
            //总不能我们看着看着突然让我们重新登录，token过期的意思是，你在这之间不进行任何操作才会过期
            res.json({
                code:0,
                username:decode.username,
                token:jwt.sign({username:'Fan'},secret,{    //合法时，我们需要重新生成一个token,我们每次切换路由，都要重新生成一个token
                    expiresIn:20
                })
            })
        }
    })
})

app.listen(3000)