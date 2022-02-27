const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (passwordMatch) {
            let usrname = foundUser.username;
            res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}
                <div class="feedback">
                <p>Dear Customer,<br>
                Thank you for getting your car services at our workshop. We would like to know how we performed. Please spare some moments to give us your valuable feedback as it will help us in improving our service.</p>
                <h4>Please rate your service experience for the following parameters</h4>
                <form method="post" action="#action-url">
                <label>1. Your overall experience with us ?</label><br>
                  
                <span class="star-rating">
                  <input type="radio" name="rating1" value="1"><i></i>
                  <input type="radio" name="rating1" value="2"><i></i>
                  <input type="radio" name="rating1" value="3"><i></i>
                  <input type="radio" name="rating1" value="4"><i></i>
                  <input type="radio" name="rating1" value="5"><i></i>
                </span>
                  <div class="clear"></div> 
                  <hr class="survey-hr">
                <label>2. Friendliness and courtesy shown to you while recieving your product</label><br>
                <span class="star-rating">
                  <input type="radio" name="rating2" value="1"><i></i>
                  <input type="radio" name="rating2" value="2"><i></i>
                  <input type="radio" name="rating2" value="3"><i></i>
                  <input type="radio" name="rating2" value="4"><i></i>
                  <input type="radio" name="rating2" value="5"><i></i>
                </span>
                
                  <div class="clear"></div> 
                  <hr class="survey-hr">
                <label>3. Would you like to use our Next Update product?</label><br><br/>
                  <div style="color:grey">
                    <span style="float:left">
                    POOR
                    </span>
                    <span style="float:right">
                      BEST
                    </span>
                    
                  </div>
                <span class="scale-rating">
                  <label value="1">
                  <input type="radio" name="rating" >
                  <label style="width:100%;"></label>
                  </label>
                  <label value="2">
                  <input type="radio" name="rating" >
                  <label style="width:100%;"></label>
                  </label>
                  <label value="3">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="4">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="5">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="6">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="7">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="8">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="9">
                  <input type="radio" name="rating">
                  <label style="width:100%;"></label>
                  </label>
                  <label value="10">
                  <input type="radio" name="rating" value="10">
                  <label style="width:100%;"></label>
                  </label>
                </span>
                  <div class="clear"></div> 
                  <hr class="survey-hr"> 
                <label for="m_3189847521540640526commentText">4. Any Other suggestions:</label><br/><br/>
                <textarea cols="75" name="commentText" rows="5" style="100%"></textarea><br>
                <br>
                  <div class="clear"></div> 
                <button style="background:#43a7d5;color:#fff;padding:12px;border:0" type="submit" value="Submit your review"> 
                </form>
                </div>

                <div class="container">
                <h1>OS Vote</h1>
                <p>Vote for your favorite OS to develop on</p>
                <div id="hasVotedAlreadyErrorMsg" class="card-panel hidden" style="width: 30%">
                  <span class="red-text text-darken-2">You can only vote once.</span>
                </div>
                <form id="vote-form">
                  <p>
                    <label>
                        <input type="radio" name="os" id="windows" value="Windows">
                        <span for="windows">Windows</span>
                    </label>
                  <p>
                    <label>
                        <input type="radio" name="os" id="macos" value="MacOS">
                        <span for="macos">MacOS</span>
                    </label>
                  <p>
                    <label>
                        <input type="radio" name="os" id="linux" value="Linux">
                        <span for="linux">Linux Distro</span>
                    </label>
                  </p>
                  <p>
                    <label>
                        <input type="radio" name="os" id="other" value="Other">
                        <span for="other">Something else</span>
                    </label>
                  </p>
                  <input type="submit" value="Vote" class="btn">
                </form>

                <br>
                <br>
                
                <h5 style="text-align: center" id="chartTitle"></h5>
                <div id="chartContainer" style="height: 300px;width:100%"></div>
              </div>
                          
                </h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
          } else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
          }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});


server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});